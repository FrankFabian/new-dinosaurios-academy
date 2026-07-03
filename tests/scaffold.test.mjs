import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";

const root = process.cwd();

async function fileExists(relativePath) {
  await access(path.join(root, relativePath));
}

test("repository exposes the local development scaffold contract", async () => {
  await Promise.all([
    fileExists("pnpm-workspace.yaml"),
    fileExists("apps/backend"),
    fileExists("apps/backend/package.json"),
    fileExists("apps/web"),
    fileExists("apps/web/package.json"),
    fileExists("docker-compose.yml"),
    fileExists(".env.example")
  ]);

  const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

  for (const scriptName of ["install", "lint", "test", "typecheck", "dev"]) {
    assert.equal(
      typeof packageJson.scripts?.[scriptName],
      "string",
      `expected root package.json to expose "${scriptName}"`
    );
  }

  assert.match(packageJson.scripts.test, /test:scaffold/);
  assert.match(packageJson.scripts.test, /pnpm -r test/);
  assert.match(packageJson.scripts.typecheck, /pnpm -r typecheck/);
  assert.match(packageJson.scripts.dev, /pnpm --parallel -r dev/);
});
