"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { Category } from "@/features/venues/api";

import { RowActions, StatusBadge, ageRangeLabel, type AcademicColumnOptions } from "./academic-table-shared";

export function getCategoryColumns(options: AcademicColumnOptions): ColumnDef<Category>[] {
  const fields = options.resourceMessages.fields as Record<string, string>;

  return [
    {
      accessorKey: "name",
      header: fields.name,
      cell: ({ row }) => <span className="font-medium text-foreground">{row.original.name}</span>,
    },
    {
      accessorKey: "code",
      header: fields.code,
      cell: ({ row }) => <span className="text-muted">{row.original.code ?? "-"}</span>,
    },
    {
      id: "age_range",
      header: options.messages.table.ageRange,
      accessorFn: (row) => `${row.min_age ?? 999}-${row.max_age ?? 999}`,
      cell: ({ row }) => <span className="text-muted">{ageRangeLabel(options.messages, row.original)}</span>,
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
            resource="categories"
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
