import re

from rest_framework import serializers

from .models import Category, Court, Discipline, Venue

MAX_SORT_ORDER = 999


def collapse_spaces(value):
    return " ".join(value.strip().split())


def nullable_text(value, *, collapse=False):
    if value is None:
        return None

    text = str(value).strip()

    if collapse:
        text = collapse_spaces(text)

    return text or None


def has_case_insensitive_duplicate(model, field, value, instance=None, **filters):
    queryset = model.objects.filter(**filters, **{f"{field}__iexact": value})

    if instance is not None:
        queryset = queryset.exclude(pk=instance.pk)

    return queryset.exists()


def validate_sort_order(attrs, errors):
    sort_order = attrs.get("sort_order")

    if sort_order is not None and (sort_order < 0 or sort_order > MAX_SORT_ORDER):
        errors["sort_order"] = ["Sort order must be between 0 and 999."]


def next_sort_order(model):
    highest = model.objects.order_by("-sort_order").values_list("sort_order", flat=True).first()

    return 0 if highest is None else min(highest + 1, MAX_SORT_ORDER)


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ["id", "name", "address", "district", "google_maps_url", "notes", "status"]
        read_only_fields = ["id"]

        extra_kwargs = {
            "google_maps_url": {"allow_blank": True, "allow_null": True, "required": False},
            "notes": {"allow_blank": True, "allow_null": True, "required": False},
        }

    def validate(self, attrs):
        attrs = super().validate(attrs)

        for field in ["name", "address", "district"]:
            if field in attrs:
                attrs[field] = collapse_spaces(attrs[field])

        if "google_maps_url" in attrs:
            attrs["google_maps_url"] = nullable_text(attrs["google_maps_url"])

            if attrs["google_maps_url"] is not None and not attrs["google_maps_url"].startswith("https://"):
                raise serializers.ValidationError({"google_maps_url": ["Google Maps URL must use https."]})

        if "notes" in attrs:
            attrs["notes"] = nullable_text(attrs["notes"])

        name = attrs.get("name", getattr(self.instance, "name", None))
        if name and has_case_insensitive_duplicate(Venue, "name", name, self.instance):
            raise serializers.ValidationError({"name": ["A venue with this name already exists."]})

        return attrs


class CourtSerializer(serializers.ModelSerializer):
    venue_name = serializers.CharField(source="venue.name", read_only=True)

    class Meta:
        model = Court
        fields = ["id", "venue", "venue_name", "name", "status", "notes"]
        read_only_fields = ["id", "venue_name"]

        extra_kwargs = {
            "notes": {"allow_blank": True, "allow_null": True, "required": False},
        }

    def validate_venue(self, venue):
        if venue.status != "active":
            raise serializers.ValidationError("Courts can only be assigned to active venues.")

        return venue

    def validate(self, attrs):
        attrs = super().validate(attrs)

        if "name" in attrs:
            attrs["name"] = collapse_spaces(attrs["name"])

        if "notes" in attrs:
            attrs["notes"] = nullable_text(attrs["notes"])

        name = attrs.get("name", getattr(self.instance, "name", None))
        venue = attrs.get("venue", getattr(self.instance, "venue", None))
        court_status = attrs.get("status", getattr(self.instance, "status", None))

        if self.instance is not None and "venue" in attrs and attrs["venue"].pk != self.instance.venue_id:
            raise serializers.ValidationError({"venue": ["Court venue cannot be changed after creation."]})

        if court_status == "active" and venue is not None and venue.status == "inactive":
            raise serializers.ValidationError({"status": ["Court cannot be active while its venue is inactive."]})

        if name and venue and has_case_insensitive_duplicate(Court, "name", name, self.instance, venue=venue):
            raise serializers.ValidationError({"name": ["A court with this name already exists in this venue."]})

        return attrs


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ["id", "slug", "name", "sort_order", "status"]
        read_only_fields = ["id"]

    def validate(self, attrs):
        attrs = super().validate(attrs)
        errors = {}

        if "slug" in attrs:
            attrs["slug"] = collapse_spaces(attrs["slug"]).lower()

        if "name" in attrs:
            attrs["name"] = collapse_spaces(attrs["name"])

        slug = attrs.get("slug", getattr(self.instance, "slug", None))
        if slug and not re.fullmatch(r"[a-z0-9-]+", slug):
            errors["slug"] = ["Use lowercase letters, numbers, and hyphens only."]

        validate_sort_order(attrs, errors)

        if errors:
            raise serializers.ValidationError(errors)

        if self.instance is not None and "slug" in attrs and attrs["slug"] != self.instance.slug:
            raise serializers.ValidationError({"slug": ["Discipline slug cannot be changed after creation."]})

        if slug and has_case_insensitive_duplicate(Discipline, "slug", slug, self.instance):
            raise serializers.ValidationError({"slug": ["A discipline with this slug already exists."]})

        return attrs

    def create(self, validated_data):
        validated_data.setdefault("sort_order", next_sort_order(Discipline))

        return super().create(validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "code", "min_age", "max_age", "sort_order", "status"]
        read_only_fields = ["id"]

        extra_kwargs = {
            "code": {"allow_blank": True, "allow_null": True, "required": False},
        }

    def validate(self, attrs):
        errors = {}

        if "name" in attrs:
            attrs["name"] = collapse_spaces(attrs["name"])

        if "code" in attrs:
            code = nullable_text(attrs["code"], collapse=True)
            attrs["code"] = code.upper() if code is not None else None

            if attrs["code"] is not None and not re.fullmatch(r"[A-Z0-9-]+", attrs["code"]):
                errors["code"] = ["Use uppercase letters, numbers, and hyphens only."]

        for field in ["min_age", "max_age"]:
            age = attrs.get(field)

            if age is not None and (age < 0 or age > 99):
                errors[field] = ["Age must be between 0 and 99."]

        validate_sort_order(attrs, errors)

        if errors:
            raise serializers.ValidationError(errors)

        name = attrs.get("name", getattr(self.instance, "name", None))
        if name and has_case_insensitive_duplicate(Category, "name", name, self.instance):
            raise serializers.ValidationError({"name": ["A category with this name already exists."]})

        code = attrs.get("code", getattr(self.instance, "code", None))
        if code and has_case_insensitive_duplicate(Category, "code", code, self.instance):
            raise serializers.ValidationError({"code": ["A category with this code already exists."]})

        min_age = attrs.get("min_age", getattr(self.instance, "min_age", None))
        max_age = attrs.get("max_age", getattr(self.instance, "max_age", None))

        if (min_age is None) != (max_age is None):
            raise serializers.ValidationError(
                {"max_age": ["Provide both minimum and maximum age, or leave both empty."]}
            )

        if min_age is not None and max_age is not None and min_age > max_age:
            raise serializers.ValidationError(
                {"min_age": ["Minimum age cannot be greater than maximum age."]}
            )

        status = attrs.get("status", getattr(self.instance, "status", "active"))
        if min_age is not None and max_age is not None and status == "active":
            overlapping_ranges = Category.objects.filter(
                status="active",
                min_age__isnull=False,
                max_age__isnull=False,
                min_age__lte=max_age,
                max_age__gte=min_age,
            )

            if self.instance is not None:
                overlapping_ranges = overlapping_ranges.exclude(pk=self.instance.pk)

            if overlapping_ranges.exists():
                raise serializers.ValidationError(
                    {"min_age": ["Active category age ranges cannot overlap."]}
                )

        return attrs

    def create(self, validated_data):
        validated_data.setdefault("sort_order", next_sort_order(Category))

        return super().create(validated_data)
