from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import BasePermission
from rest_framework.response import Response

from .models import Category, Court, Discipline, Venue
from .serializers import CategorySerializer, CourtSerializer, DisciplineSerializer, VenueSerializer


class IsAcademicsManager(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        return request.user.groups.filter(name__in=["admin", "staff"]).exists()


class ResultsListMixin:
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)

        return Response({"results": serializer.data})

    def filter_queryset(self, queryset):
        queryset = super().filter_queryset(queryset)
        status_filter = self.request.query_params.get("status")

        if status_filter in {"active", "inactive"}:
            queryset = queryset.filter(status=status_filter)

        return queryset


class VenueViewSet(ResultsListMixin, viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    permission_classes = [IsAcademicsManager]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.courts.filter(status="active").exists():
            return Response(
                {"status": ["Deactivate active courts before deactivating this venue."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        instance.status = "inactive"
        instance.save(update_fields=["status"])

        return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)


class CourtViewSet(ResultsListMixin, viewsets.ModelViewSet):
    queryset = Court.objects.select_related("venue")
    serializer_class = CourtSerializer
    permission_classes = [IsAcademicsManager]

    def filter_queryset(self, queryset):
        queryset = super().filter_queryset(queryset)
        venue_filter = self.request.query_params.get("venue")

        if venue_filter:
            queryset = queryset.filter(venue_id=venue_filter)

        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = "inactive"
        instance.save(update_fields=["status"])

        return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)


class DisciplineViewSet(ResultsListMixin, viewsets.ModelViewSet):
    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer
    permission_classes = [IsAcademicsManager]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = "inactive"
        instance.save(update_fields=["status"])

        return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)


class CategoryViewSet(ResultsListMixin, viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAcademicsManager]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = "inactive"
        instance.save(update_fields=["status"])

        return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"])
    def suggest(self, request):
        try:
            age = int(request.query_params.get("age", ""))
        except ValueError:
            return Response({"age": ["A valid age is required."]}, status=status.HTTP_400_BAD_REQUEST)

        suggested_category = (
            self.get_queryset()
            .filter(status="active")
            .filter(min_age__lte=age)
            .filter(max_age__gte=age)
            .first()
        )

        return Response(
            {
                "suggested_category": self.get_serializer(suggested_category).data if suggested_category else None,
                "override_allowed": True,
            }
        )
