# Graphify on StackForge — Claude Code

Read [README.md](README.md) first (the shared model + common rules). This file is the
Claude-Code-specific setup. Graphify: https://github.com/safishamsi/graphify

## Install (bash-guard-safe)

**Use `pip`, not the curl manual install.** StackForge's `bash-guard` hook blocks `curl`, so the
README's curl-to-`~/.claude/skills` method would be **blocked** inside a guarded project.

```bash
pip install graphifyy        # PyPI name is 'graphifyy'; CLI/skill stay 'graphify'
graphify install             # registers /graphify + a line in ~/.claude/CLAUDE.md
```

Requires Python 3.10+. The installer writes the skill to `~/.claude/skills/graphify/` (global),
so it lives **outside** the project's `AGENTS.md`/`CLAUDE.md` — no collision, and `/init`
regenerating the project rules will never clobber it.

## Wire it in

- **Keep the `/graphify` trigger global** (`~/.claude/CLAUDE.md`, where the installer puts it).
  Do **not** add the trigger to the project `AGENTS.md`.
- Add **one usage line** to the project `AGENTS.md`:
  ```md
  - Long-context: if `graphify-out/` exists, query the graph (`/graphify query "…"`,
    `/graphify explain "X"`) or read `graphify-out/wiki/index.md` BEFORE grep-reading files.
    Treat INFERRED/AMBIGUOUS edges as leads to verify.
  ```
- `.gitignore`: `graphify-out/`, `.stackforge/`.

## Build & use

```
/graphify .                  # build (uses the Claude Code session for extraction)
/graphify . --update         # refresh only changed files
/graphify . --watch          # auto-sync code (AST, instant); notifies for docs/images
```

**Hooks don't collide:** `graphify hook install` adds a **git post-commit** hook; StackForge's are
**Claude Code** hooks. But the `implementer` commits per task, so a per-commit LLM re-pass slows
the loop — prefer `--watch` or a `--update` at `/phase-check` time over the git hook (unless the
corpus is code-only).

## Verify

`bash scripts/validate.sh` + `node tests/hooks.test.mjs` still pass; `graphify-out/` ignored; a
`/graphify query "…"` returns tagged nodes/edges.

## Paste into Claude Code

```
Set up Graphify on this StackForge project per docs/graphify/claude-code.md:
1) pip install graphifyy && graphify install  (NOT the curl method — bash-guard blocks curl). Python 3.10+.
2) Keep the /graphify trigger in ~/.claude/; do not add it to AGENTS.md.
3) Add `graphify-out/` and `.stackforge/` to .gitignore.
4) Append ONE usage line to AGENTS.md: query the graph / read graphify-out/wiki/index.md before
   reading files; INFERRED/AMBIGUOUS = leads to verify.
5) Build once with `/graphify .`, report GRAPH_REPORT.md god-nodes + the token benchmark. Do NOT
   enable the per-commit git hook; suggest --watch or --update at phase boundaries.
6) Verify validate.sh + hook tests pass and graphify-out is ignored. Don't touch StackForge's
   process/reviewers/packs/hooks. Stop and ask before anything outside these steps.
```
