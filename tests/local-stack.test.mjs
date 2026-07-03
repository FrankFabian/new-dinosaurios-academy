import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

test("local infrastructure is configured through documented environment variables", async () => {
  const [compose, envExample] = await Promise.all([
    readFile("docker-compose.yml", "utf8"),
    readFile(".env.example", "utf8")
  ]);

  for (const service of ["postgres:", "redis:"]) {
    assert.match(compose, new RegExp(service));
  }

  for (const variable of [
    "POSTGRES_DB",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "DATABASE_URL",
    "CELERY_BROKER_URL",
    "CELERY_RESULT_BACKEND"
  ]) {
    assert.match(envExample, new RegExp(`^${variable}=`, "m"));
  }

  assert.match(compose, /POSTGRES_DB:\s*\$\{POSTGRES_DB:-dinosaurios\}/);
  assert.match(compose, /POSTGRES_USER:\s*\$\{POSTGRES_USER:-dinosaurios\}/);
  assert.match(compose, /POSTGRES_PASSWORD:\s*\$\{POSTGRES_PASSWORD:-dinosaurios\}/);
  assert.match(compose, /healthcheck:/);
  assert.match(compose, /redis-cli/);
  assert.match(compose, /pg_isready/);
});
