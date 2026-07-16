import { Building2, Dumbbell, MapPinned, Plus, Tags } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  createAcademyResourceAction,
  deactivateAcademyResourceAction,
  updateAcademyResourceAction,
} from "@/features/venues/actions";
import {
  AcademyResourceForm,
  VenueFilterSelect,
} from "@/features/venues/academics-management-client";
import { AcademicResourceTable } from "@/features/venues/components/academic-resource-table";
import { fieldsForResource } from "@/features/venues/components/academic-resource-form-config";
import type { AcademyResourceName, AcademyStructure, Court, Venue } from "@/features/venues/api";
import { getMessages } from "@/lib/i18n/messages";

const sectionLinks = [
  ["venues", Building2],
  ["courts", MapPinned],
  ["disciplines", Dumbbell],
  ["categories", Tags],
] as const satisfies ReadonlyArray<readonly [AcademyResourceName, LucideIcon]>;

export type VenuesSearchParams = {
  create?: string;
  editing?: string;
  section?: string;
  status?: string;
  venue?: string;
};

type Messages = ReturnType<typeof getMessages>["academics"];
type ResourceMessages = Messages["resources"][AcademyResourceName];
type StatusFilter = "active" | "inactive" | "all";

const statusFilters = ["active", "inactive", "all"] as const;

function isSectionKey(value: string | undefined): value is AcademyResourceName {
  return sectionLinks.some(([key]) => key === value);
}

function isStatusFilter(value: string | undefined): value is StatusFilter {
  return statusFilters.some((filter) => filter === value);
}

function getResourceMessages(messages: Messages, resource: AcademyResourceName) {
  const resourceMessagesBySection = {
    venues: messages.resources.venues,
    courts: messages.resources.courts,
    disciplines: messages.resources.disciplines,
    categories: messages.resources.categories,
  };

  return resourceMessagesBySection[resource];
}

function getEmptyState(messages: Messages, resource: AcademyResourceName, activeVenues: Venue[]) {
  const emptyStatesBySection = {
    venues: messages.emptyStates.venues,
    courts: activeVenues.length === 0 ? messages.emptyStates.courtsWithoutVenues : messages.emptyStates.courts,
    disciplines: messages.emptyStates.disciplines,
    categories: messages.emptyStates.categories,
  };

  return emptyStatesBySection[resource];
}

