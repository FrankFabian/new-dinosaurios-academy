from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, CourtViewSet, DisciplineViewSet, VenueViewSet


router = DefaultRouter()
router.register("venues", VenueViewSet, basename="venue")
router.register("courts", CourtViewSet, basename="court")
router.register("disciplines", DisciplineViewSet, basename="discipline")
router.register("categories", CategoryViewSet, basename="category")

urlpatterns = [
    path("", include(router.urls)),
]
