from django.contrib.auth.models import Group, User
from django.test import Client, TestCase


class SessionAuthenticationTests(TestCase):
    def setUp(self):
        self.client = Client(enforce_csrf_checks=True)
        self.user = User.objects.create_user(
            username="admin@example.com",
            email="admin@example.com",
            password="correct-password",
            first_name="Admin",
            last_name="Academy",
        )
        self.user.groups.add(Group.objects.get(name="admin"))

    def test_user_can_log_in_and_log_out_with_csrf_protected_session_cookie(self):
        csrf_response = self.client.get("/api/auth/csrf/")
        csrf_token = csrf_response.json()["csrfToken"]

        login_response = self.client.post(
            "/api/auth/login/",
            data='{"username": "admin@example.com", "password": "correct-password"}',
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrf_token,
        )

        self.assertEqual(login_response.status_code, 200)
        self.assertEqual(login_response.json()["user"]["roles"], ["admin"])
        self.assertIn("sessionid", login_response.cookies)
        self.assertTrue(login_response.cookies["sessionid"]["httponly"])

        me_response = self.client.get("/api/auth/me/")
        self.assertEqual(me_response.status_code, 200)
        self.assertEqual(me_response.json()["user"]["email"], "admin@example.com")

        session_csrf_token = login_response.cookies["csrftoken"].value
        logout_response = self.client.post(
            "/api/auth/logout/",
            data="{}",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=session_csrf_token,
        )

        self.assertEqual(logout_response.status_code, 200)
        self.assertEqual(logout_response.json(), {"ok": True})
        self.assertEqual(self.client.get("/api/auth/me/").status_code, 401)

    def test_rejects_unauthenticated_access_to_current_user(self):
        response = self.client.get("/api/auth/me/")

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {"detail": "Authentication credentials were not provided."})


class BaseRoleGroupTests(TestCase):
    def test_base_role_groups_exist(self):
        self.assertEqual(
            list(Group.objects.filter(name__in=["admin", "staff", "coach", "guardian", "student"]).values_list("name", flat=True).order_by("name")),
            ["admin", "coach", "guardian", "staff", "student"],
        )
