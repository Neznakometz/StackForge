#!/usr/bin/env node
// Stop: runs `dart analyze` (includes riverpod_lint) and reports problems.
// Gracefully: no dart / not a Flutter project → quiet exit. Always exit 0.
"use strict";
const { execSync } = require("child_process");
const fs = require("fs");

try {
  if (!fs.existsSync("pubspec.yaml")) process.exit(0); // not a Flutter/Dart project
  try {
    execSync("dart --version", { stdio: "ignore" });
  } catch {
    process.exit(0);
  }
  let out = "";
  try {
    out = execSync("dart analyze --no-fatal-warnings", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (e) {
    out = (e.stdout || "") + (e.stderr || "");
  }
  const issues = out
    .split("\n")
    .filter((l) => /\b(error|warning|info)\b\s+•/.test(l))
    .slice(0, 15);
  if (issues.length) {
    process.stdout.write(
      "[dart analyze — check before finishing]\n" + issues.join("\n") + "\n"
    );
  }
} catch {
  // don't get in the way
}
process.exit(0);
