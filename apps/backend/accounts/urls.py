from django.urls import path

from . import views


urlpatterns = [
    path("csrf/", views.csrf_token, name="auth-csrf"),
    path("login/", views.log_in, name="auth-login"),
    path("logout/", views.log_out, name="auth-logout"),
    path("me/", views.current_user, name="auth-me"),
]
