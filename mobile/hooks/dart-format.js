#!/usr/bin/env node
// PostToolUse(Write|Edit): форматирует отредактированный .dart файл.
// Грациозно: нет dart / не .dart / не Flutter-проект → тихий выход. Всегда exit 0.
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
  if (/\.(g|freezed|mocks)\.dart$/.test(file)) process.exit(0); // генерируемые не трогаем
  try {
    execSync("dart --version", { stdio: "ignore" });
  } catch {
    process.exit(0); // dart не установлен — молчим
  }
  execFileSync("dart", ["format", file], { stdio: "ignore" });
} catch {
  // любая ошибка — не мешаем работе
}
process.exit(0);
