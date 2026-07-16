"use client";

import { Archive, MoreHorizontal, Pencil, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { AcademyResourceForm } from "@/features/venues/academics-management-client";
import type { AcademyResourceName, Category, Court, Discipline, Venue } from "@/features/venues/api";
import type { getMessages } from "@/lib/i18n/messages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { defaultValuesForResource, fieldsForResource } from "./academic-resource-form-config";

export type AcademicMessages = ReturnType<typeof getMessages>["academics"];
export type ResourceMessages = AcademicMessages["resources"][AcademyResourceName];
export type AcademicAction = (formData: FormData) => void | Promise<void>;
export type AcademicRow = Venue | Court | Discipline | Category;

export type AcademicColumnOptions = {
  activeVenues: Venue[];
  deactivateAction: AcademicAction;
  messages: AcademicMessages;
  resourceMessages: ResourceMessages;
  updateAction: AcademicAction;
};

export function StatusBadge({ labels, status }: { labels: AcademicMessages["status"]; status: "active" | "inactive" }) {
  return (
    <Badge className={status === "active" ? "border-primary/50 bg-primary-soft text-primary" : "border-border bg-background text-muted"}>
      {status === "active" ? labels.active : labels.inactive}
    </Badge>
  );
}

export function RowActions({
  deactivateAction,
  id,
  messages,
  resource,
  status,
  updateAction,
}: {
  deactivateAction: AcademicAction;
  id: number;
  messages: AcademicMessages;
  resource: AcademyResourceName;
  status: "active" | "inactive";
  updateAction: AcademicAction;
}) {
  const router = useRouter();
  const deactivateMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.set("id", String(id));

      await deactivateAction(formData);
    },
    onError: () => {
      toast.error(messages.toasts.error);
    },
    onSuccess: () => {
      toast.success(messages.toasts.deactivateSuccess);
      router.refresh();
    },
  });
  const reactivateMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.set("id", String(id));
      formData.set("status", "active");

      await updateAction(formData);
    },
    onError: () => {
      toast.error(messages.toasts.error);
    },
    onSuccess: () => {
      toast.success(messages.toasts.reactivateSuccess);
      router.refresh();
    },
  });
  const isPending = deactivateMutation.isPending || reactivateMutation.isPending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label={messages.table.actions} disabled={isPending} size="icon" type="button" variant="ghost">
          <MoreHorizontal aria-hidden className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/structure?section=${resource}&editing=${resource}:${id}`}>
            <Pencil aria-hidden className="h-3.5 w-3.5" />
            {messages.editModeAction}
          </Link>
        </DropdownMenuItem>
        {status === "active" ? (
          <DropdownMenuItem disabled={isPending} onSelect={() => deactivateMutation.mutate()}>
            <Archive aria-hidden className="h-3.5 w-3.5" />
            {messages.deactivateAction}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="text-primary" disabled={isPending} onSelect={() => reactivateMutation.mutate()}>
            <RotateCcw aria-hidden className="h-3.5 w-3.5" />
            {messages.reactivateAction}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function InlineEditPanel({
  activeVenues,
  messages,
  resource,
  resourceMessages,
  row,
  updateAction,
}: {
  activeVenues: Venue[];
  messages: AcademicMessages;
  resource: AcademyResourceName;
  resourceMessages: ResourceMessages;
  row: AcademicRow;
  updateAction: AcademicAction;
}) {
  return (
    <div className="rounded-md border border-primary/55 bg-background p-4">
      <div className="mb-4">
        <h3 className="text-base font-semibold">{resourceMessages.editTitle}</h3>
        <p className="mt-1 text-sm leading-6 text-muted">{messages.validation.required}</p>
      </div>
      <AcademyResourceForm
        action={updateAction}
        cancelHref={`/structure?section=${resource}`}
        cancelLabel={messages.cancelAction}
        defaultValues={defaultValuesForResource(resource, row)}
        errorMessage={messages.toasts.error}
        fields={fieldsForResource(resource, resourceMessages, activeVenues, row)}
        requireDirty
        successMessage={messages.toasts.updateSuccess}
        submitLabel={messages.editAction}
        validationMessages={messages.validation}
      />
    </div>
  );
}

export function ageRangeLabel(messages: AcademicMessages, category: Category) {
  return category.min_age === null || category.max_age === null
    ? messages.resources.categories.noAgeRange
    : `${category.min_age}-${category.max_age}`;
}
