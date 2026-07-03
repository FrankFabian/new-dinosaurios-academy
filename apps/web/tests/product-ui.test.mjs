import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

test("home screen follows the product UI baseline", async () => {
  const [page, messages, css] = await Promise.all([
    readFile("src/app/page.tsx", "utf8"),
    readFile("src/lib/i18n/messages.ts", "utf8"),
    readFile("src/app/globals.css", "utf8"),
  ]);

  assert.match(page, /messages\.shell\.defaults/);
  assert.match(messages, /Español/);
  assert.match(messages, /America\/Lima/);
  assert.match(messages, /S\//);
  assert.match(css, /color-scheme:\s*dark/);
  assert.doesNotMatch(css, /gradient/i);
  assert.doesNotMatch(css, /backdrop-filter/i);
});
