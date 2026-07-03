import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-sm border border-primary/40 bg-primary/10 px-2 py-1 text-xs font-medium text-primary",
        className
      )}
      {...props}
    />
  );
}
