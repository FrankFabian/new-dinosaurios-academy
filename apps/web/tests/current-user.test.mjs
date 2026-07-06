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

async function loadCurrentUser({ fetchImpl, cookieHeader }) {
  const source = await readFile("src/lib/auth/current-user.ts", "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const exports = {};
  const context = vm.createContext({
    Response,
    fetch: fetchImpl,
    process: {
      env: {
        BACKEND_URL: "http://backend.test",
      },
    },
    require(moduleName) {
      if (moduleName === "next/headers") {
        return {
          cookies: async () => ({
            toString() {
              return cookieHeader;
            },
          }),
        };
      }

      return require(moduleName);
    },
    exports,
  });

  context.module = { exports };
  new vm.Script(outputText).runInContext(context);

  return context.module.exports;
}

test("current user reports unauthenticated when Django rejects the session", async () => {
  const requests = [];
  const { getCurrentUser } = await loadCurrentUser({
    cookieHeader: "",
    fetchImpl: async (url, options = {}) => {
      requests.push({ url, options });

      return new Response(JSON.stringify({ detail: "Authentication credentials were not provided." }), {
        status: 401,
      });
    },
  });

  assert.deepEqual(plain(await getCurrentUser()), { status: "unauthenticated" });
  assert.deepEqual(plain(requests), [
    {
      url: "http://backend.test/api/auth/me/",
      options: {
        cache: "no-store",
        headers: {},
      },
    },
  ]);
});

test("current user forwards Django session cookies and returns authenticated roles", async () => {
  const requests = [];
  const { getCurrentUser } = await loadCurrentUser({
    cookieHeader: "csrftoken=csrf-token; sessionid=django-session-key",
    fetchImpl: async (url, options = {}) => {
      requests.push({ url, options });

      return new Response(
        JSON.stringify({
          user: {
            id: 42,
            email: "admin@example.com",
            name: "Admin Academy",
            roles: ["admin", "unsupported-role", "coach"],
          },
        }),
        { status: 200 },
      );
    },
  });

  assert.deepEqual(plain(await getCurrentUser()), {
    status: "authenticated",
    user: {
      id: 42,
      email: "admin@example.com",
      name: "Admin Academy",
      roles: ["admin", "coach"],
    },
  });
  assert.equal(requests[0].options.headers.Cookie, "csrftoken=csrf-token; sessionid=django-session-key");
});
