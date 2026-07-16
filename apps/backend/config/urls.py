from django.contrib import admin
from django.urls import include, path

from health.views import health


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/academics/", include("academics.urls")),
    path("api/auth/", include("accounts.urls")),
    path("api/health/", health, name="health"),
]
