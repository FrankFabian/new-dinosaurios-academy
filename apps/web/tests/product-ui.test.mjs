import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

test("home screen follows the product UI baseline", async () => {
  const [page, messages, css, design] = await Promise.all([
    readFile("src/app/page.tsx", "utf8"),
    readFile("src/lib/i18n/messages.ts", "utf8"),
    readFile("src/app/globals.css", "utf8"),
    readFile("../../DESIGN.md", "utf8"),
  ]);
  const loginAsset = await stat("public/images/login-athlete.png");

  assert.match(page, /\/images\/login-athlete\.png/);
  assert.match(page, /messages\.shell\.navGroups/);
  assert.match(page, /messages\.shell\.scope/);
  assert.match(page, /messages\.shell\.searchShortcut/);
  assert.match(page, /messages\.shell\.profileMenu/);
  assert.match(page, /messages\.shell\.quickActions/);
  assert.match(page, /messages\.shell\.priorityWork/);
  assert.doesNotMatch(page, /messages\.shell\.(authenticatedAs|status|signedInAs|readiness)/);
  assert.doesNotMatch(page, /messages\.shell\.scope\.helper/);
  assert.doesNotMatch(page, /const summaryItems =/);
  assert.match(messages, /Bienvenido de vuelta/);
  assert.match(messages, /Recordarme/);
  assert.match(messages, /Espa/);
  assert.match(messages, /Sede Surco/);
  assert.match(messages, /Revisar recibos/);
  assert.match(messages, /Abrir men/);
  assert.doesNotMatch(
    messages,
    /Sesión activa|Acceso autenticado|Perfil de sede activo|Contexto del sistema|módulos aún no implementados|Active session|Authenticated access|Active venue profile|System context|not implemented yet/
  );
  assert.ok(loginAsset.size > 0);
  assert.match(css, /color-scheme:\s*dark/);
  assert.doesNotMatch(css, /gradient/i);
  assert.doesNotMatch(css, /backdrop-filter/i);
  assert.match(design, /Do not repeat persistent context/);
});
