import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");

async function loadAuthActions({ fetchImpl, cookieStore }) {
  const source = await readFile("src/lib/auth/actions.ts", "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const exports = {};
  const context = vm.createContext({
    FormData,
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
          cookies: async () => cookieStore,
        };
      }

      if (moduleName === "next/navigation") {
        return {
          redirect(location) {
            const error = new Error(`redirect:${location}`);
            error.location = location;
            throw error;
          },
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

test("login persists the Django session cookie without a leading separator", async () => {
  const storedCookies = new Map();
  const cookieStore = {
    set(name, value, options) {
      storedCookies.set(name, { value, options });
    },
  };
  const requests = [];
  const fetchImpl = async (url, options = {}) => {
    requests.push({ url, options });

    if (url === "http://backend.test/api/auth/csrf/") {
      return new Response(JSON.stringify({ csrfToken: "csrf-from-json" }), {
        status: 200,
        headers: {
          "set-cookie": "csrftoken=csrf-from-cookie; Path=/; SameSite=Lax",
        },
      });
    }

    if (url === "http://backend.test/api/auth/login/") {
      return new Response(JSON.stringify({ user: { email: "admin@example.com" } }), {
        status: 200,
        headers: {
          "set-cookie":
            "csrftoken=csrf-after-login; Path=/; SameSite=Lax, sessionid=django-session-key; HttpOnly; Path=/; SameSite=Lax",
        },
      });
    }

    throw new Error(`Unexpected request: ${url}`);
  };
  const { loginWithPassword } = await loadAuthActions({ fetchImpl, cookieStore });
  const formData = new FormData();
  formData.set("username", "admin@example.com");
  formData.set("password", "correct-password");

  await assert.rejects(() => loginWithPassword(formData), { location: "/" });

  assert.equal(requests.length, 2);
  assert.equal(storedCookies.get("sessionid")?.value, "django-session-key");
  assert.equal(storedCookies.get("sessionid")?.options.httpOnly, true);
});

test("logout clears local Django auth cookies after notifying the backend", async () => {
  const deletedCookies = [];
  const requests = [];
  const cookieStore = {
    toString() {
      return "csrftoken=csrf-token; sessionid=django-session-key";
    },
    get(name) {
      return name === "csrftoken" ? { value: "csrf-token" } : undefined;
    },
    delete(name) {
      deletedCookies.push(name);
    },
  };
  const fetchImpl = async (url, options = {}) => {
    requests.push({ url, options });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };
  const { logoutCurrentUser } = await loadAuthActions({ fetchImpl, cookieStore });

  await assert.rejects(() => logoutCurrentUser(), { location: "/" });

  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, "http://backend.test/api/auth/logout/");
  assert.equal(requests[0].options.headers.Cookie, "csrftoken=csrf-token; sessionid=django-session-key");
  assert.equal(requests[0].options.headers["X-CSRFToken"], "csrf-token");
  assert.deepEqual(deletedCookies, ["sessionid", "csrftoken"]);
});
