"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      closeButton
      position="bottom-right"
      toastOptions={{
        classNames: {
          actionButton:
            "group-[.toaster]:border group-[.toaster]:border-[oklch(64%_0.12_158)] group-[.toaster]:bg-[oklch(45%_0.12_158)] group-[.toaster]:text-foreground",
          cancelButton: "group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:bg-background group-[.toaster]:text-muted",
          description: "group-[.toast]:text-muted",
          error: "group-[.toaster]:border-destructive/60",
          success: "group-[.toaster]:border-primary/60",
          toast:
            "group toast group-[.toaster]:border-border group-[.toaster]:bg-surface group-[.toaster]:text-foreground group-[.toaster]:shadow-none",
        },
      }}
      {...props}
    />
  );
}
