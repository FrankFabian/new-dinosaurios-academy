import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}
