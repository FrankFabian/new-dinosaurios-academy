import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className={cn("w-full caption-bottom text-left text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn("text-xs text-muted [&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }: ComponentPropsWithoutRef<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableFooter({ className, ...props }: ComponentPropsWithoutRef<"tfoot">) {
  return <tfoot className={cn("border-t bg-surface-raised font-medium", className)} {...props} />;
}

function TableRow({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  return <tr className={cn("border-b border-border transition-colors hover:bg-surface-raised", className)} {...props} />;
}

function TableHead({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return <th className={cn("h-10 px-4 py-3 text-left align-middle font-semibold", className)} {...props} />;
}

function TableCell({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return <td className={cn("px-4 py-3 align-middle", className)} {...props} />;
}

function TableCaption({ className, ...props }: ComponentPropsWithoutRef<"caption">) {
  return <caption className={cn("mt-4 text-sm text-muted", className)} {...props} />;
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
