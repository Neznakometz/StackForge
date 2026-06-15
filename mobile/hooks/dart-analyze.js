#!/usr/bin/env node
// Stop: прогоняет `dart analyze` (включает riverpod_lint) и сообщает проблемы.
// Грациозно: нет dart / не Flutter-проект → тихий выход. Всегда exit 0.
"use strict";
const { execSync } = require("child_process");
const fs = require("fs");

try {
  if (!fs.existsSync("pubspec.yaml")) process.exit(0); // не Flutter/Dart проект
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
      "[dart analyze — проверь перед завершением]\n" + issues.join("\n") + "\n"
    );
  }
} catch {
  // не мешаем
}
process.exit(0);
