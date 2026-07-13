import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  CreditCard,
  Eye,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { loginWithPassword, logoutCurrentUser } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/current-user";
import type { NavigationKey } from "@/lib/auth/navigation";
import { getNavigationForRoles } from "@/lib/auth/navigation";
import { getConfiguredLocale, getMessages } from "@/lib/i18n/messages";

const navigationIcons: Record<NavigationKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  students: Users,
  guardians: ShieldCheck,
  venues: Building2,
  classes: CalendarDays,
  enrollments: ClipboardCheck,
  billing: CreditCard,
  attendance: ClipboardCheck,
  events: CalendarDays,
  reports: BarChart3,
  settings: Settings,
  portal: Users,
};

const navGroups = [
  {
    key: "operations",
    items: ["dashboard", "students", "guardians", "classes", "enrollments"],
  },
  {
    key: "attendance",
    items: ["attendance"],
  },
  {
    key: "finance",
    items: ["billing"],
  },
  {
    key: "competition",
    items: ["events"],
  },
  {
    key: "analytics",
    items: ["reports"],
  },
  {
    key: "configuration",
    items: ["venues", "settings"],
  },
  {
    key: "portal",
    items: ["portal"],
  },
] as const satisfies ReadonlyArray<{
  key: keyof ReturnType<typeof getMessages>["shell"]["navGroups"];
  items: readonly NavigationKey[];
}>;

