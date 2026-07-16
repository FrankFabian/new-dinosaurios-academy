"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import {
  type AcademyResourceName,
  createAcademyResource,
  deactivateAcademyResource,
  updateAcademyResource,
} from "@/features/venues/api";

function present(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();

  return text.length > 0 ? text : undefined;
}

function numberValue(value: FormDataEntryValue | null) {
  const text = present(value);

  return text === undefined ? undefined : Number(text);
}

function nullableValue(value: FormDataEntryValue | null) {
  return present(value) ?? null;
}

function maybeNumber(name: string, formData: FormData) {
  return formData.has(name) ? numberValue(formData.get(name)) : undefined;
}

function payloadFor(resource: AcademyResourceName, formData: FormData) {
  if (resource === "venues") {
    return {
      name: present(formData.get("name")),
      address: present(formData.get("address")),
      district: present(formData.get("district")),
      google_maps_url: nullableValue(formData.get("google_maps_url")),
      notes: nullableValue(formData.get("notes")),
      status: present(formData.get("status")),
    };
  }

  if (resource === "courts") {
    return {
      venue: numberValue(formData.get("venue")),
      name: present(formData.get("name")),
      notes: nullableValue(formData.get("notes")),
      status: present(formData.get("status")),
    };
  }

  if (resource === "disciplines") {
    return {
      slug: present(formData.get("slug")),
      name: present(formData.get("name")),
      sort_order: maybeNumber("sort_order", formData),
      status: present(formData.get("status")),
    };
  }

  return {
    name: present(formData.get("name")),
    code: nullableValue(formData.get("code")),
    min_age: numberValue(formData.get("min_age")) ?? null,
    max_age: numberValue(formData.get("max_age")) ?? null,
    sort_order: maybeNumber("sort_order", formData),
    status: present(formData.get("status")),
  };
}

async function getSessionHeaders() {
  const cookieStore = await cookies();

  return {
    cookieHeader: cookieStore.toString(),
    csrfToken: cookieStore.get("csrftoken")?.value ?? "",
  };
}

export async function createAcademyResourceAction(resource: AcademyResourceName, formData: FormData) {
  const { cookieHeader, csrfToken } = await getSessionHeaders();

  await createAcademyResource(resource, payloadFor(resource, formData), cookieHeader, csrfToken);
  revalidatePath("/structure");
}

export async function updateAcademyResourceAction(resource: AcademyResourceName, formData: FormData) {
  const id = Number(formData.get("id"));
  const { cookieHeader, csrfToken } = await getSessionHeaders();

  await updateAcademyResource(resource, id, payloadFor(resource, formData), cookieHeader, csrfToken);
  revalidatePath("/structure");
}

export async function deactivateAcademyResourceAction(resource: AcademyResourceName, formData: FormData) {
  const id = Number(formData.get("id"));
  const { cookieHeader, csrfToken } = await getSessionHeaders();

  await deactivateAcademyResource(resource, id, cookieHeader, csrfToken);
  revalidatePath("/structure");
}
