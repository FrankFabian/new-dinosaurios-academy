from django.apps import AppConfig


class AcademicsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "academics"

    def ready(self):
        from .signals import ensure_initial_academics_data

        ensure_initial_academics_data()
