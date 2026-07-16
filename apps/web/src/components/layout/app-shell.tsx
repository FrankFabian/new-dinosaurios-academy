import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
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
import type { ReactNode } from "react";

import { logoutCurrentUser } from "@/lib/auth/actions";
import type { CurrentUser } from "@/lib/auth/current-user";
import type { NavigationKey } from "@/lib/auth/navigation";
import { getNavigationForRoles } from "@/lib/auth/navigation";
import type { getMessages } from "@/lib/i18n/messages";

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

type AppShellProps = {
  activeKey: NavigationKey;
  children: ReactNode;
  messages: ReturnType<typeof getMessages>["shell"];
  user: CurrentUser;
};

export function AppShell({ activeKey, children, messages, user }: AppShellProps) {
  const navigationItems = getNavigationForRoles(user.roles);
  const navigationByKey = new Map(navigationItems.map((item) => [item.key, item]));
  const visibleNavGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.map((itemKey) => navigationByKey.get(itemKey)).filter((item) => item !== undefined),
    }))
    .filter((group) => group.items.length > 0);
  const roleLabel = user.roles.map((role) => messages.roles[role]).join(", ");
  const displayName = user.name || user.email;
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
    dashboard: messages.mobileDock.home,
    attendance: messages.mobileDock.attendance,
    students: messages.mobileDock.students,
    classes: messages.mobileDock.groups,
    portal: messages.mobileDock.more,
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
        href="#main-content"
      >
        {messages.currentModule}
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
                  {messages.brand.replace(" Academy", "")}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.34em] text-primary">Academy</p>
              </div>
            </div>
          </div>

          <nav className="grid flex-1 content-start gap-5 overflow-y-auto px-3 pb-4 text-sm" aria-label={messages.menu}>
            {visibleNavGroups.map((group) => (
              <section className="grid gap-1" key={group.key}>
                <h2 className="px-3 text-xs font-semibold uppercase text-muted">{messages.navGroups[group.key]}</h2>
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
                      <span className="min-w-0 truncate">{messages.navigation[item.key]}</span>
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
                <span className="block truncate font-medium">{messages.organizationName}</span>
                <span className="block truncate text-xs text-muted">{messages.workspace}</span>
              </span>
            </div>
          </div>
        </aside>

        <section className="min-w-0 pb-20 lg:pb-0">
          <details className="border-b border-border bg-shell lg:hidden">
            <summary
              aria-label={messages.mobileMenuButton}
              className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 text-sm font-semibold"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-foreground">
                <Menu aria-hidden className="h-5 w-5" />
              </span>
              <span className="min-w-0 truncate">{messages.currentModule}</span>
            </summary>
            <div className="grid gap-4 px-4 pb-4">
              <div className="rounded-lg border border-border bg-surface px-3 py-3">
                <p className="text-xs font-medium text-muted">{messages.scope.label}</p>
                <p className="mt-1 text-sm font-semibold">{messages.scope.value}</p>
              </div>
              <nav className="grid gap-4 text-sm" aria-label={messages.menu}>
                {visibleNavGroups.map((group) => (
                  <section className="grid gap-1" key={group.key}>
                    <h2 className="px-3 text-xs font-semibold text-muted">{messages.navGroups[group.key]}</h2>
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
                          <span>{messages.navigation[item.key]}</span>
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
                    <span className="truncate font-medium">{messages.scope.value}</span>
                  </span>
                </div>
                <div className="lg:hidden">
                  <p className="text-xs font-medium text-muted">{messages.eyebrow}</p>
                  <h1 className="truncate text-base font-semibold">{messages.currentModule}</h1>
                </div>
              </div>

              <label
                className="relative min-w-0 lg:mx-auto lg:block lg:w-full lg:max-w-[400px] 2xl:max-w-[520px]"
                aria-label={messages.topbarHint}
              >
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                />
                <span className="sr-only">{messages.search}</span>
                <input
                  className="h-11 w-full rounded-full border border-border bg-surface py-2 pl-11 pr-20 text-sm text-foreground placeholder:text-muted"
                  placeholder={messages.search}
                  type="search"
                />
                <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-sm px-1.5 py-0.5 text-xs text-muted sm:block">
                  {messages.searchShortcut}
                </kbd>
              </label>

              <div
                className="flex min-w-0 items-center justify-between gap-2 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:justify-end"
                aria-label={messages.userMenu}
              >
                <button
                  aria-label={messages.notifications}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
                  type="button"
                >
                  <Bell aria-hidden className="h-4 w-4" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                </button>
                <button
                  aria-label={messages.inbox}
                  className="hidden h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-raised hover:text-foreground sm:inline-flex"
                  type="button"
                >
                  <Mail aria-hidden className="h-4 w-4" />
                </button>
                <details className="relative">
                  <summary
                    aria-label={messages.profileMenu}
                    className="flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-surface-raised"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-raised text-xs font-semibold text-foreground">
                      {profileInitials}
                    </span>
                    <span className="hidden min-w-0 text-left sm:block">
                      <span className="block max-w-32 truncate text-sm font-medium">{displayName}</span>
                      <span className="block max-w-32 truncate text-xs text-muted">{roleLabel || user.email}</span>
                    </span>
                    <ChevronDown aria-hidden className="h-4 w-4 text-muted" />
                  </summary>
                  <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-border bg-surface p-2 shadow-[0_16px_40px_rgb(0_0_0_/0.32)]">
                    <a
                      className="flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
                      href="/settings"
                    >
                      <Settings aria-hidden className="h-4 w-4" />
                      {messages.profileSettings}
                    </a>
                    <form action={logoutCurrentUser}>
                      <button
                        className="flex min-h-10 w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
                        type="submit"
                      >
                        <LogOut aria-hidden className="h-4 w-4" />
                        {messages.signOut}
                      </button>
                    </form>
                  </div>
                </details>
              </div>
            </div>
          </header>

          <div id="main-content">{children}</div>

          {mobileDockItems.length > 0 ? (
            <nav
              className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-shell px-2 py-2 lg:hidden"
              aria-label={messages.mobileNavigation}
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
                    <span className="max-w-full truncate">{mobileDockLabels[item.key] ?? messages.navigation[item.key]}</span>
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
