from django.contrib.auth.models import Group
from django.db.models.signals import post_migrate


BASE_ROLE_GROUPS = ("admin", "staff", "coach", "guardian", "student")


def create_base_role_groups(sender, **kwargs):
    for role in BASE_ROLE_GROUPS:
        Group.objects.get_or_create(name=role)


def ensure_base_role_groups():
    post_migrate.connect(create_base_role_groups, dispatch_uid="accounts.create_base_role_groups")
