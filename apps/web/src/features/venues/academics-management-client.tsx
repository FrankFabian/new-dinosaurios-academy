"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type AcademyFormField = {
  disabled?: boolean;
  label: string;
  name: string;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
  type?: "number" | "text";
  validation?: "age" | "categoryCode" | "httpsUrl" | "slug";
};

type AcademyResourceFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  cancelHref?: string;
  cancelLabel?: string;
  defaultValues?: Record<string, string>;
  disabled?: boolean;
  fields: AcademyFormField[];
  requireDirty?: boolean;
  errorMessage: string;
  successMessage: string;
  submitLabel: string;
  validationMessages: AcademyFormValidationMessages;
};

type FormValues = Record<string, unknown>;
type AcademyFormValidationMessages = {
  ageBounds: string;
  agePair: string;
  ageRange: string;
  categoryCode: string;
  httpsUrl: string;
  required: string;
  slug: string;
};

function optionalText() {
  return z.preprocess((value) => (value === "" ? undefined : value), z.string().optional());
}

function optionalInteger(messages: AcademyFormValidationMessages) {
  return z.preprocess(
    (value) => (value === "" || value === undefined ? undefined : Number(value)),
    z.number().int(messages.ageBounds).min(0, messages.ageBounds).max(99, messages.ageBounds).optional(),
  );
}

function fieldSchema(field: AcademyFormField, messages: AcademyFormValidationMessages) {
  if (field.validation === "age") {
    return optionalInteger(messages);
  }

  const baseSchema = field.required
    ? z.string().trim().min(1, messages.required)
    : optionalText();

  if (field.validation === "categoryCode") {
    return baseSchema.refine((value) => value === undefined || /^[A-Za-z0-9-]+$/.test(value), {
      message: messages.categoryCode,
    });
  }

  if (field.validation === "httpsUrl") {
    return baseSchema.refine((value) => value === undefined || value.startsWith("https://"), {
      message: messages.httpsUrl,
    });
  }

  if (field.validation === "slug") {
    return baseSchema.refine((value) => value === undefined || /^[a-z0-9-]+$/.test(value), {
      message: messages.slug,
    });
  }

  return baseSchema;
}

function buildSchema(fields: AcademyFormField[], messages: AcademyFormValidationMessages) {
  const shape = Object.fromEntries(
    fields.map((field) => [field.name, fieldSchema(field, messages)]),
  );

  return z.object(shape).superRefine((values, context) => {
    if (!("min_age" in values) || !("max_age" in values)) {
      return;
    }

    const minAge = values.min_age;
    const maxAge = values.max_age;

    if ((minAge === undefined) !== (maxAge === undefined)) {
      context.addIssue({ code: "custom", message: messages.agePair, path: ["max_age"] });
      return;
    }

    if (typeof minAge === "number" && typeof maxAge === "number" && minAge > maxAge) {
      context.addIssue({ code: "custom", message: messages.ageRange, path: ["min_age"] });
    }
  });
}

export function AcademicsManagementClient({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function AcademyResourceForm({
  action,
  cancelHref,
  cancelLabel,
  defaultValues = {},
  disabled = false,
  errorMessage,
  fields,
  requireDirty = false,
  successMessage,
  submitLabel,
  validationMessages,
}: AcademyResourceFormProps) {
  const router = useRouter();
  const schema = useMemo(() => buildSchema(fields, validationMessages), [fields, validationMessages]);
  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const formData = new FormData();

      for (const field of fields) {
        formData.set(field.name, String(values[field.name] ?? ""));
      }

      if (defaultValues.id) {
        formData.set("id", defaultValues.id);
      }

      await action(formData);
    },
    onError: () => {
      toast.error(errorMessage);
    },
    onSuccess: (_result, values) => {
      form.reset(values);
      toast.success(successMessage);
      if (cancelHref) {
        router.replace(cancelHref);
      }
      router.refresh();
    },
  });
  const SubmitIcon = requireDirty ? Pencil : Plus;

  return (
    <form className="grid gap-3" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {fields.map((field) => (
          <Label className="grid gap-1" key={field.name}>
            {field.label}
            {field.options ? (
              <select
                className="h-10 rounded-md border border-border bg-surface-raised px-3 text-sm text-foreground"
                disabled={disabled || mutation.isPending || field.disabled}
                required={field.required}
                {...form.register(field.name)}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                disabled={disabled || mutation.isPending || field.disabled}
                required={field.required}
                type={field.type ?? "text"}
                {...form.register(field.name)}
              />
            )}
            {form.formState.errors[field.name] ? (
              <span className="text-xs text-destructive">{String(form.formState.errors[field.name]?.message)}</span>
            ) : null}
          </Label>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          className="w-fit gap-2"
          disabled={disabled || mutation.isPending || (requireDirty && !form.formState.isDirty)}
          type="submit"
        >
          <SubmitIcon aria-hidden className="h-4 w-4" />
          {submitLabel}
        </Button>
        {cancelHref && cancelLabel ? (
          <Button asChild variant="outline">
            <Link href={cancelHref}>{cancelLabel}</Link>
          </Button>
        ) : null}
      </div>
    </form>
  );
}

export function VenueFilterSelect({
  label,
  selectedStatus,
  selectedVenue,
  venues,
}: {
  label: string;
  selectedStatus: string;
  selectedVenue: string;
  venues: Array<{ id: number; name: string }>;
}) {
  const router = useRouter();

  return (
    <label className="ml-auto flex min-h-9 items-center gap-2 text-xs font-semibold text-muted">
      {label}
      <select
        className="h-9 rounded-md border border-border bg-surface-raised px-3 text-sm font-medium text-foreground"
        defaultValue={selectedVenue}
        onChange={(event) => {
          const params = new URLSearchParams({
            section: "courts",
            status: selectedStatus,
          });

          if (event.target.value !== "all") {
            params.set("venue", event.target.value);
          }

          router.push(`/structure?${params.toString()}`);
        }}
      >
        <option value="all">Todas las sedes</option>
        {venues.map((venue) => (
          <option key={venue.id} value={venue.id}>
            {venue.name}
          </option>
        ))}
      </select>
    </label>
  );
}
