# AGENTS.md — StackForge methodology (portable across agents)

Drop this file at your repo root to give ANY AI coding agent (Claude Code, Cursor,
Codex CLI, Gemini CLI, Copilot, Windsurf, …) the StackForge way of working — even
without the plugin machinery. For Gemini CLI, copy/rename to `GEMINI.md`; for Cursor,
place under `.cursor/rules/`. Claude Code users: prefer the full plugin install
(adds subagent orchestration + hooks) — see `INSTALL.md`.

The skills and knowledge packs are portable (SKILL.md is an open standard). The
**subagent orchestration, hooks, and marketplace are Claude-Code-native** — on other
agents the steps below are performed by you directly, in sequence.

## Process

1. **Spec first.** Before coding, get a clear spec with **verifiable acceptance criteria** ("when X, then Y"). Missing info → ask, don't guess.
2. **Small tasks.** One task at a time (5–15 min). Break larger work down; keep a `PROGRESS.md` (≤50 lines) as the single "where we are".
3. **TDD.** Write a failing test first → minimal code → green → refactor. No "I'll add the test later".
4. **Review every change.** (a) spec conformance, (b) code quality, (c) — if a second model CLI is available — **cross-model review**: run `codex review` and/or `gemini` over the diff as an external reviewer; you arbitrate its findings (real → fix, noise → discard). (d) tests + lint + typecheck.
5. **Phase gates.** Don't advance to the next phase until acceptance criteria actually pass (run the checks, don't assume).
6. **Subagents (if supported).** Dispatch a fresh, narrow subagent per task and per review (task text + section references, not the whole history). If your agent has no subagents, do these roles yourself in order.

## Hard rules

- **Contracts:** schema is the single source of truth; types derived from it; validate inputs at boundaries.
- **Security:** scope every data query by tenant/owner; secrets only in env; never log secrets/PII.
- **Stack rules:** load the relevant StackForge knowledge pack for your stack — `core/knowledge/<tech>/rules.md` (rules from official docs).
- **Don't invent behavior.** No data in the sources → escalate, don't guess.
- **Token economy:** don't read big docs whole (grep the section); narrow context; edit pointwise; don't paste file contents into reports.

## Memory

- Start each session from `PROGRESS.md`. Checkpoint before ending a session (what's done / decisions / next step).
- Persistent facts (paths, architecture, patterns) → a durable note; temporary task detail stays in the checkpoint.

## Skills

Install portable skills on any agent with the cross-agent CLI:
`npx skills add Neznakometz/StackForge` (or per skill: `npx skills add Neznakometz/StackForge --skill <name>`). See `INSTALL.md`.