export function VenuesManagementPage({
  messages,
  searchParams,
  structure,
}: {
  messages: Messages;
  searchParams: VenuesSearchParams;
  structure: AcademyStructure;
}) {
  const params = searchParams;
  const activeSection = "venues";
  const selectedSection = isSectionKey(params.section) ? params.section : activeSection;
  const selectedStatus = isStatusFilter(params.status) ? params.status : "active";
  const selectedVenue = params.venue ?? "all";
  const createOpen = params.create === selectedSection;
  const editingKey = params.editing ?? "";

  const activeVenues = structure.venues.filter((venue) => venue.status === "active");

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase text-primary">{messages.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">{messages.title}</h1>
          <p className="mt-3 text-sm leading-6 text-muted">{messages.description}</p>
        </div>

        <nav className="mt-6 flex gap-2 overflow-x-auto pb-1" aria-label={messages.tabsLabel}>
          {sectionLinks.map(([key, Icon]) => {
            const isActive = key === selectedSection;

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground aria-[current=page]:border-primary/70 aria-[current=page]:bg-primary-soft aria-[current=page]:text-primary"
                href={`/structure?section=${key}`}
                key={key}
              >
                <Icon aria-hidden className="h-4 w-4" />
                {getResourceMessages(messages, key).title}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5">
          <ActiveSection
            activeVenues={activeVenues}
            createOpen={createOpen}
            messages={messages}
            resource={selectedSection}
            selectedStatus={selectedStatus}
            selectedVenue={selectedVenue}
            editingKey={editingKey}
            structure={structure}
          />
        </div>
      </section>
    </div>
  );
}

function ActiveSection({
  activeVenues,
  createOpen,
  messages,
  resource,
  selectedStatus,
  selectedVenue,
  editingKey,
  structure,
}: {
  activeVenues: Venue[];
  createOpen: boolean;
  editingKey: string;
  messages: Messages;
  resource: AcademyResourceName;
  selectedStatus: StatusFilter;
  selectedVenue: string;
  structure: AcademyStructure;
}) {
  const createAction = createAcademyResourceAction.bind(null, resource);
  const updateAction = updateAcademyResourceAction.bind(null, resource);
  const deactivateAction = deactivateAcademyResourceAction.bind(null, resource);
  const resourceMessages = getResourceMessages(messages, resource);
  const scopedRows = getScopedRows(resource, structure, selectedVenue);
  const rows = getRows(resource, structure, selectedStatus, selectedVenue);
  const isFilteredEmpty = rows.length === 0 && scopedRows.length > 0;

  return (
    <section className="grid gap-4" id={resource}>
      <div className="rounded-lg border border-border bg-surface px-4 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-base font-semibold">{resourceMessages.title}</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{resourceMessages.description}</p>
          </div>
          <Button asChild className="gap-2" size="sm">
            <Link href={`/structure?section=${resource}&create=${resource}`}>
              <Plus aria-hidden className="h-4 w-4" />
              {resourceMessages.createAction}
            </Link>
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-md border border-border bg-background px-3 py-3">
          <span className="text-xs font-semibold text-muted">{messages.table.status}</span>
          <StatusFilterLinks active={selectedStatus} section={resource} />
          {resource === "courts" ? (
            <VenueFilterLinks
              messages={messages}
              selectedStatus={selectedStatus}
              selectedVenue={selectedVenue}
              venues={structure.venues}
            />
          ) : null}
        </div>
      </div>

      {createOpen ? (
        <InlineCreateForm
          action={createAction}
          activeVenues={activeVenues}
          disabled={resource === "courts" && activeVenues.length === 0}
          messages={messages}
          resource={resource}
          resourceMessages={resourceMessages}
        />
      ) : null}

      {rows.length > 0 ? (
        <AcademicResourceTable
          activeVenues={activeVenues}
          deactivateAction={deactivateAction}
          editingKey={editingKey}
          messages={messages}
          resource={resource}
          resourceMessages={resourceMessages}
          rows={rows}
          updateAction={updateAction}
        />
      ) : isFilteredEmpty ? (
        <FilteredEmptyState messages={messages} resource={resource} />
      ) : (
        <EmptyState messages={messages} resource={resource} activeVenues={activeVenues} />
      )}
    </section>
  );
}

function getRows(
  resource: AcademyResourceName,
  structure: AcademyStructure,
  status: StatusFilter,
  venueFilter: string,
) {
  return getScopedRows(resource, structure, venueFilter).filter((row) => status === "all" || row.status === status);
}

function getScopedRows(resource: AcademyResourceName, structure: AcademyStructure, venueFilter: string) {
  const rows = structure[resource];

  if (resource === "courts" && venueFilter !== "all") {
    return (rows as Court[]).filter((court) => String(court.venue) === venueFilter);
  }

  return rows;
}

function StatusFilterLinks({ active, section }: { active: StatusFilter; section: AcademyResourceName }) {
  const labels: Record<StatusFilter, string> = {
    active: "Activos",
    inactive: "Inactivos",
    all: "Todos",
  };

  return (
    <span className="inline-flex flex-wrap gap-2">
      {statusFilters.map((status) => (
        <Link
          className="inline-flex min-h-8 items-center rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-foreground data-[active=true]:border-primary/70 data-[active=true]:bg-primary-soft data-[active=true]:font-semibold data-[active=true]:text-primary"
          data-active={active === status}
          href={`/structure?section=${section}&status=${status}`}
          key={status}
        >
          {labels[status]}
        </Link>
      ))}
    </span>
  );
}

function VenueFilterLinks({
  messages,
  selectedStatus,
  selectedVenue,
  venues,
}: {
  messages: Messages;
  selectedStatus: StatusFilter;
  selectedVenue: string;
  venues: Venue[];
}) {
  return (
    <VenueFilterSelect
      label={messages.resources.courts.fields.venue}
      selectedStatus={selectedStatus}
      selectedVenue={selectedVenue}
      venues={venues}
    />
  );
}

function InlineCreateForm({
  action,
  activeVenues,
  disabled,
  messages,
  resource,
  resourceMessages,
}: {
  action: (formData: FormData) => void | Promise<void>;
  activeVenues: Venue[];
  disabled: boolean;
  messages: Messages;
  resource: AcademyResourceName;
  resourceMessages: ResourceMessages;
}) {
  return (
    <div className="rounded-lg border border-primary/60 bg-background p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{resourceMessages.createAction}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">
            {disabled ? messages.emptyStates.courtsWithoutVenues.description : messages.validation.required}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <AcademyResourceForm
          action={action}
          cancelHref={`/structure?section=${resource}`}
          cancelLabel={messages.cancelAction}
          disabled={disabled}
          errorMessage={messages.toasts.error}
          fields={fieldsForResource(resource, resourceMessages, activeVenues)}
          successMessage={messages.toasts.createSuccess}
          submitLabel={messages.createAction}
          validationMessages={messages.validation}
        />
      </div>
    </div>
  );
}

function EmptyState({ activeVenues, messages, resource }: { activeVenues: Venue[]; messages: Messages; resource: AcademyResourceName }) {
  const emptyState = getEmptyState(messages, resource, activeVenues);

  return (
    <Link
      className="block rounded-lg border border-border bg-background px-4 py-5 transition-colors hover:border-primary/55 hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
      href={`/structure?section=${resource}&create=${resource}`}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary/45 bg-primary-soft text-primary">
        <Plus aria-hidden className="h-4 w-4" />
      </span>
      <h3 className="mt-4 text-sm font-semibold">{emptyState.title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{emptyState.description}</p>
    </Link>
  );
}

function FilteredEmptyState({ messages, resource }: { messages: Messages; resource: AcademyResourceName }) {
  return (
    <div className="rounded-lg border border-border bg-background px-4 py-5">
      <h3 className="text-sm font-semibold">{messages.filteredEmpty.title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{messages.filteredEmpty.description}</p>
      <Link
        className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-border bg-surface-raised px-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
        href={`/structure?section=${resource}&status=all`}
      >
        {messages.filteredEmpty.clearAction}
      </Link>
    </div>
  );
}
