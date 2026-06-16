#!/usr/bin/env node
// Flag knowledge packs whose rules may be stale. No deps.
// Run: node scripts/check-freshness.mjs [--days 90]
// Prints stale packs; always exits 0 (informational). With --gha, also writes
// a markdown list to $GITHUB_OUTPUT (key: stale) for the freshness workflow.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const di = argv.indexOf("--days");
const days = di >= 0 && argv[di + 1] != null ? Number(argv[di + 1]) : 90;
const gha = argv.includes("--gha");

const reg = JSON.parse(
  fs.readFileSync(path.join(ROOT, "core/knowledge/registry.json"), "utf8")
);
const now = Date.now();
const DAY = 86400000;

const stale = [];
for (const p of reg.packs) {
  if (p.status !== "ready") continue;
  if (!p.last_verified) {
    stale.push(`${p.id} — ready but no last_verified`);
    continue;
  }
  const age = Math.floor((now - Date.parse(p.last_verified)) / DAY);
  if (age > days) stale.push(`${p.id} — ${age} days since ${p.last_verified} (targets: ${p.targets})`);
}

if (stale.length === 0) {
  console.log(`✓ all ready packs verified within ${days} days`);
} else {
  console.log(`Stale packs (>${days} days), run /update-knowledge:`);
  for (const s of stale) console.log("  - " + s);
}

if (gha && process.env.GITHUB_OUTPUT) {
  const body = stale.length
    ? stale.map((s) => "- " + s).join("\n")
    : "";
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `stale<<EOF\n${body}\nEOF\n`
  );
}
process.exit(0);
