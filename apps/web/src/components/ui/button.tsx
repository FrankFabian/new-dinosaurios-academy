import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 disabled:pointer-events-none disabled:opacity-60",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "min-h-10 px-3 py-2",
        icon: "h-8 min-h-8 w-8 p-0",
        sm: "min-h-9 px-3 py-1.5",
      },
      variant: {
        default:
          "border border-[oklch(64%_0.12_158)] bg-[oklch(45%_0.12_158)] text-foreground hover:border-[oklch(75%_0.14_158)] hover:bg-[oklch(52%_0.135_158)] hover:shadow-[0_0_0_3px_oklch(66%_0.14_158_/_0.18)]",
        ghost: "bg-transparent text-muted hover:bg-surface-raised hover:text-foreground",
        outline: "border border-border bg-background text-muted hover:bg-surface-raised hover:text-foreground",
        secondary: "border border-border bg-surface-raised text-foreground hover:bg-surface-soft",
      },
    },
  },
);

export type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ asChild = false, className, size, variant, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component className={cn(buttonVariants({ className, size, variant }))} {...props} />
  );
}
