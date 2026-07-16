from io import StringIO

from django.contrib.auth.models import Group, User
from django.core.management import call_command
from django.test import Client, TestCase

from academics.models import Category, Court, Venue


class VenueApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin = User.objects.create_user(
            username="admin@example.com",
            email="admin@example.com",
            password="correct-password",
        )
        self.admin.groups.add(Group.objects.get(name="admin"))

    def test_admin_can_create_and_list_venues(self):
        self.client.force_login(self.admin)

        create_response = self.client.post(
            "/api/academics/venues/",
            data={
                "name": "Sede Surco",
                "address": "Av. Primavera 123",
                "district": "Surco",
                "google_maps_url": "https://maps.example/surco",
            },
            content_type="application/json",
        )

        self.assertEqual(create_response.status_code, 201)
        self.assertEqual(create_response.json()["name"], "Sede Surco")
        self.assertEqual(create_response.json()["status"], "active")

        list_response = self.client.get("/api/academics/venues/")

        self.assertEqual(list_response.status_code, 200)
        self.assertEqual(list_response.json()["results"][0]["name"], "Sede Surco")

    def test_venue_normalizes_text_and_returns_null_for_empty_optional_fields(self):
        self.client.force_login(self.admin)

        response = self.client.post(
            "/api/academics/venues/",
            data={
                "name": "  Colegio   Santa   Maria  ",
                "address": "  Av.   Primavera   1200  ",
                "district": "  Santiago   de   Surco  ",
                "google_maps_url": "",
                "notes": "  Cancha alquilada\npara temporada regular  ",
            },
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["name"], "Colegio Santa Maria")
        self.assertEqual(response.json()["address"], "Av. Primavera 1200")
        self.assertEqual(response.json()["district"], "Santiago de Surco")
        self.assertIsNone(response.json()["google_maps_url"])
        self.assertEqual(response.json()["notes"], "Cancha alquilada\npara temporada regular")

    def test_venue_list_can_be_filtered_by_status(self):
        self.client.force_login(self.admin)
        self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede Activa", "address": "Av. 1", "district": "Surco"},
            content_type="application/json",
        )
        self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede Inactiva", "address": "Av. 2", "district": "Miraflores", "status": "inactive"},
            content_type="application/json",
        )

        response = self.client.get("/api/academics/venues/?status=inactive")

        self.assertEqual(response.status_code, 200)
        self.assertEqual([venue["name"] for venue in response.json()["results"]], ["Sede Inactiva"])

    def test_venue_name_is_unique_case_insensitively(self):
        self.client.force_login(self.admin)
        self.client.post(
            "/api/academics/venues/",
            data={"name": "Colegio Santa Maria", "address": "Av. 1", "district": "Surco"},
            content_type="application/json",
        )

        response = self.client.post(
            "/api/academics/venues/",
            data={"name": " colegio santa maria ", "address": "Av. 2", "district": "Miraflores"},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["name"], ["A venue with this name already exists."])

    def test_venue_google_maps_url_must_be_https(self):
        self.client.force_login(self.admin)

        response = self.client.post(
            "/api/academics/venues/",
            data={
                "name": "Sede Mapa",
                "address": "Av. 1",
                "district": "Surco",
                "google_maps_url": "http://maps.example/sede",
            },
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["google_maps_url"], ["Google Maps URL must use https."])


class CourtApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.staff = User.objects.create_user(
            username="staff@example.com",
            email="staff@example.com",
            password="correct-password",
        )
        self.staff.groups.add(Group.objects.get(name="staff"))

    def test_staff_can_create_and_list_courts_associated_with_venues(self):
        self.client.force_login(self.staff)
        venue_response = self.client.post(
            "/api/academics/venues/",
            data={
                "name": "Sede San Borja",
                "address": "Av. Aviacion 456",
                "district": "San Borja",
            },
            content_type="application/json",
        )

        court_response = self.client.post(
            "/api/academics/courts/",
            data={
                "venue": venue_response.json()["id"],
                "name": "Cancha 1",
                "notes": "Techada",
            },
            content_type="application/json",
        )

        self.assertEqual(court_response.status_code, 201)
        self.assertEqual(court_response.json()["venue"], venue_response.json()["id"])
        self.assertEqual(court_response.json()["venue_name"], "Sede San Borja")

        list_response = self.client.get("/api/academics/courts/")

        self.assertEqual(list_response.status_code, 200)
        self.assertEqual(list_response.json()["results"][0]["name"], "Cancha 1")

    def test_court_rejects_inactive_venue(self):
        self.client.force_login(self.staff)
        venue_response = self.client.post(
            "/api/academics/venues/",
            data={
                "name": "Sede Cerrada",
                "address": "Calle 1",
                "district": "Miraflores",
                "status": "inactive",
            },
            content_type="application/json",
        )

        response = self.client.post(
            "/api/academics/courts/",
            data={"venue": venue_response.json()["id"], "name": "Cancha cerrada"},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["venue"], ["Courts can only be assigned to active venues."])

    def test_court_empty_notes_are_stored_as_null(self):
        self.client.force_login(self.staff)
        venue_response = self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede Notas", "address": "Av. 1", "district": "Surco"},
            content_type="application/json",
        )

        response = self.client.post(
            "/api/academics/courts/",
            data={"venue": venue_response.json()["id"], "name": "Cancha sin notas", "notes": ""},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertIsNone(response.json()["notes"])

    def test_courts_can_be_filtered_by_venue(self):
        self.client.force_login(self.staff)
        first_venue = self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede A", "address": "Av. A", "district": "Surco"},
            content_type="application/json",
        ).json()
        second_venue = self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede B", "address": "Av. B", "district": "San Borja"},
            content_type="application/json",
        ).json()
        self.client.post(
            "/api/academics/courts/",
            data={"venue": first_venue["id"], "name": "Cancha A"},
            content_type="application/json",
        )
        self.client.post(
            "/api/academics/courts/",
            data={"venue": second_venue["id"], "name": "Cancha B"},
            content_type="application/json",
        )

        response = self.client.get(f"/api/academics/courts/?venue={second_venue['id']}")

        self.assertEqual(response.status_code, 200)
        self.assertEqual([court["name"] for court in response.json()["results"]], ["Cancha B"])

    def test_court_venue_cannot_be_changed_after_creation(self):
        self.client.force_login(self.staff)
        first_venue = self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede Original", "address": "Av. A", "district": "Surco"},
            content_type="application/json",
        ).json()
        second_venue = self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede Nueva", "address": "Av. B", "district": "San Borja"},
            content_type="application/json",
        ).json()
        court = self.client.post(
            "/api/academics/courts/",
            data={"venue": first_venue["id"], "name": "Cancha Principal"},
            content_type="application/json",
        ).json()

        response = self.client.patch(
            f"/api/academics/courts/{court['id']}/",
            data={"venue": second_venue["id"]},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["venue"], ["Court venue cannot be changed after creation."])

    def test_inactive_court_cannot_be_reactivated_when_venue_is_inactive(self):
        self.client.force_login(self.staff)
        venue = self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede Cerrable", "address": "Av. A", "district": "Surco"},
            content_type="application/json",
        ).json()
        court = self.client.post(
            "/api/academics/courts/",
            data={"venue": venue["id"], "name": "Cancha 1"},
            content_type="application/json",
        ).json()
        self.client.delete(f"/api/academics/courts/{court['id']}/")
        self.client.delete(f"/api/academics/venues/{venue['id']}/")

        response = self.client.patch(
            f"/api/academics/courts/{court['id']}/",
            data={"status": "active"},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["status"], ["Court cannot be active while its venue is inactive."])


class DisciplineApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin = User.objects.create_user(
            username="admin-disciplines@example.com",
            email="admin-disciplines@example.com",
            password="correct-password",
        )
        self.admin.groups.add(Group.objects.get(name="admin"))

    def test_initial_disciplines_are_manageable_records(self):
        self.client.force_login(self.admin)

        response = self.client.get("/api/academics/disciplines/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            [discipline["slug"] for discipline in response.json()["results"]],
            ["basketball", "volleyball"],
        )

    def test_disciplines_can_be_ordered_for_configuration_screens(self):
        self.client.force_login(self.admin)

        response = self.client.post(
            "/api/academics/disciplines/",
            data={"slug": "training", "name": "Training", "sort_order": 5},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["sort_order"], 5)

    def test_discipline_sort_order_is_assigned_when_omitted(self):
        self.client.force_login(self.admin)

        response = self.client.post(
            "/api/academics/disciplines/",
            data={"slug": "football", "name": "Football"},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["sort_order"], 2)

    def test_discipline_slug_cannot_be_changed_after_creation(self):
        self.client.force_login(self.admin)
        discipline = self.client.post(
            "/api/academics/disciplines/",
            data={"slug": "training", "name": "Training"},
            content_type="application/json",
        ).json()

        response = self.client.patch(
            f"/api/academics/disciplines/{discipline['id']}/",
            data={"slug": "training-renamed"},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["slug"], ["Discipline slug cannot be changed after creation."])

    def test_discipline_rejects_invalid_slug_and_sort_order(self):
        self.client.force_login(self.admin)

        response = self.client.post(
            "/api/academics/disciplines/",
            data={"slug": "bad_slug", "name": "Bad", "sort_order": 1000},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["slug"], ["Use lowercase letters, numbers, and hyphens only."])
        self.assertEqual(response.json()["sort_order"], ["Sort order must be between 0 and 999."])


class CategoryApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.staff = User.objects.create_user(
            username="staff-categories@example.com",
            email="staff-categories@example.com",
            password="correct-password",
        )
        self.staff.groups.add(Group.objects.get(name="staff"))

    def test_staff_can_create_categories_with_optional_age_ranges(self):
        self.client.force_login(self.staff)

        create_response = self.client.post(
            "/api/academics/categories/",
            data={
                "name": "Sub 12",
                "min_age": 10,
                "max_age": 12,
                "sort_order": 20,
            },
            content_type="application/json",
        )

        self.assertEqual(create_response.status_code, 201)
        self.assertEqual(create_response.json()["min_age"], 10)
        self.assertEqual(create_response.json()["max_age"], 12)

        list_response = self.client.get("/api/academics/categories/")

        self.assertEqual(list_response.status_code, 200)
        self.assertEqual(list_response.json()["results"][0]["name"], "Sub 12")

    def test_category_code_is_optional_and_normalized_when_present(self):
        self.client.force_login(self.staff)

        no_code_response = self.client.post(
            "/api/academics/categories/",
            data={"name": "Libre", "code": ""},
            content_type="application/json",
        )
        code_response = self.client.post(
            "/api/academics/categories/",
            data={"name": "Sub 14", "code": " sub-14 "},
            content_type="application/json",
        )

        self.assertEqual(no_code_response.status_code, 201)
        self.assertIsNone(no_code_response.json()["code"])
        self.assertEqual(code_response.status_code, 201)
        self.assertEqual(code_response.json()["code"], "SUB-14")

    def test_category_sort_order_is_assigned_when_omitted(self):
        self.client.force_login(self.staff)
        first_response = self.client.post(
            "/api/academics/categories/",
            data={"name": "Sub 10"},
            content_type="application/json",
        )
        second_response = self.client.post(
            "/api/academics/categories/",
            data={"name": "Sub 12"},
            content_type="application/json",
        )

        self.assertEqual(first_response.status_code, 201)
        self.assertEqual(second_response.status_code, 201)
        self.assertEqual(first_response.json()["sort_order"], 0)
        self.assertEqual(second_response.json()["sort_order"], 1)

    def test_category_rejects_invalid_code_age_and_sort_order(self):
        self.client.force_login(self.staff)

        response = self.client.post(
            "/api/academics/categories/",
            data={"name": "Sub cien", "code": "sub 100", "min_age": 100, "max_age": 101, "sort_order": 1000},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["code"], ["Use uppercase letters, numbers, and hyphens only."])
        self.assertEqual(response.json()["min_age"], ["Age must be between 0 and 99."])
        self.assertEqual(response.json()["max_age"], ["Age must be between 0 and 99."])
        self.assertEqual(response.json()["sort_order"], ["Sort order must be between 0 and 999."])

    def test_category_rejects_age_ranges_where_minimum_is_greater_than_maximum(self):
        self.client.force_login(self.staff)

        response = self.client.post(
            "/api/academics/categories/",
            data={
                "name": "Rango invalido",
                "min_age": 15,
                "max_age": 12,
            },
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["min_age"], ["Minimum age cannot be greater than maximum age."])

    def test_category_requires_both_age_range_bounds_or_neither(self):
        self.client.force_login(self.staff)

        response = self.client.post(
            "/api/academics/categories/",
            data={"name": "Sub sin cierre", "min_age": 10},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["max_age"], ["Provide both minimum and maximum age, or leave both empty."])

    def test_active_category_age_ranges_cannot_overlap(self):
        self.client.force_login(self.staff)
        self.client.post(
            "/api/academics/categories/",
            data={"name": "Sub 12", "min_age": 10, "max_age": 12},
            content_type="application/json",
        )

        response = self.client.post(
            "/api/academics/categories/",
            data={"name": "Sub 13", "min_age": 12, "max_age": 13},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["min_age"], ["Active category age ranges cannot overlap."])

    def test_category_suggestion_by_age_does_not_prevent_staff_override(self):
        self.client.force_login(self.staff)
        self.client.post(
            "/api/academics/categories/",
            data={"name": "Sub 10", "min_age": 8, "max_age": 10, "sort_order": 10},
            content_type="application/json",
        )
        self.client.post(
            "/api/academics/categories/",
            data={"name": "Sub 12", "min_age": 11, "max_age": 12, "sort_order": 20},
            content_type="application/json",
        )

        response = self.client.get("/api/academics/categories/suggest/?age=11")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["suggested_category"]["name"], "Sub 12")
        self.assertEqual(response.json()["override_allowed"], True)


class AcademyStructureManagementTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin = User.objects.create_user(
            username="admin-structure@example.com",
            email="admin-structure@example.com",
            password="correct-password",
        )
        self.admin.groups.add(Group.objects.get(name="admin"))
        self.coach = User.objects.create_user(
            username="coach@example.com",
            email="coach@example.com",
            password="correct-password",
        )
        self.coach.groups.add(Group.objects.get(name="coach"))
        self.guardian = User.objects.create_user(
            username="guardian@example.com",
            email="guardian@example.com",
            password="correct-password",
        )
        self.guardian.groups.add(Group.objects.get(name="guardian"))
        self.student = User.objects.create_user(
            username="student@example.com",
            email="student@example.com",
            password="correct-password",
        )
        self.student.groups.add(Group.objects.get(name="student"))

    def test_resources_can_be_viewed_edited_and_deactivated_without_being_deleted(self):
        self.client.force_login(self.admin)
        venue = self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede Norte", "address": "Av. Norte 100", "district": "Los Olivos"},
            content_type="application/json",
        ).json()
        court = self.client.post(
            "/api/academics/courts/",
            data={"venue": venue["id"], "name": "Cancha A"},
            content_type="application/json",
        ).json()
        discipline = self.client.post(
            "/api/academics/disciplines/",
            data={"slug": "futsal", "name": "Futsal"},
            content_type="application/json",
        ).json()
        category = self.client.post(
            "/api/academics/categories/",
            data={"name": "Libre", "sort_order": 30},
            content_type="application/json",
        ).json()

        resources = [
            ("courts", court["id"], {"name": "Cancha A renovada"}),
            ("venues", venue["id"], {"name": "Sede Norte renovada"}),
            ("disciplines", discipline["id"], {"name": "Futsal competitivo"}),
            ("categories", category["id"], {"name": "Libre competitivo"}),
        ]

        for resource_name, resource_id, payload in resources:
            update_response = self.client.patch(
                f"/api/academics/{resource_name}/{resource_id}/",
                data=payload,
                content_type="application/json",
            )
            self.assertEqual(update_response.status_code, 200)
            self.assertEqual(update_response.json()["name"], payload["name"])

            deactivate_response = self.client.delete(f"/api/academics/{resource_name}/{resource_id}/")
            self.assertEqual(deactivate_response.status_code, 200)
            self.assertEqual(deactivate_response.json()["status"], "inactive")

            detail_response = self.client.get(f"/api/academics/{resource_name}/{resource_id}/")
            self.assertEqual(detail_response.status_code, 200)
            self.assertEqual(detail_response.json()["status"], "inactive")

    def test_venue_with_active_courts_cannot_be_deactivated(self):
        self.client.force_login(self.admin)
        venue = self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede con cancha", "address": "Av. Uno", "district": "Surco"},
            content_type="application/json",
        ).json()
        self.client.post(
            "/api/academics/courts/",
            data={"venue": venue["id"], "name": "Cancha 1"},
            content_type="application/json",
        )

        response = self.client.delete(f"/api/academics/venues/{venue['id']}/")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["status"], ["Deactivate active courts before deactivating this venue."])

    def test_case_insensitive_uniqueness_applies_to_structure_catalogs(self):
        self.client.force_login(self.admin)
        venue = self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede unica", "address": "Av. Uno", "district": "Surco"},
            content_type="application/json",
        ).json()
        self.client.post(
            "/api/academics/courts/",
            data={"venue": venue["id"], "name": "Cancha Principal"},
            content_type="application/json",
        )
        self.client.post(
            "/api/academics/disciplines/",
            data={"slug": "training", "name": "Training"},
            content_type="application/json",
        )
        self.client.post(
            "/api/academics/categories/",
            data={"name": "Sub 16", "code": "U16"},
            content_type="application/json",
        )

        duplicate_court = self.client.post(
            "/api/academics/courts/",
            data={"venue": venue["id"], "name": " cancha principal "},
            content_type="application/json",
        )
        duplicate_discipline = self.client.post(
            "/api/academics/disciplines/",
            data={"slug": "TRAINING", "name": "Training 2"},
            content_type="application/json",
        )
        duplicate_category = self.client.post(
            "/api/academics/categories/",
            data={"name": "sub 16", "code": "u16"},
            content_type="application/json",
        )

        self.assertEqual(duplicate_court.status_code, 400)
        self.assertEqual(duplicate_court.json()["name"], ["A court with this name already exists in this venue."])
        self.assertEqual(duplicate_discipline.status_code, 400)
        self.assertEqual(duplicate_discipline.json()["slug"], ["A discipline with this slug already exists."])
        self.assertEqual(duplicate_category.status_code, 400)
        self.assertEqual(duplicate_category.json()["name"], ["A category with this name already exists."])

    def test_only_admin_and_staff_can_manage_academy_structure(self):
        anonymous_response = self.client.get("/api/academics/venues/")
        self.assertEqual(anonymous_response.status_code, 403)

        self.client.force_login(self.coach)
        coach_response = self.client.post(
            "/api/academics/venues/",
            data={"name": "Sede Coach", "address": "Calle Coach", "district": "Surco"},
            content_type="application/json",
        )

        self.assertEqual(coach_response.status_code, 403)

    def test_guardian_and_student_cannot_manage_academy_structure(self):
        for user in [self.guardian, self.student]:
            self.client.force_login(user)
            response = self.client.post(
                "/api/academics/venues/",
                data={"name": f"Sede {user.username}", "address": "Calle 1", "district": "Surco"},
                content_type="application/json",
            )

            self.assertEqual(response.status_code, 403)
            self.client.logout()


class AcademicStructureSeedTests(TestCase):
    def test_seed_academic_structure_creates_initial_records_idempotently(self):
        first_output = StringIO()
        second_output = StringIO()

        call_command("seed_academic_structure", stdout=first_output)
        call_command("seed_academic_structure", stdout=second_output)

        self.assertEqual(Venue.objects.count(), 3)
        self.assertEqual(Court.objects.count(), 5)
        self.assertEqual(Category.objects.count(), 6)
        self.assertTrue(Venue.objects.filter(name="Colegio Nuestra Senora de la Merced").exists())
        self.assertTrue(
            Court.objects.filter(
                venue__name="Colegio Santa Maria Marianistas",
                name="Coliseo principal",
            ).exists()
        )
        self.assertEqual(Category.objects.get(name="Sub 12").min_age, 11)
        self.assertIsNone(Category.objects.get(name="Libre").min_age)
        self.assertIn("3 venues, 5 courts, 6 categories", second_output.getvalue())
