import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "h-10 rounded-md border border-border bg-surface-raised px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary/45 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
