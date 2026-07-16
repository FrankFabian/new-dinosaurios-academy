from django.core.management.base import BaseCommand

from academics.models import Category, Court, Venue


VENUES = [
    {
        "name": "Colegio Nuestra Senora de la Merced",
        "address": "Av. Arequipa 4580",
        "district": "Miraflores",
        "google_maps_url": "https://maps.google.com/?q=Av.+Arequipa+4580+Miraflores",
        "notes": "Cancha alquilada para temporada regular.",
    },
    {
        "name": "Colegio Santa Maria Marianistas",
        "address": "Av. La Floresta 250",
        "district": "Santiago de Surco",
        "google_maps_url": "https://maps.google.com/?q=Av.+La+Floresta+250+Santiago+de+Surco",
        "notes": "Sede escolar usada para entrenamientos de fin de semana.",
    },
    {
        "name": "Colegio San Agustin",
        "address": "Av. Javier Prado Este 980",
        "district": "San Isidro",
        "google_maps_url": "https://maps.google.com/?q=Av.+Javier+Prado+Este+980+San+Isidro",
        "notes": "Sede alternativa para temporadas con alta demanda.",
    },
]

COURTS_BY_VENUE = {
    "Colegio Nuestra Senora de la Merced": [
        {"name": "Cancha principal", "notes": "Uso preferente para basketball."},
        {"name": "Cancha auxiliar", "notes": "Disponible para entrenamientos reducidos."},
    ],
    "Colegio Santa Maria Marianistas": [
        {"name": "Coliseo principal", "notes": "Espacio techado para basketball y volleyball."},
        {"name": "Cancha exterior", "notes": "Sujeta a disponibilidad del colegio."},
    ],
    "Colegio San Agustin": [
        {"name": "Cancha multiuso", "notes": "Cancha alquilada para bloques rotativos."},
    ],
}

CATEGORIES = [
    {"name": "Sub 8", "code": "U8", "min_age": 6, "max_age": 8, "sort_order": 10},
    {"name": "Sub 10", "code": "U10", "min_age": 9, "max_age": 10, "sort_order": 20},
    {"name": "Sub 12", "code": "U12", "min_age": 11, "max_age": 12, "sort_order": 30},
    {"name": "Sub 14", "code": "U14", "min_age": 13, "max_age": 14, "sort_order": 40},
    {"name": "Sub 16", "code": "U16", "min_age": 15, "max_age": 16, "sort_order": 50},
    {"name": "Libre", "code": "LIBRE", "min_age": None, "max_age": None, "sort_order": 60},
]


class Command(BaseCommand):
    help = "Seed initial venues, courts, and categories for Dinosaurios Academy."

    def handle(self, *args, **options):
        venue_count = 0
        court_count = 0
        category_count = 0

        for venue_data in VENUES:
            venue, _created = Venue.objects.update_or_create(
                name=venue_data["name"],
                defaults={
                    "address": venue_data["address"],
                    "district": venue_data["district"],
                    "google_maps_url": venue_data["google_maps_url"],
                    "notes": venue_data["notes"],
                    "status": "active",
                },
            )
            venue_count += 1

            for court_data in COURTS_BY_VENUE[venue.name]:
                Court.objects.update_or_create(
                    venue=venue,
                    name=court_data["name"],
                    defaults={"notes": court_data["notes"], "status": "active"},
                )
                court_count += 1

        for category_data in CATEGORIES:
            Category.objects.update_or_create(
                name=category_data["name"],
                defaults={
                    "code": category_data["code"],
                    "min_age": category_data["min_age"],
                    "max_age": category_data["max_age"],
                    "sort_order": category_data["sort_order"],
                    "status": "active",
                },
            )
            category_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded academic structure: {venue_count} venues, {court_count} courts, {category_count} categories."
            )
        )
