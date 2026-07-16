"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { Court } from "@/features/venues/api";

import { RowActions, StatusBadge, type AcademicColumnOptions } from "./academic-table-shared";

export function getCourtColumns(options: AcademicColumnOptions): ColumnDef<Court>[] {
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
      accessorKey: "venue_name",
      header: fields.venue,
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
            resource="courts"
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
