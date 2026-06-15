#!/usr/bin/env node
// PostToolUse(Write|Edit): formats the edited .dart file.
// Gracefully: no dart / not .dart / not a Flutter project → quiet exit. Always exit 0.
"use strict";
const { execFileSync, execSync } = require("child_process");

function readStdin() {
  try {
    return require("fs").readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

try {
  const data = JSON.parse(readStdin() || "{}");
  const file =
    (data.tool_input && (data.tool_input.file_path || data.tool_input.path)) ||
    "";
  if (!file || !file.endsWith(".dart")) process.exit(0);
  if (/\.(g|freezed|mocks)\.dart$/.test(file)) process.exit(0); // leave generated files alone
  try {
    execSync("dart --version", { stdio: "ignore" });
  } catch {
    process.exit(0); // dart not installed — stay silent
  }
  execFileSync("dart", ["format", file], { stdio: "ignore" });
} catch {
  // any error — don't get in the way
}
process.exit(0);
