import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

test("authenticated app shell uses localized role-aware navigation", async () => {
  const [page, messages, navigation, currentUser, actions, layout] = await Promise.all([
    readFile("src/app/page.tsx", "utf8"),
    readFile("src/lib/i18n/messages.ts", "utf8"),
    readFile("src/lib/auth/navigation.ts", "utf8"),
    readFile("src/lib/auth/current-user.ts", "utf8"),
    readFile("src/lib/auth/actions.ts", "utf8"),
    readFile("src/app/layout.tsx", "utf8")
  ]);

  assert.match(messages, /export const defaultLocale = "es"/);
  assert.match(messages, /en:/);
  assert.match(messages, /signOut:/);
  assert.match(messages, /quickActions:/);
  assert.match(messages, /priorityWork:/);
  assert.match(layout, /getConfiguredLocale/);
  assert.doesNotMatch(page, /const currentUser =/);
  assert.match(page, /await getCurrentUser\(\)/);
  assert.match(page, /getNavigationForRoles\(authState\.user\.roles\)/);
  assert.match(page, /action=\{loginWithPassword\}/);
  assert.match(page, /action=\{logoutCurrentUser\}/);
  assert.match(page, /messages\.shell/);
  assert.match(page, /<aside/);
  assert.match(page, /<header/);
  assert.match(page, /<details/);
  assert.match(page, /messages\.shell\.mobileMenuButton/);
  assert.match(page, /messages\.shell\.mobileNavigation/);
  assert.match(page, /messages\.shell\.profileMenu/);
  assert.match(page, /messages\.shell\.searchShortcut/);
  assert.match(page, /messages\.shell\.notifications/);
  assert.match(currentUser, /cookies\(\)/);
  assert.match(currentUser, /\/api\/auth\/me\//);
  assert.match(currentUser, /Cookie/);
  assert.match(currentUser, /status: "unauthenticated"/);
  assert.match(currentUser, /status: "unavailable"/);
  assert.match(actions, /export async function loginWithPassword/);
  assert.match(actions, /export async function logoutCurrentUser/);
  assert.match(actions, /\/api\/auth\/csrf\//);
  assert.match(actions, /\/api\/auth\/login\//);
  assert.match(actions, /\/api\/auth\/logout\//);
  assert.match(actions, /cookies\(\)/);
  assert.match(actions, /catch/);
  assert.match(actions, /redirect\("\/"\)/);
  assert.match(navigation, /roles:\s*\["admin", "staff"\]/);
  assert.match(navigation, /roles:.*"coach"/);
  assert.match(navigation, /roles:\s*\["guardian", "student"\]/);
});
