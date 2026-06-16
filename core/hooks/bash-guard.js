#!/usr/bin/env node
// PreToolUse(Bash): block destructive / network / arbitrary-code commands.
// Complements the safe-permissions deny-list with exceptions a deny-rule
// cannot express (e.g. allow `rm -rf dist`, block `rm -rf /`) and catches
// runner-based bypasses (npx, dlx) that deny-rules miss.
//
// Reads the tool call from stdin (JSON). Exit codes:
//   0 — allow (normal permission rules / acceptEdits decide)
//   2 — block (stops the call BEFORE permission rules are evaluated)
// stderr on exit 2 is surfaced to the model as the block reason.
//
// Fail-open by design: unparseable input exits 0 so the agent never wedges.
"use strict";

// npx/runner packages StackForge's own workflows rely on (cross-agent skills,
// shadcn). Everything else via npx/dlx/bunx is blocked as arbitrary network code.
const NPX_ALLOW =
  /\bnpx\s+(-y\s+|--yes\s+|--no-install\s+)*(@vercel\/skills|skills|shadcn-vue|shadcn)(@[\w.\-]+)?\b/i;

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let cmd = "";
  try {
    const payload = JSON.parse(raw || "{}");
    cmd = (payload && payload.tool_input && payload.tool_input.command) || "";
  } catch {
    process.exit(0); // fail open
  }
  if (!cmd) process.exit(0);

  const block = (reason) => {
    process.stderr.write("BLOCKED by bash-guard: " + reason + "\n");
    process.exit(2);
  };

  // --- destructive / irreversible ---
  // rm targeting filesystem root or home (the deny-list circuit-breaker case,
  // but enforced here so `rm -rf dist` and friends still pass freely)
  if (/\brm\b[^\n]*\s(-[a-z]*\s+)*(\/|~|\$HOME)(\s|\/|$|")/i.test(cmd)) {
    block("rm targeting / or home directory");
  }
  if (/\bgit\s+push\b[^\n]*(--force\b|--force-with-lease\b|\s-f\b)/i.test(cmd)) {
    block("git push --force / -f");
  }
  if (/\bgit\s+reset\s+--hard\b/i.test(cmd)) block("git reset --hard");
  if (/\bgit\s+clean\b/i.test(cmd)) block("git clean (deletes untracked files)");

  // --- privilege escalation ---
  if (/\bsudo\b/i.test(cmd)) block("sudo");
  if (/\bchown\b/i.test(cmd)) block("chown");

  // --- network / arbitrary-code execution (deny-list blind spot) ---
  // remote script piped straight into a shell — the most dangerous pattern
  if (/\b(curl|wget)\b[^\n]*\|\s*(sh|bash|zsh)\b/i.test(cmd)) {
    block("piping a remote script into a shell");
  }
  if (/\b(curl|wget)\b/i.test(cmd)) {
    block("network fetch (curl/wget) — use the WebFetch tool instead");
  }
  // npx / dlx / bunx run code that isn't in the repo — bypasses every guard.
  // Allow StackForge's own tooling (npx skills / shadcn) and --no-install.
  if (
    /\bnpx\b/i.test(cmd) &&
    !/\bnpx\b[^\n]*--no-install\b/i.test(cmd) &&
    !NPX_ALLOW.test(cmd)
  ) {
    block("npx runs arbitrary network packages — add the dep, or use `npx skills`/`npx shadcn`");
  }
  if (/\b(pnpm|yarn)\s+dlx\b/i.test(cmd)) {
    block("pnpm/yarn dlx runs arbitrary network packages");
  }
  if (/\bbunx\b/i.test(cmd)) block("bunx runs arbitrary network packages");

  process.exit(0);
});
