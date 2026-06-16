#!/usr/bin/env node
// SessionEnd: append a private, local value summary for the session to
// .stackforge/metrics.log (tokens + tool calls). No network, no content stored —
// only counts. Lets you see what StackForge's token discipline is saving.
// Fail-open: any error → exit 0. Opt out: remove the SessionEnd block in hooks.json.
"use strict";
const fs = require("fs");
const path = require("path");
const os = require("os");

function readStdin() {
  try {
    return JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  } catch {
    return {};
  }
}

function latestTranscript() {
  // Prefer the path the hook gives us; else newest .jsonl under ~/.claude/projects.
  const dir = path.join(os.homedir(), ".claude", "projects");
  let newest = null,
    mtime = 0;
  const walk = (d) => {
    let ents;
    try {
      ents = fs.readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of ents) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".jsonl")) {
        const m = fs.statSync(p).mtimeMs;
        if (m > mtime) ((mtime = m), (newest = p));
      }
    }
  };
  walk(dir);
  return newest;
}

try {
  const data = readStdin();
  const file = data.transcript_path || latestTranscript();
  if (!file || !fs.existsSync(file)) process.exit(0);

  let inTok = 0,
    outTok = 0,
    cacheRead = 0,
    tools = 0,
    turns = 0;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    if (!line.trim()) continue;
    let o;
    try {
      o = JSON.parse(line);
    } catch {
      continue;
    }
    const u = o && o.message && o.message.usage;
    if (u) {
      inTok += u.input_tokens || 0;
      outTok += u.output_tokens || 0;
      cacheRead += u.cache_read_input_tokens || 0;
      turns++;
    }
    const content = o && o.message && o.message.content;
    if (Array.isArray(content))
      for (const c of content) if (c && c.type === "tool_use") tools++;
  }

  const out = path.join(process.cwd(), ".stackforge");
  fs.mkdirSync(out, { recursive: true });
  // never commit the local log
  const gi = path.join(out, ".gitignore");
  if (!fs.existsSync(gi)) fs.writeFileSync(gi, "*\n");

  const stamp = new Date().toISOString();
  fs.appendFileSync(
    path.join(out, "metrics.log"),
    `${stamp}\tturns=${turns}\ttool_calls=${tools}\tin=${inTok}\tout=${outTok}\tcache_read=${cacheRead}\n`
  );
} catch {
  // fail open
}
process.exit(0);
