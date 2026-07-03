import {
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  Languages,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { loginWithPassword, logoutCurrentUser } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/current-user";
import type { NavigationKey } from "@/lib/auth/navigation";
import { getNavigationForRoles } from "@/lib/auth/navigation";
import { getConfiguredLocale, getMessages } from "@/lib/i18n/messages";

const navigationIcons: Record<NavigationKey, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  students: Users,
  guardians: ShieldCheck,
  venues: MapPin,
  classes: CalendarDays,
  enrollments: ClipboardCheck,
  billing: CreditCard,
  attendance: ClipboardCheck,
  events: CalendarDays,
  reports: BarChart3,
  settings: Settings,
  portal: Users,
};

const summaryIcons = [Users, CreditCard, ClipboardCheck, MapPin];

type HomePageProps = {
  searchParams?: Promise<{
    auth?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const locale = getConfiguredLocale();
  const messages = getMessages(locale);
  const authState = await getCurrentUser();
  const params = await searchParams;
  const authMessage =
    params?.auth === "invalid"
      ? messages.shell.signedOut.invalidCredentials
      : params?.auth === "unavailable"
        ? messages.shell.signedOut.unavailable
        : null;

  if (authState.status !== "authenticated") {
    const signedOutMessage =
      authState.status === "unavailable" ? messages.shell.signedOut.unavailable : authMessage;

    return (
      <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
        <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-3xl flex-col justify-center">
          <div className="rounded-md border border-border bg-surface p-5 sm:p-6">
            <Badge>{messages.shell.signedOut.status}</Badge>
            <h1 className="mt-4 text-2xl font-semibold leading-tight">{messages.shell.signedOut.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{messages.shell.signedOut.description}</p>
            <form action={loginWithPassword} className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="username">
                  {messages.shell.signedOut.usernameLabel}
                </label>
                <input
                  autoComplete="username"
                  className="h-10 rounded-sm border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted"
                  id="username"
                  name="username"
                  required
                  type="email"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="password">
                  {messages.shell.signedOut.passwordLabel}
                </label>
                <input
                  autoComplete="current-password"
                  className="h-10 rounded-sm border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted"
                  id="password"
                  name="password"
                  required
                  type="password"
                />
              </div>
              {signedOutMessage ? (
                <p className="rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground">
                  {signedOutMessage}
                </p>
              ) : null}
              <Button className="w-full sm:w-fit" type="submit">
                {messages.shell.signedOut.primaryAction}
              </Button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  const navigationItems = getNavigationForRoles(authState.user.roles);
  const roleLabel = authState.user.roles.map((role) => messages.shell.roles[role]).join(", ");
  const summaryItems = [
    { label: messages.shell.summary.students, value: "0" },
    { label: messages.shell.summary.receipts, value: "0" },
    { label: messages.shell.summary.attendance, value: "0" },
    { label: messages.shell.summary.venues, value: "0" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[272px_1fr]">
        <aside className="hidden border-r border-border bg-shell px-4 py-4 lg:block">
          <div className="rounded-md border border-border bg-surface px-4 py-3">
            <p className="text-sm font-semibold">{messages.shell.brand}</p>
            <p className="mt-1 text-xs text-muted">{messages.shell.workspace}</p>
          </div>

          <nav className="mt-5 grid gap-1 text-sm" aria-label={messages.shell.menu}>
            {navigationItems.map((item, index) => {
              const Icon = navigationIcons[item.key];

              return (
                <a
                  className="flex min-h-9 items-center gap-2 rounded-sm px-3 py-2 text-muted transition-colors hover:bg-surface-raised hover:text-foreground data-[active=true]:bg-surface-raised data-[active=true]:text-primary"
                  data-active={index === 0}
                  href={item.href}
                  key={item.key}
                >
                  <Icon aria-hidden className="h-4 w-4" />
                  <span>{messages.shell.navigation[item.key]}</span>
                </a>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0">
          <details className="border-b border-border bg-shell lg:hidden">
            <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 text-sm font-semibold">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-surface text-foreground">
                <Menu aria-hidden className="h-5 w-5" />
              </span>
              <span className="min-w-0 truncate">{messages.shell.brand}</span>
            </summary>
            <nav className="grid gap-1 px-4 pb-4 text-sm" aria-label={messages.shell.menu}>
              {navigationItems.map((item, index) => {
                const Icon = navigationIcons[item.key];

                return (
                  <a
                    className="flex min-h-10 items-center gap-2 rounded-sm px-3 py-2 text-muted transition-colors hover:bg-surface-raised hover:text-foreground data-[active=true]:bg-surface-raised data-[active=true]:text-primary"
                    data-active={index === 0}
                    href={item.href}
                    key={item.key}
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                    <span>{messages.shell.navigation[item.key]}</span>
                  </a>
                );
              })}
            </nav>
          </details>

          <header className="flex flex-col gap-4 border-b border-border bg-shell px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <Badge>{messages.shell.status}</Badge>
              <span className="text-xs text-muted">{roleLabel || authState.user.email}</span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative min-w-0 sm:w-72">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                />
                <span className="sr-only">{messages.shell.search}</span>
                <input
                  className="h-10 w-full rounded-sm border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted"
                  placeholder={messages.shell.search}
                  type="search"
                />
              </label>

              <div className="flex items-center gap-2">
                <Badge className="gap-1 border-border bg-surface text-muted">
                  <Languages aria-hidden className="h-3.5 w-3.5" />
                  {messages.shell.localeName}
                </Badge>
                <form action={logoutCurrentUser}>
                  <Button className="gap-2 bg-surface-raised text-foreground hover:bg-surface" type="submit">
                    <LogOut aria-hidden className="h-4 w-4" />
                    {messages.shell.signOut}
                  </Button>
                </form>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <section className="flex flex-col gap-4 border-b border-border pb-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-medium text-primary">{messages.shell.authenticatedAs}</p>
                <h1 className="mt-2 text-2xl font-semibold leading-tight">{messages.shell.title}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{messages.shell.description}</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button>{messages.shell.primaryAction}</Button>
                <Button className="bg-surface-raised text-foreground hover:bg-surface">
                  {messages.shell.secondaryAction}
                </Button>
              </div>
            </section>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {summaryItems.map((item, index) => {
                const Icon = summaryIcons[index];

                return (
                  <div className="rounded-md border border-border bg-surface p-4" key={item.label}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-muted">{item.label}</span>
                      <Icon aria-hidden className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold">{item.value}</p>
                  </div>
                );
              })}
            </div>

            <section className="mt-6 grid gap-3 md:grid-cols-3">
              {messages.shell.defaults.map((item) => (
                <div className="rounded-md border border-border bg-surface px-4 py-3" key={item.label}>
                  <p className="text-xs font-medium text-muted">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold">{item.value}</p>
                </div>
              ))}
            </section>

            <section className="mt-6 rounded-md border border-border bg-surface">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-base font-semibold">{messages.shell.workQueue.title}</h2>
              </div>
              <div className="divide-y divide-border">
                {messages.shell.workQueue.items.map((item) => (
                  <div className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_72px_180px] sm:items-center" key={item.label}>
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm font-semibold">{item.value}</span>
                    <span className="text-sm text-muted">{item.status}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
