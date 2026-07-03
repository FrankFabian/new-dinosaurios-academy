import { ClipboardCheck, CreditCard, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { homeCopy } from "@/lib/i18n/messages";

const summaryItems = [
  { label: homeCopy.summary.students, value: "0", icon: Users },
  { label: homeCopy.summary.receipts, value: "0", icon: CreditCard },
  { label: homeCopy.summary.attendance, value: "0", icon: ClipboardCheck },
  { label: homeCopy.summary.venues, value: "0", icon: MapPin }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-border bg-shell px-5 py-4 lg:border-b-0 lg:border-r">
          <div className="space-y-1">
            <p className="text-sm font-semibold">{homeCopy.brand}</p>
            <p className="text-xs text-muted">{homeCopy.workspace}</p>
          </div>
          <nav className="mt-8 grid gap-1 text-sm text-muted">
            {homeCopy.navigation.map((item) => (
              <span
                className="rounded-sm px-3 py-2 first:bg-surface-raised first:text-primary"
                key={item}
              >
                {item}
              </span>
            ))}
          </nav>
        </aside>

        <section className="px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl">
              <Badge>{homeCopy.status}</Badge>
              <h1 className="mt-3 text-2xl font-semibold leading-tight">{homeCopy.title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{homeCopy.description}</p>
            </div>
            <Button>{homeCopy.primaryAction}</Button>
          </header>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {summaryItems.map((item) => (
              <div className="rounded-md border border-border bg-surface p-4" key={item.label}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted">{item.label}</span>
                  <item.icon aria-hidden className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-3 text-2xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          <section className="mt-6 grid gap-3 md:grid-cols-3">
            {homeCopy.defaults.map((item) => (
              <div className="rounded-md border border-border bg-surface px-4 py-3" key={item.label}>
                <p className="text-xs font-medium text-muted">{item.label}</p>
                <p className="mt-1 text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </section>

          <section className="mt-6 rounded-md border border-border bg-surface">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-base font-semibold">{homeCopy.nextSteps.title}</h2>
            </div>
            <div className="divide-y divide-border">
              {homeCopy.nextSteps.items.map((item) => (
                <div className="grid gap-1 px-4 py-3 sm:grid-cols-[180px_1fr]" key={item.label}>
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-muted">{item.description}</span>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
