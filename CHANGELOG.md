# Changelog

Format — [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), versions by semver.

## [Unreleased]

### Added
- **Renamed to StackForge** (from "Claud Framework") to avoid trademark ambiguity with Anthropic's "Claude"; marketplace name `stackforge`, install refs `@stackforge`. Kept the "for Claude Code" tagline + non-affiliation disclaimer.
- **Legal hygiene:** `CREDITS.md` (attribution for referenced projects, standards, conventions + their licenses) and an Anthropic non-affiliation disclaimer in README/CREDITS. Audit confirmed: no bundled third-party code, no copyleft pulled into MIT, all packs cite sources.
- **English everywhere.** The whole framework translated to English (all skills, agents, commands, knowledge packs, templates, docs, comments). Memory markers normalized to `permanent`/`important`/`keep`.
- Showcase README (badges, at-a-glance metrics, real benefits, sets/packs sections).
- Skeleton of the marketplace and the `core` plugin (`.claude-plugin/`).
- Stack-aware `/init`: multi-select type+stack, assembling `CLAUDE.md` from packs.
- Knowledge-pack library: format, the `_template/` template, `registry.json`
  (13 packs for the user's stack in `planned` status).
- Extension mechanism: `/add-stack` — a new pack, grounded in the docs.
- Update mechanism: `/update-knowledge` — verifying packs against the docs, semver,
  a staleness policy (90 days / a new version of the target).
- GitHub scaffolding: LICENSE (MIT), CONTRIBUTING, .gitignore, this file.
- The core is filled out:
  - 7 agents (implementer, spec/code/design-reviewer, security-auditor, test-runner, scout);
  - 7 skills (task-loop, cross-model-review, tdd, contracts, token-economy, memory, prompt-audit);
  - commands next-task, phase-check, checkpoint;
  - hooks (session-start, pre-compact), a settings.json template.
- README laid out (badges, tables, sections).
- The **mobile** domain plugin (Flutter+Riverpod): the `flutter-riverpod` pack (ready), 5 skills, 3 agents, hooks (dart format/analyze), the `unity-to-flutter` skill with templates.
- The domain plugins **spec-prep** (idea→spec + 4 templates), **saas** (api-design/background-jobs/multitenancy), **ui** (ui-architecture/design-system/web-a11y), **games** (game-design/engine-setup + game-designer), **analytics** (fusion/report-builder).
- All 7 plugins registered in marketplace.json.
- **13 knowledge packs grounded in the official docs** (status ready, version 1.0.0, last_verified 2026-06-15): php-laravel, python-django, node-nestjs, data-sql, data-cache, data-search-olap, frontend-react, frontend-vue-nuxt, frontend-styling, devops-containers, devops-ci-infra, devops-observability, flutter-riverpod. Each — rules.md + sources.md.
- README reworked in a landing-page style: composition metrics, real benefits, pack sections.

- The **storage** domain plugin (storage/memory): durable-memory (L3), rolling-log (Layer 0.5), rag (pgvector/Qdrant, HNSW), long-context (index vs RAG vs RLM vs grep); commands /dream, /warmup, /memory-gc. Closes a gap: L3 was previously promised in /init but not implemented.

- **The ui set strengthened** (generation, not just review): the `ui-designer` agent (a two-pass loop against AI slop), the `visual-craft` skill (numbers from Refactoring UI/M3/HIG/WCAG), `design-tokens` + the drop-in `templates/tokens.css` (light+dark, AA). The generate→audit→review loop + references to professional tools (frontend-design, the shadcn skills, the Vercel audit, OneRedOak, Figma MCP).
- Basic Vue support: the `shadcn-vue` skill (Reka UI/Tailwind v4, Nuxt scaffolding, hydration) + the `templates/tokens-shadcn.css` bridge — our tokens are inherited by shadcn components (Vue and React, shared nomenclature).

- **MCP map** (`MCP.md`): which optional MCP/tool enhances what for which set, the connection command, behavior without it. Servers are not bundled (tied to credentials/machine); everything degrades gracefully. Clarified: cross-model review is a CLI (Codex/Gemini), not MCP.
- **Mobile toolchain**: the `flutter-toolchain` skill (Android Studio/Xcode via CLI — flutter/adb/xcrun simctl, the `flutter doctor` preflight, screenshot comparison on a device/simulator) + `mobile/templates/settings.json` (a CLI allow-list). Android Studio/Xcode are controlled by commands, not the GUI; no MCP is needed for them.

- **VSCode**: the framework is IDE-agnostic (nothing needs changing). `/init` optionally scaffolds `.vscode/extensions.json` for the stack → Claude gets LSP diagnostics in the editor without extra runs; an "IDE (VSCode)" section in the README.

### Planned
- path-scoped rules as a hook enforcer in the core.
- smoke tests for hooks.
- Publishing to GitHub (after the user's review).
