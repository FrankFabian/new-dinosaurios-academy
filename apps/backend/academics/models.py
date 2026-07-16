from django.db import models


class Status(models.TextChoices):
    ACTIVE = "active", "Active"
    INACTIVE = "inactive", "Inactive"


class Venue(models.Model):
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=240)
    district = models.CharField(max_length=120)
    google_maps_url = models.URLField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.ACTIVE)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Court(models.Model):
    venue = models.ForeignKey(Venue, related_name="courts", on_delete=models.PROTECT)
    name = models.CharField(max_length=120)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.ACTIVE)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["venue__name", "name"]

    def __str__(self):
        return f"{self.venue.name} - {self.name}"


class Discipline(models.Model):
    slug = models.SlugField(max_length=80, unique=True)
    name = models.CharField(max_length=120)
    sort_order = models.PositiveSmallIntegerField(default=0)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.ACTIVE)

    class Meta:
        ordering = ["sort_order", "slug"]

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=120)
    code = models.CharField(max_length=24, blank=True, null=True)
    min_age = models.PositiveSmallIntegerField(null=True, blank=True)
    max_age = models.PositiveSmallIntegerField(null=True, blank=True)
    sort_order = models.PositiveSmallIntegerField(default=0)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.ACTIVE)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name
