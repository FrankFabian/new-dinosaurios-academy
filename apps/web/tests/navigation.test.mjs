import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

async function loadNavigation() {
  const source = await readFile("src/lib/auth/navigation.ts", "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const exports = {};
  const context = vm.createContext({
    require,
    exports,
  });

  context.module = { exports };
  new vm.Script(outputText).runInContext(context);

  return context.module.exports;
}

test("role-aware navigation separates operations staff from family portal users", async () => {
  const { getNavigationForRoles } = await loadNavigation();

  const adminNavigation = getNavigationForRoles(["admin"]).map((item) => item.key);
  const coachNavigation = getNavigationForRoles(["coach"]).map((item) => item.key);
  const guardianNavigation = getNavigationForRoles(["guardian"]).map((item) => item.key);

  assert.ok(adminNavigation.includes("settings"));
  assert.ok(adminNavigation.includes("billing"));
  assert.ok(coachNavigation.includes("attendance"));
  assert.equal(coachNavigation.includes("billing"), false);
  assert.deepEqual(plain(guardianNavigation), ["events", "portal"]);
});
