"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import type { Row } from "@tanstack/react-table";

import { DataTable } from "@/components/organisms/data-table";
import type { AcademyResourceName, Category, Court, Discipline, Venue } from "@/features/venues/api";

import { InlineEditPanel, type AcademicAction, type AcademicMessages, type AcademicRow, type ResourceMessages } from "./academic-table-shared";
import { getCategoryColumns } from "./categories-columns";
import { getCourtColumns } from "./courts-columns";
import { getDisciplineColumns } from "./disciplines-columns";
import { getVenueColumns } from "./venues-columns";

type AcademicResourceTableProps = {
  activeVenues: Venue[];
  deactivateAction: AcademicAction;
  editingKey: string;
  messages: AcademicMessages;
  resource: AcademyResourceName;
  resourceMessages: ResourceMessages;
  rows: AcademicRow[];
  updateAction: AcademicAction;
};

export function AcademicResourceTable({
  activeVenues,
  deactivateAction,
  editingKey,
  messages,
  resource,
  resourceMessages,
  rows,
  updateAction,
}: AcademicResourceTableProps) {
  const columnOptions = useMemo(
    () => ({
      activeVenues,
      deactivateAction,
      messages,
      resourceMessages,
      updateAction,
    }),
    [activeVenues, deactivateAction, messages, resourceMessages, updateAction],
  );

  const renderExpandedRow = (row: Row<AcademicRow>) => {
    if (editingKey !== `${resource}:${row.original.id}`) {
      return null;
    }

    return (
      <InlineEditPanel
        activeVenues={activeVenues}
        messages={messages}
        resource={resource}
        resourceMessages={resourceMessages}
        row={row.original}
        updateAction={updateAction}
      />
    );
  };
  const getRowClassName = (row: Row<AcademicRow>) => (row.original.status === "inactive" ? "bg-background text-muted" : undefined);
  const getRowId = (row: AcademicRow) => String(row.id);

  if (resource === "venues") {
    return (
      <DataTable
        columns={getVenueColumns(columnOptions)}
        data={rows as Venue[]}
        emptyText={messages.filteredEmpty.title}
        getRowClassName={getRowClassName as (row: Row<Venue>) => string | undefined}
        getRowId={getRowId}
        renderExpandedRow={renderExpandedRow as (row: Row<Venue>) => ReactNode}
      />
    );
  }

  if (resource === "courts") {
    return (
      <DataTable
        columns={getCourtColumns(columnOptions)}
        data={rows as Court[]}
        emptyText={messages.filteredEmpty.title}
        getRowClassName={getRowClassName as (row: Row<Court>) => string | undefined}
        getRowId={getRowId}
        renderExpandedRow={renderExpandedRow as (row: Row<Court>) => ReactNode}
      />
    );
  }

  if (resource === "disciplines") {
    return (
      <DataTable
        columns={getDisciplineColumns(columnOptions)}
        data={rows as Discipline[]}
        emptyText={messages.filteredEmpty.title}
        getRowClassName={getRowClassName as (row: Row<Discipline>) => string | undefined}
        getRowId={getRowId}
        renderExpandedRow={renderExpandedRow as (row: Row<Discipline>) => ReactNode}
      />
    );
  }

  return (
    <DataTable
      columns={getCategoryColumns(columnOptions)}
      data={rows as Category[]}
      emptyText={messages.filteredEmpty.title}
      getRowClassName={getRowClassName as (row: Row<Category>) => string | undefined}
      getRowId={getRowId}
      renderExpandedRow={renderExpandedRow as (row: Row<Category>) => ReactNode}
    />
  );
}
