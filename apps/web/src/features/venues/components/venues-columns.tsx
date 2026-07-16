"use client";

import { MapPinned } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import type { Venue } from "@/features/venues/api";

import { RowActions, StatusBadge, type AcademicColumnOptions } from "./academic-table-shared";

export function getVenueColumns(options: AcademicColumnOptions): ColumnDef<Venue>[] {
  const fields = options.resourceMessages.fields as Record<string, string>;

  return [
    {
      accessorKey: "name",
      header: fields.name,
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.name}</p>
          {row.original.notes ? <p className="mt-1 text-xs text-muted">{row.original.notes}</p> : null}
        </div>
      ),
    },
    {
      accessorKey: "district",
      header: fields.district,
    },
    {
      accessorKey: "address",
      header: fields.address,
    },
    {
      id: "map",
      header: options.messages.table.map,
      cell: ({ row }) =>
        row.original.google_maps_url ? (
          <a
            aria-label={options.messages.mapAction}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-primary/45 bg-primary-soft text-primary transition-colors hover:bg-surface-raised"
            href={row.original.google_maps_url}
            rel="noreferrer"
            target="_blank"
          >
            <MapPinned aria-hidden className="h-4 w-4" />
          </a>
        ) : (
          <span className="text-muted">-</span>
        ),
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "status",
      header: options.messages.table.status,
      cell: ({ row }) => <StatusBadge labels={options.messages.status} status={row.original.status} />,
      enableSorting: false,
      size: 128,
    },
    {
      id: "actions",
      header: options.messages.table.actions,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <RowActions
            deactivateAction={options.deactivateAction}
            id={row.original.id}
            messages={options.messages}
            resource="venues"
            status={row.original.status}
            updateAction={options.updateAction}
          />
        </div>
      ),
      enableSorting: false,
      size: 72,
    },
  ];
}
