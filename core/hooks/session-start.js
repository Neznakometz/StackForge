#!/usr/bin/env node
// SessionStart: a quick orientation — PROGRESS.md + the latest checkpoint.
// No network, no side effects. Fails softly (always exit 0).
"use strict";
const fs = require("fs");
const path = require("path");

function head(file, maxLines) {
  try {
    const txt = fs.readFileSync(file, "utf8");
    return txt.split("\n").slice(0, maxLines).join("\n").trim();
  } catch {
    return null;
  }
}

function latestCheckpoint() {
  try {
    const dir = path.join("Sessions", "checkpoints");
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith("-checkpoint.md"))
      .sort();
    if (!files.length) return null;
    return head(path.join(dir, files[files.length - 1]), 40);
  } catch {
    return null;
  }
}

const out = [];
const progress = head("PROGRESS.md", 50);
if (progress) out.push("## PROGRESS.md\n" + progress);
const cp = latestCheckpoint();
if (cp) out.push("## Latest checkpoint\n" + cp);

if (out.length) {
  process.stdout.write(
    "[Project context — read before working]\n\n" + out.join("\n\n") + "\n"
  );
}
process.exit(0);
