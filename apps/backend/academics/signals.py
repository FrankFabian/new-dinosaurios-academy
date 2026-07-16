from django.db.models.signals import post_migrate


INITIAL_DISCIPLINES = (
    ("basketball", "Basketball", 0),
    ("volleyball", "Volleyball", 1),
)


def create_initial_disciplines(sender, **kwargs):
    from .models import Discipline

    for slug, name, sort_order in INITIAL_DISCIPLINES:
        Discipline.objects.get_or_create(slug=slug, defaults={"name": name, "sort_order": sort_order})


def ensure_initial_academics_data():
    post_migrate.connect(create_initial_disciplines, dispatch_uid="academics.create_initial_disciplines")
