import { cookies } from "next/headers";

import type { Role } from "@/lib/auth/navigation";

const roles = ["admin", "staff", "coach", "guardian", "student"] as const;

export type CurrentUser = {
  id: number;
  email: string;
  name: string;
  roles: Role[];
};

export type AuthState =
  | {
      status: "authenticated";
      user: CurrentUser;
    }
  | {
      status: "unauthenticated";
    }
  | {
      status: "unavailable";
    };

type BackendUser = {
  id?: unknown;
  email?: unknown;
  name?: unknown;
  roles?: unknown;
};

function getBackendUrl() {
  return process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
}

function isRole(value: unknown): value is Role {
  return typeof value === "string" && roles.includes(value as Role);
}

function normalizeUser(user: BackendUser): CurrentUser {
  return {
    id: typeof user.id === "number" ? user.id : 0,
    email: typeof user.email === "string" ? user.email : "",
    name: typeof user.name === "string" ? user.name : "",
    roles: Array.isArray(user.roles) ? user.roles.filter(isRole) : [],
  };
}

export async function getCurrentUser(): Promise<AuthState> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  let response: Response;

  try {
    response = await fetch(`${getBackendUrl()}/api/auth/me/`, {
      cache: "no-store",
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
    });
  } catch {
    return { status: "unavailable" };
  }

  if (response.status === 401) {
    return { status: "unauthenticated" };
  }

  if (!response.ok) {
    return { status: "unavailable" };
  }

  const payload = (await response.json()) as { user?: BackendUser };

  return {
    status: "authenticated",
    user: normalizeUser(payload.user ?? {}),
  };
}
