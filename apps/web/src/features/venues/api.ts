export type AcademyResourceName = "venues" | "courts" | "disciplines" | "categories";

export type AcademyResource = {
  id: number;
  name: string;
  status: "active" | "inactive";
};

export type Venue = AcademyResource & {
  address: string;
  district: string;
  google_maps_url: string | null;
  notes: string | null;
};

export type Court = AcademyResource & {
  venue: number;
  venue_name: string;
  notes: string;
};

export type Discipline = AcademyResource & {
  slug: string;
  sort_order: number;
};

export type Category = AcademyResource & {
  code: string | null;
  min_age: number | null;
  max_age: number | null;
  sort_order: number;
};

export type AcademyStructure = {
  venues: Venue[];
  courts: Court[];
  disciplines: Discipline[];
  categories: Category[];
};

type ListPayload<T> = {
  results?: T[];
};

function getBackendUrl() {
  return process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
}

function getResourceUrl(resource: AcademyResourceName, id?: number) {
  const suffix = id === undefined ? "" : `${id}/`;
  const path = `/api/academics/${resource}/${suffix}`;

  return typeof window === "undefined" ? `${getBackendUrl()}${path}` : path;
}

async function readResults<T>(resource: AcademyResourceName, cookieHeader: string): Promise<T[]> {
  const response = await fetch(getResourceUrl(resource), {
    cache: "no-store",
    credentials: "include",
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });

  if (!response.ok) {
    throw new Error(`Could not load ${resource}.`);
  }

  const payload = (await response.json()) as ListPayload<T>;

  return payload.results ?? [];
}

function getWriteHeaders(cookieHeader: string, csrfToken: string) {
  return {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken,
    Cookie: cookieHeader,
  };
}

async function writeResource(
  resource: AcademyResourceName,
  payload: Record<string, unknown>,
  cookieHeader: string,
  csrfToken: string,
  method: "POST" | "PATCH",
  id?: number,
) {
  const response = await fetch(getResourceUrl(resource, id), {
    method,
    cache: "no-store",
    credentials: "include",
    headers: getWriteHeaders(cookieHeader, csrfToken),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Could not save ${resource}.`);
  }

  return response.json();
}

export async function getAcademyStructure(cookieHeader: string): Promise<AcademyStructure> {
  const [venues, courts, disciplines, categories] = await Promise.all([
    readResults<Venue>("venues", cookieHeader),
    readResults<Court>("courts", cookieHeader),
    readResults<Discipline>("disciplines", cookieHeader),
    readResults<Category>("categories", cookieHeader),
  ]);

  return { venues, courts, disciplines, categories };
}

export async function createAcademyResource(
  resource: AcademyResourceName,
  payload: Record<string, unknown>,
  cookieHeader: string,
  csrfToken: string,
) {
  return writeResource(resource, payload, cookieHeader, csrfToken, "POST");
}

export async function updateAcademyResource(
  resource: AcademyResourceName,
  id: number,
  payload: Record<string, unknown>,
  cookieHeader: string,
  csrfToken: string,
) {
  return writeResource(resource, payload, cookieHeader, csrfToken, "PATCH", id);
}

export async function deactivateAcademyResource(
  resource: AcademyResourceName,
  id: number,
  cookieHeader: string,
  csrfToken: string,
) {
  const response = await fetch(getResourceUrl(resource, id), {
    method: "DELETE",
    cache: "no-store",
    credentials: "include",
    headers: getWriteHeaders(cookieHeader, csrfToken),
  });

  if (!response.ok) {
    throw new Error(`Could not deactivate ${resource}.`);
  }

  return response.json();
}
