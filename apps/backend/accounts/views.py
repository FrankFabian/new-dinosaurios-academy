import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware import csrf
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_POST


def user_payload(user):
    return {
        "id": user.id,
        "email": user.email,
        "name": user.get_full_name() or user.get_username(),
        "roles": list(user.groups.order_by("name").values_list("name", flat=True)),
    }


@require_GET
@ensure_csrf_cookie
def csrf_token(request):
    return JsonResponse({"csrfToken": csrf.get_token(request)})


@require_POST
@csrf_protect
def log_in(request):
    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Invalid JSON body."}, status=400)

    username = payload.get("username", "")
    password = payload.get("password", "")
    user = authenticate(request, username=username, password=password)

    if user is None:
        return JsonResponse({"detail": "Invalid credentials."}, status=400)

    login(request, user)
    return JsonResponse({"user": user_payload(user)})


@require_POST
@csrf_protect
def log_out(request):
    logout(request)
    return JsonResponse({"ok": True})


@require_GET
def current_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication credentials were not provided."}, status=401)

    return JsonResponse({"user": user_payload(request.user)})