const quickActionIcons = [Users, ClipboardCheck, CreditCard, CalendarDays] as const;

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
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[38%_center] lg:hidden"
          src="/images/login-athlete.png"
        />
        <div className="absolute inset-0 bg-background/62 lg:hidden" />
        <div className="absolute inset-0 bg-primary-soft/35 lg:hidden" />

        <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid w-full lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.95fr_1.05fr] lg:overflow-hidden lg:rounded-[28px] lg:border lg:border-border lg:bg-shell/95 lg:shadow-[0_24px_64px_rgb(0_0_0_/0.42)]">
            <div className="relative hidden min-h-[620px] overflow-hidden border-r border-border lg:block">
              <img
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[36%_center]"
                src="/images/login-athlete.png"
              />
              <div className="absolute inset-0 bg-background/35" />
              <div className="absolute inset-0 bg-primary-soft/45" />
              <div className="relative z-10 flex h-full flex-col justify-between p-10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/45 bg-primary-soft text-primary">
                    <ShieldCheck aria-hidden className="h-8 w-8" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold uppercase leading-none tracking-[0.08em]">
                      {messages.shell.brand.replace(" Academy", "")}
                    </p>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.36em] text-primary">
                      {messages.shell.signedOut.brandKicker}
                    </p>
                  </div>
                </div>

                <div className="max-w-sm pb-8">
                  <h2 className="text-3xl font-semibold leading-tight">
                    {messages.shell.signedOut.panelTitle}
                    <span className="mt-1 block text-primary">{messages.shell.signedOut.panelHighlight}</span>
                  </h2>
                  <div className="mt-5 h-px w-12 bg-primary" />
                  <p className="mt-6 text-base leading-7 text-foreground/82">{messages.shell.signedOut.panelDescription}</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex min-h-[calc(100vh-3rem)] items-end px-5 py-6 sm:px-8 lg:min-h-[620px] lg:items-center lg:justify-center lg:px-12">
              <a
                aria-label={messages.shell.brand}
                className="absolute left-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-raised lg:hidden"
                href="/"
              >
                <ArrowLeft aria-hidden className="h-5 w-5" />
              </a>

              <div className="absolute left-1/2 top-16 flex -translate-x-1/2 items-center gap-3 lg:hidden">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/45 bg-primary-soft text-primary">
                  <ShieldCheck aria-hidden className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-base font-semibold uppercase leading-none tracking-[0.08em]">
                    {messages.shell.brand.replace(" Academy", "")}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.34em] text-primary">
                    {messages.shell.signedOut.brandKicker}
                  </p>
                </div>
              </div>

              <div className="w-full max-w-md">
                <Badge className="mb-4 hidden lg:inline-flex">{messages.shell.signedOut.status}</Badge>
                <h1 className="text-3xl font-semibold leading-tight lg:text-4xl">{messages.shell.signedOut.title}</h1>
                <p className="mt-3 text-base leading-7 text-muted">{messages.shell.signedOut.description}</p>

                <form action={loginWithPassword} className="mt-6 grid gap-5 lg:mt-10">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="username">
                      {messages.shell.signedOut.usernameLabel}
                    </label>
                    <div className="relative">
                      <Mail
                        aria-hidden
                        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                      />
                      <input
                        autoComplete="username"
                        className="h-14 w-full rounded-md border border-border bg-surface/82 px-12 text-sm text-foreground placeholder:text-muted sm:text-base"
                        id="username"
                        name="username"
                        placeholder={messages.shell.signedOut.usernamePlaceholder}
                        required
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="password">
                      {messages.shell.signedOut.passwordLabel}
                    </label>
                    <div className="relative">
                      <LockKeyhole
                        aria-hidden
                        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                      />
                      <input
                        autoComplete="current-password"
                        className="h-14 w-full rounded-md border border-border bg-surface/82 px-12 pr-14 text-sm text-foreground placeholder:text-muted sm:text-base"
                        id="password"
                        name="password"
                        placeholder={messages.shell.signedOut.passwordPlaceholder}
                        required
                        type="password"
                      />
                      <Eye
                        aria-hidden
                        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                    <label className="flex min-h-10 items-center gap-2 text-muted">
                      <input
                        className="peer sr-only"
                        name="remember"
                        type="checkbox"
                        value="true"
                      />
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-primary/45 bg-surface text-primary peer-checked:bg-primary peer-checked:text-background">
                        <Check aria-hidden className="h-3.5 w-3.5" />
                      </span>
                      {messages.shell.signedOut.rememberMe}
                    </label>
                    <a
                      className="min-h-10 content-center text-primary transition-colors hover:text-primary-strong"
                      href="mailto:soporte@dinosauriosacademy.com?subject=Recuperar%20contrase%C3%B1a"
                    >
                      {messages.shell.signedOut.forgotPassword}
                    </a>
                  </div>

                  {signedOutMessage ? (
                    <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground">
                      {signedOutMessage}
                    </p>
                  ) : null}

                  <Button className="h-14 w-full gap-3 text-base" type="submit">
                    {messages.shell.signedOut.primaryAction}
                    <ArrowRight aria-hidden className="h-5 w-5" />
                  </Button>
                </form>

                <div className="mt-8 flex items-center gap-3 text-sm text-muted">
                  <div className="h-px flex-1 bg-border" />
                  <span>{messages.shell.signedOut.helpPrompt}</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <p className="mt-6 text-center">
                  <a
                    className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-strong"
                    href="mailto:soporte@dinosauriosacademy.com"
                  >
                    <Headphones aria-hidden className="h-4 w-4" />
                    {messages.shell.signedOut.supportAction}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const navigationItems = getNavigationForRoles(authState.user.roles);
  const navigationByKey = new Map(navigationItems.map((item) => [item.key, item]));
  const visibleNavGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.map((itemKey) => navigationByKey.get(itemKey)).filter((item) => item !== undefined),
    }))
    .filter((group) => group.items.length > 0);
  const activeKey = navigationItems[0]?.key;
  const roleLabel = authState.user.roles.map((role) => messages.shell.roles[role]).join(", ");
  const displayName = authState.user.name || authState.user.email;
  const profileInitials =
    displayName
      .split(/[\s@.]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "DA";
  const mobileDockKeys: NavigationKey[] = ["dashboard", "attendance", "students", "classes", "portal"];
  const mobileDockItems = mobileDockKeys.map((itemKey) => navigationByKey.get(itemKey)).filter((item) => item !== undefined);
  const mobileDockLabels: Partial<Record<NavigationKey, string>> = {
    dashboard: messages.shell.mobileDock.home,
    attendance: messages.shell.mobileDock.attendance,
    students: messages.shell.mobileDock.students,
    classes: messages.shell.mobileDock.groups,
    portal: messages.shell.mobileDock.more,
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
        href="#main-content"
      >
        {messages.shell.currentModule}
      </a>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[292px_1fr]">
        <aside className="hidden border-r border-border bg-shell lg:flex lg:min-h-screen lg:flex-col">
          <div className="px-5 py-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/45 bg-primary-soft text-primary">
                <ShieldCheck aria-hidden className="h-7 w-7" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase leading-none tracking-[0.08em]">
                  {messages.shell.brand.replace(" Academy", "")}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.34em] text-primary">Academy</p>
              </div>
            </div>
          </div>

          <nav className="grid flex-1 content-start gap-5 overflow-y-auto px-3 pb-4 text-sm" aria-label={messages.shell.menu}>
            {visibleNavGroups.map((group) => (
              <section className="grid gap-1" key={group.key}>
                <h2 className="px-3 text-xs font-semibold uppercase text-muted">{messages.shell.navGroups[group.key]}</h2>
                {group.items.map((item) => {
                  const Icon = navigationIcons[item.key];
                  const isActive = item.key === activeKey;

                  return (
                    <a
                      aria-current={isActive ? "page" : undefined}
                      className="group relative flex min-h-9 items-center gap-2 overflow-hidden rounded-md px-3 py-2 text-muted transition-colors hover:bg-surface-raised/70 hover:text-foreground data-[active=true]:bg-surface-raised data-[active=true]:text-foreground"
                      data-active={isActive}
                      href={item.href}
                      key={item.key}
                    >
                      <span
                        aria-hidden
                        className="absolute left-1 h-5 w-px rounded-full bg-primary opacity-0 transition-opacity group-data-[active=true]:opacity-100"
                      />
                      <Icon
                        aria-hidden
                        className="h-4 w-4 shrink-0 transition-colors group-hover:text-primary group-data-[active=true]:text-primary"
                      />
                      <span className="min-w-0 truncate">{messages.shell.navigation[item.key]}</span>
                    </a>
                  );
                })}
              </section>
            ))}
          </nav>

          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-raised text-xs font-semibold">
                DA
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{messages.shell.organizationName}</span>
                <span className="block truncate text-xs text-muted">{messages.shell.workspace}</span>
              </span>
            </div>
          </div>
        </aside>

        <section className="min-w-0 pb-20 lg:pb-0">
          <details className="border-b border-border bg-shell lg:hidden">
            <summary
              aria-label={messages.shell.mobileMenuButton}
              className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 text-sm font-semibold"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-foreground">
                <Menu aria-hidden className="h-5 w-5" />
              </span>
              <span className="min-w-0 truncate">{messages.shell.currentModule}</span>
            </summary>
            <div className="grid gap-4 px-4 pb-4">
              <div className="rounded-lg border border-border bg-surface px-3 py-3">
                <p className="text-xs font-medium text-muted">{messages.shell.scope.label}</p>
                <p className="mt-1 text-sm font-semibold">{messages.shell.scope.value}</p>
              </div>
              <nav className="grid gap-4 text-sm" aria-label={messages.shell.menu}>
                {visibleNavGroups.map((group) => (
                  <section className="grid gap-1" key={group.key}>
                    <h2 className="px-3 text-xs font-semibold text-muted">{messages.shell.navGroups[group.key]}</h2>
                    {group.items.map((item) => {
                      const Icon = navigationIcons[item.key];
                      const isActive = item.key === activeKey;

                      return (
                        <a
                          aria-current={isActive ? "page" : undefined}
                          className="group relative flex min-h-10 items-center gap-2 overflow-hidden rounded-md px-3 py-2 text-muted transition-colors hover:bg-surface-raised/70 hover:text-foreground data-[active=true]:bg-surface-raised data-[active=true]:text-foreground"
                          data-active={isActive}
                          href={item.href}
                          key={item.key}
                        >
                          <span
                            aria-hidden
                            className="absolute left-1 h-5 w-px rounded-full bg-primary opacity-0 transition-opacity group-data-[active=true]:opacity-100"
                          />
                          <Icon
                            aria-hidden
                            className="h-4 w-4 shrink-0 transition-colors group-hover:text-primary group-data-[active=true]:text-primary"
                          />
                          <span>{messages.shell.navigation[item.key]}</span>
                        </a>
                      );
                    })}
                  </section>
                ))}
              </nav>
            </div>
          </details>

          <header className="border-b border-border bg-shell px-4 py-3 sm:px-6">
            <div className="relative grid gap-3 lg:block lg:min-h-11">
              <div className="min-w-0 lg:absolute lg:left-0 lg:top-1/2 lg:w-56 lg:-translate-y-1/2">
                <div className="hidden h-10 w-full items-center rounded-md border border-border bg-surface px-3 text-sm text-foreground lg:flex">
                  <span className="flex min-w-0 items-center gap-2">
                    <Building2 aria-hidden className="h-4 w-4 text-muted" />
                    <span className="truncate font-medium">{messages.shell.scope.value}</span>
                  </span>
                </div>
                <div className="lg:hidden">
                  <p className="text-xs font-medium text-muted">{messages.shell.eyebrow}</p>
                  <h1 className="truncate text-base font-semibold">{messages.shell.currentModule}</h1>
                </div>
              </div>

              <label
                className="relative min-w-0 lg:mx-auto lg:block lg:w-full lg:max-w-[400px] 2xl:max-w-[520px]"
                aria-label={messages.shell.topbarHint}
              >
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                />
                <span className="sr-only">{messages.shell.search}</span>
                <input
                  className="h-11 w-full rounded-full border border-border bg-surface py-2 pl-11 pr-20 text-sm text-foreground placeholder:text-muted"
                  placeholder={messages.shell.search}
                  type="search"
                />
                <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-sm px-1.5 py-0.5 text-xs text-muted sm:block">
                  {messages.shell.searchShortcut}
                </kbd>
              </label>

              <div
                className="flex min-w-0 items-center justify-between gap-2 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:justify-end"
                aria-label={messages.shell.userMenu}
              >
                <button
                  aria-label={messages.shell.notifications}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
                  type="button"
                >
                  <Bell aria-hidden className="h-4 w-4" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                </button>
                <button
                  aria-label={messages.shell.inbox}
                  className="hidden h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-raised hover:text-foreground sm:inline-flex"
                  type="button"
                >
                  <Mail aria-hidden className="h-4 w-4" />
                </button>
                <details className="relative">
                  <summary
                    aria-label={messages.shell.profileMenu}
                    className="flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-surface-raised"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-raised text-xs font-semibold text-foreground">
                      {profileInitials}
                    </span>
                    <span className="hidden min-w-0 text-left sm:block">
                      <span className="block max-w-32 truncate text-sm font-medium">{displayName}</span>
                      <span className="block max-w-32 truncate text-xs text-muted">{roleLabel || authState.user.email}</span>
                    </span>
                    <ChevronDown aria-hidden className="h-4 w-4 text-muted" />
                  </summary>
                  <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-border bg-surface p-2 shadow-[0_16px_40px_rgb(0_0_0_/0.32)]">
                    <a
                      className="flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
                      href="/settings"
                    >
                      <Settings aria-hidden className="h-4 w-4" />
                      {messages.shell.profileSettings}
                    </a>
                    <form action={logoutCurrentUser}>
                      <button
                        className="flex min-h-10 w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
                        type="submit"
                      >
                        <LogOut aria-hidden className="h-4 w-4" />
                        {messages.shell.signOut}
                      </button>
                    </form>
                  </div>
                </details>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8" id="main-content">
            <section className="border-b border-border pb-6">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-semibold leading-tight">{messages.shell.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{messages.shell.description}</p>
              </div>
            </section>

            <section className="mt-6" aria-labelledby="quick-actions-title">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-base font-semibold" id="quick-actions-title">
                  {messages.shell.primaryAction}
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {messages.shell.quickActions.map((item, index) => {
                  const Icon = quickActionIcons[index] ?? ClipboardCheck;

                  return (
                    <a
                      className="group rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-primary/50 hover:bg-surface-raised"
                      href={item.href}
                      key={item.label}
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary-soft text-primary">
                          <Icon aria-hidden className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold">{item.label}</span>
                          <span className="mt-1 block text-xs text-muted">{item.description}</span>
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>

            <section className="mt-6">
              <div className="rounded-lg border border-border bg-surface">
                <div className="border-b border-border px-4 py-3">
                  <h2 className="text-base font-semibold">{messages.shell.priorityWork.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted">{messages.shell.priorityWork.description}</p>
                </div>
                <div className="divide-y divide-border">
                  {messages.shell.priorityWork.items.map((item) => (
                    <div className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_140px_180px] sm:items-center" key={item.label}>
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted">{item.context}</span>
                      <Badge className="border-border bg-surface-raised text-muted">{item.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {mobileDockItems.length > 0 ? (
            <nav
              className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-shell px-2 py-2 lg:hidden"
              aria-label={messages.shell.mobileNavigation}
            >
              {mobileDockItems.slice(0, 5).map((item) => {
                const Icon = navigationIcons[item.key] ?? MoreHorizontal;
                const isActive = item.key === activeKey;

                return (
                  <a
                    aria-current={isActive ? "page" : undefined}
                    className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md px-2 text-[0.75rem] font-medium text-muted data-[active=true]:bg-primary-soft data-[active=true]:text-primary"
                    data-active={isActive}
                    href={item.href}
                    key={item.key}
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                    <span className="max-w-full truncate">{mobileDockLabels[item.key] ?? messages.shell.navigation[item.key]}</span>
                  </a>
                );
              })}
            </nav>
          ) : null}
        </section>
      </div>
    </main>
  );
}
