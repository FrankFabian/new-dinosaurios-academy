"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function getBackendUrl() {
  return process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
}

function splitSetCookieHeader(header: string | null) {
  if (!header) {
    return [];
  }

  return header.split(/,(?=\s*[^;,]+=)/);
}

function getCookieValue(setCookieHeaders: string[], name: string) {
  const cookie = setCookieHeaders.find((value) => value.trim().startsWith(`${name}=`));
  const pair = cookie?.trim().split(";", 1)[0];

  return pair?.slice(name.length + 1);
}

async function persistBackendCookies(response: Response) {
  const cookieStore = await cookies();
  const setCookieHeaders = splitSetCookieHeader(response.headers.get("set-cookie"));
  const csrfToken = getCookieValue(setCookieHeaders, "csrftoken");
  const sessionId = getCookieValue(setCookieHeaders, "sessionid");

  if (csrfToken) {
    cookieStore.set("csrftoken", csrfToken, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
    });
  }

  if (sessionId) {
    cookieStore.set("sessionid", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }
}

export async function loginWithPassword(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  let csrfResponse: Response;

  try {
    csrfResponse = await fetch(`${getBackendUrl()}/api/auth/csrf/`, {
      cache: "no-store",
    });
  } catch {
    redirect("/?auth=unavailable");
  }

  if (!csrfResponse.ok) {
    redirect("/?auth=unavailable");
  }

  const csrfPayload = (await csrfResponse.json()) as { csrfToken?: string };
  const csrfCookies = splitSetCookieHeader(csrfResponse.headers.get("set-cookie"));
  const csrfCookie = getCookieValue(csrfCookies, "csrftoken") ?? csrfPayload.csrfToken ?? "";
  let loginResponse: Response;

  try {
    loginResponse = await fetch(`${getBackendUrl()}/api/auth/login/`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfPayload.csrfToken ?? csrfCookie,
        Cookie: `csrftoken=${csrfCookie}`,
      },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    redirect("/?auth=unavailable");
  }

  if (!loginResponse.ok) {
    redirect("/?auth=invalid");
  }

  await persistBackendCookies(loginResponse);
  redirect("/");
}

export async function logoutCurrentUser() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const csrfToken = cookieStore.get("csrftoken")?.value;

  if (cookieHeader && csrfToken) {
    try {
      await fetch(`${getBackendUrl()}/api/auth/logout/`, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
          Cookie: cookieHeader,
        },
        body: "{}",
      });
    } catch {
      // Local cookies are cleared below even when the backend is temporarily unavailable.
    }
  }

  cookieStore.delete("sessionid");
  cookieStore.delete("csrftoken");
  redirect("/");
}
