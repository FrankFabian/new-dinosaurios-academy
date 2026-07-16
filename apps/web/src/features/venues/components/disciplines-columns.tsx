"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { Discipline } from "@/features/venues/api";

import { RowActions, StatusBadge, type AcademicColumnOptions } from "./academic-table-shared";

export function getDisciplineColumns(options: AcademicColumnOptions): ColumnDef<Discipline>[] {
  const fields = options.resourceMessages.fields as Record<string, string>;

  return [
    {
      accessorKey: "name",
      header: fields.name,
      cell: ({ row }) => <span className="font-medium text-foreground">{row.original.name}</span>,
    },
    {
      accessorKey: "slug",
      header: fields.slug,
      cell: ({ row }) => <span className="text-muted">{row.original.slug}</span>,
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
            resource="disciplines"
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
