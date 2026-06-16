---
description: Stack-aware project scaffold — asks for the type and stack (multi-select), assembles CLAUDE.md from knowledge packs, initializes memory and the spec.
---

# /init — deploy the StackForge in a project

You set up the agent's working environment for a SPECIFIC project and stack. The goal
is for the agent to work well from day one onward: knowing the stack's rules, having
memory and a process. Do NOT write the project's code at this step — only configure the environment.

## Step 1. Determine the context

- greenfield (empty repo) or brownfield (has code)? For brownfield — quickly
  scan `package.json`/`pubspec.yaml`/`*.csproj`/`go.mod` and offer
  the already-detected stack as the default in the questionnaire.
- Is there a `SPECIFICATION.md` / `CLAUDE.md`? If so — ask whether we're updating or starting from scratch.

## Step 2. Questionnaire (multi-select)

Ask the user the questions. EACH one — with the ability to pick several options
and with an "other (I'll type it in)" item. Offer the **"our current stack"** preset first,
if it exists in `knowledge/presets/`.

1. **Project type** (multi-select): SaaS/backend · UI/design · Games · Mobile ·
   Analytics/research · Spec-prep (idea→spec).
2. **Language(s)**: TypeScript · Dart · Swift · Kotlin · Python · Go · C#/Unity · …
3. **Framework(s)**: Next.js · NestJS · Flutter · React Native · SwiftUI ·
   Jetpack Compose · Unity · …
4. **Data/infra** (if relevant): Postgres · Drizzle · Redis · BullMQ ·
   S3/R2 · Firebase · …
5. **State/architecture** (if mobile/frontend): Riverpod · Bloc · Redux · …
6. **Memory depth**: L1+L2 (the default, in the core) · +L3 durable / rolling log / RAG → the `storage` set (offer to install `/plugin install storage@stackforge` if persistent memory or RAG is needed).

If the stack is unambiguous from the context (for example, mobile → Flutter+Riverpod) —
confirm with a single question, don't run the whole questionnaire.

## Step 3. Assemble AGENTS.md from the knowledge packs

For each chosen technology, read `knowledge/<tech>/rules.md` (and
`knowledge/presets/<name>.md` for a preset). Assemble the project's **`AGENTS.md`** — the
cross-agent rules file (read by Cursor/Codex/Gemini/Copilot) — from sections:

- **Identity and stack** — who the agent is, what stack, references to the spec.
- **Hard rules** — glue together from the chosen packs (types/contracts, security,
  layers, prohibitions). On a pack conflict (e.g. Bloc vs Riverpod) — do NOT glue both,
  ask the user which to keep.
- **Process** — task-loop, cross-model review, phase acceptance criteria.
- **Memory** — the chosen layers.
- **Path-scoped rules** — write paths for the stack (`lib/features/**`, `apps/api/**` …).

Then write a one-line **`CLAUDE.md`** that imports it: `@AGENTS.md` — so Claude Code picks
it up natively while other agents read `AGENTS.md` directly (single source of truth). For
Gemini CLI also point `GEMINI.md` at it; for Cursor, `.cursor/rules/` can reference it.

Don't duplicate: rules already covered by skills stay as a reference, not a copy.
Keep `AGENTS.md` ≤ ~150 lines (the core is thin; details — in skills/specs by trigger).

## Step 4. Scaffold

- `PROGRESS.md` — an empty journal (≤50 lines, read it first every session).
- `docs/decisions/` — an ADR folder + a README with the format.
- For greenfield with the "Spec-prep" type — `SPECIFICATION.md`,
  `DESIGN_SPEC.md`, `IMPLEMENTATION_PLAN.md` stubs from the template.
- `.claude/settings.json` — copy the `core/templates/settings.json` template
  (safe permissions + `codex review`/`gemini` for cross-model review)
  and add the stack-specific quality commands (lint/test/build for the chosen stack).
  For mobile — merge in `mobile/templates/settings.json` (the toolchain CLI).
- `.vscode/extensions.json` (optional, if you work in VSCode) — recommend
  the language extensions for the chosen stack so that Claude Code in VSCode gets
  LSP diagnostics without extra runs: Dart-Code.dart-code+flutter (Flutter),
  dbaeumer.vscode-eslint+esbenp.prettier (JS/TS), Vue.volar (Vue/Nuxt),
  ms-python.python+charliermarsh.ruff (Django), bmewburn.vscode-intelephense-client (Laravel).

## Step 5. Activate the domain

Suggest the install command for the domain plugin for the chosen type
(`/plugin install mobile@stackforge` etc.) and which skills will turn on.

## Step 6. Verification

List: which stack is fixed, which packs were loaded, which files were created,
what to install next. Verify: `ls` the created files — don't take it on faith.
