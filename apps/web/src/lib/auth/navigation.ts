export type Role = "admin" | "staff" | "coach" | "guardian" | "student";

export type NavigationKey =
  | "dashboard"
  | "students"
  | "guardians"
  | "venues"
  | "classes"
  | "enrollments"
  | "billing"
  | "attendance"
  | "events"
  | "reports"
  | "settings"
  | "portal";

export type NavigationItem = {
  key: NavigationKey;
  href: string;
  roles: Role[];
};

export const roleNavigation: NavigationItem[] = [
  { key: "dashboard", href: "/", roles: ["admin", "staff", "coach"] },
  { key: "students", href: "/students", roles: ["admin", "staff", "coach"] },
  { key: "guardians", href: "/guardians", roles: ["admin", "staff"] },
  { key: "venues", href: "/structure", roles: ["admin", "staff"] },
  { key: "classes", href: "/classes", roles: ["admin", "staff", "coach"] },
  { key: "enrollments", href: "/enrollments", roles: ["admin", "staff"] },
  { key: "billing", href: "/billing", roles: ["admin", "staff"] },
  { key: "attendance", href: "/attendance", roles: ["admin", "staff", "coach"] },
  { key: "events", href: "/events", roles: ["admin", "staff", "coach", "guardian", "student"] },
  { key: "reports", href: "/reports", roles: ["admin", "staff"] },
  { key: "settings", href: "/settings", roles: ["admin"] },
  { key: "portal", href: "/portal", roles: ["guardian", "student"] },
];

export function getNavigationForRoles(roles: readonly Role[]) {
  const roleSet = new Set<Role>(roles);

  return roleNavigation.filter((item) => item.roles.some((role) => roleSet.has(role)));
}
