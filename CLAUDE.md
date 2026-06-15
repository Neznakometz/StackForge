# CLAUDE.md — StackForge (rules for developing the framework itself)

This file is read when the agent edits THIS repository (not the user's project). The goal — to author plugins/skills/packs consistently. The human guide is `CONTRIBUTING.md`; the map of sets is `README.md`.

## What this is
A Claude Code plugin marketplace: a thin core (`core/`) + domain sets (`mobile/`, `spec-prep/`, `saas/`, `ui/`, `games/`, `analytics/`, `storage/`). The plugin registry — `.claude-plugin/marketplace.json`. The knowledge-pack registry — `core/knowledge/registry.json`.

## Hard rules
1. **Plugin structure:** `<plugin>/.claude-plugin/plugin.json` + `agents/` `skills/<name>/SKILL.md` `commands/*.md` `hooks/` `templates/` as needed. A new plugin must be in `marketplace.json` (`name/description/source/category`).
2. **Frontmatter is mandatory:** every `SKILL.md` — `name:` + `description:`; every agent — `name:` + `description:` (+ `tools:`, `model:`). Valid YAML.
3. **Thin core.** In `core/` — only the general stuff (process, review, memory, token economy, /init). Domain- and stack-specific things — in plugins/packs, not in the core.
4. **Knowledge packs — only from official docs.** No rules from memory. A pack = `core/knowledge/<id>/rules.md` + `sources.md` + an entry in `registry.json` (`status`, `version` semver, `last_verified` = the verification date). Specify `conflictsWith` for incompatible packs (React⊥Vue, Riverpod⊥Bloc).
5. **Don't duplicate.** If a rule is already in a core skill/pack — reference it, don't copy. Professional external solutions — reference them (with license/attribution), don't pull copyleft (AGPL) into MIT.
6. **Graceful degradation without MCP.** Every skill/agent works without MCP/external tools; MCP only enhances (see `MCP.md`).
7. **Versioning:** edits to a pack's rules = minor, a rewrite = major; update `CHANGELOG.md` and the metrics in `README.md` when adding sets/skills/agents.

## Before committing
1. `bash scripts/validate.sh` — green (JSON, frontmatter, registry, plugins, hooks).
2. The metrics in `README.md` (sets/agents/skills/commands/packs/hooks) recalculated.
3. An entry in `CHANGELOG.md`.
4. If you change a pack — update `version` + `last_verified` in `registry.json`.

## Style
- Skills/rules — operational and verifiable, not theory; short. Files: kebab-case. Frontmatter `description` — when to trigger.
- Conventional commits (`feat:`, `fix:`, `docs:`).
