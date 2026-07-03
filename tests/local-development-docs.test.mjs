import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

test("local development guide documents the public setup commands", async () => {
  const docs = await readFile("docs/local-development.md", "utf8");

  for (const requiredText of [
    "pnpm.cmd install",
    "python -m venv .venv",
    ".venv\\Scripts\\python.exe -m pip install -r apps/backend/requirements-dev.txt",
    "docker compose up -d postgres redis",
    "pnpm.cmd --filter backend dev",
    "pnpm.cmd --filter backend celery",
    "pnpm.cmd --filter web dev",
    "pnpm.cmd test",
    "pnpm.cmd typecheck",
    "pnpm.cmd lint"
  ]) {
    assert.match(docs, new RegExp(requiredText.replaceAll("\\", "\\\\")));
  }
});
