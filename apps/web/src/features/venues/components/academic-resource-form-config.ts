import type { AcademyFormField } from "@/features/venues/academics-management-client";
import type { AcademyResourceName, Category, Court, Discipline, Venue } from "@/features/venues/api";
import type { getMessages } from "@/lib/i18n/messages";

type Messages = ReturnType<typeof getMessages>["academics"];
type ResourceMessages = Messages["resources"][AcademyResourceName];

export function fieldsForResource(
  resource: AcademyResourceName,
  messages: ResourceMessages,
  activeVenues: Venue[],
  row?: Venue | Court | Discipline | Category,
): AcademyFormField[] {
  const fieldLabels = messages.fields as Record<string, string>;

  if (resource === "venues") {
    return [
      { label: fieldLabels.name, name: "name", required: true },
      { label: fieldLabels.district, name: "district", required: true },
      { label: fieldLabels.address, name: "address", required: true },
      { label: fieldLabels.google_maps_url, name: "google_maps_url", validation: "httpsUrl" },
      { label: fieldLabels.notes, name: "notes" },
    ];
  }

  if (resource === "courts") {
    const fields: AcademyFormField[] = [
      { label: fieldLabels.name, name: "name", required: true },
      { label: fieldLabels.notes, name: "notes" },
    ];

    if (row) {
      const court = row as Court;

      return [
        {
          disabled: true,
          label: fieldLabels.venue,
          name: "venue",
          options: [{ label: court.venue_name, value: String(court.venue) }],
          required: true,
        },
        ...fields,
      ];
    }

    return [
      {
        label: fieldLabels.venue,
        name: "venue",
        options: activeVenues.map((venue) => ({ label: venue.name, value: String(venue.id) })),
        required: true,
      },
      ...fields,
    ];
  }

  if (resource === "disciplines") {
    return [
      { label: fieldLabels.name, name: "name", required: true },
      { disabled: Boolean(row), label: fieldLabels.slug, name: "slug", required: true, validation: "slug" },
    ];
  }

  return [
    { label: fieldLabels.name, name: "name", required: true },
    { label: fieldLabels.code, name: "code", validation: "categoryCode" },
    { label: fieldLabels.min_age, name: "min_age", type: "number", validation: "age" },
    { label: fieldLabels.max_age, name: "max_age", type: "number", validation: "age" },
  ];
}

export function defaultValuesForResource(resource: AcademyResourceName, row: Venue | Court | Discipline | Category): Record<string, string> {
  if (resource === "venues") {
    const venue = row as Venue;

    return {
      id: String(venue.id),
      address: venue.address,
      district: venue.district,
      google_maps_url: venue.google_maps_url ?? "",
      name: venue.name,
      notes: venue.notes ?? "",
    };
  }

  if (resource === "courts") {
    const court = row as Court;

    return {
      id: String(court.id),
      name: court.name,
      notes: court.notes ?? "",
      venue: String(court.venue),
    };
  }

  if (resource === "disciplines") {
    const discipline = row as Discipline;

    return {
      id: String(discipline.id),
      name: discipline.name,
      slug: discipline.slug,
    };
  }

  const category = row as Category;

  return {
    id: String(category.id),
    code: category.code ?? "",
    max_age: category.max_age?.toString() ?? "",
    min_age: category.min_age?.toString() ?? "",
    name: category.name,
  };
}
