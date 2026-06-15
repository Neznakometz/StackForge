# Contributing — StackForge

The framework is extended in three ways: a new **stack** (knowledge pack), a new
**domain** (plugin), an edit to the **core**. Below — how to do each one cleanly.

## Add a stack (knowledge pack)

1. In Claude Code, run `/add-stack <technology>` — the command grounds the rules in
   the official docs, creates `core/knowledge/<id>/`, and registers the pack.
2. Or manually: copy `core/knowledge/_template/` → `core/knowledge/<id>/`,
   fill in `rules.md` + `sources.md` (rules only from official docs),
   add an object to `core/knowledge/registry.json` (`status: ready`).
3. Specify `conflictsWith` for packs considered incompatible (e.g. an alternative
   state management/ORM), otherwise `/init` will glue contradictions together.

## Add a domain (plugin)

1. Create a `<domain>/` folder with `.claude-plugin/plugin.json`, `skills/`, `agents/`,
   `commands/`, `hooks/`, following the example of `core/`.
2. Register the plugin in the root `.claude-plugin/marketplace.json` (the
   `plugins` array): `name`, `description`, `source`, `category`.
3. A domain sits on top of the core — don't duplicate process/memory/review, reference them.

## Edit the core

- Keep `core` thin: process, review, memory, token economy, `/init`.
  Domain- and stack-specific things — in plugins/packs, not in the core.
- Any recurring review comment → a rule in the corresponding pack, not in the code.

## Updating components

- Plugin code (agents/skills/commands) — to the user via `/plugin update`.
- Knowledge (packs) — via `/update-knowledge [id|all]`: verification against the docs, semver,
  `last_verified`. The staleness policy is 90 days or a new version of the target.

## Quality

- **Before committing:** `bash scripts/validate.sh` — green (JSON, skill/agent frontmatter, plugin registration, pack integrity, hook compilation). The same runs in CI (`.github/workflows/validate.yml`) on push.
- Rules — operational and verifiable, not theory.
- Version it: edits to rules = minor, a rewrite = major (see CHANGELOG). Agent authoring rules — in the root `CLAUDE.md`.

## Framework support in VSCode

`.vscode/` cannot be created automatically (it's protected) — create it manually. Recommendations:

`.vscode/extensions.json`:
```json
{
  "recommendations": [
    "anthropic.claude-code", "redhat.vscode-yaml",
    "davidanson.vscode-markdownlint", "timonwong.shellcheck", "esbenp.prettier-vscode"
  ]
}
```

`.vscode/settings.json` (JSON schemas for autocompletion/validation in the editor):
```json
{
  "files.associations": { "*/.claude-plugin/marketplace.json": "jsonc" },
  "json.schemas": [
    { "fileMatch": ["**/marketplace.json"], "url": "https://anthropic.com/claude-code/marketplace.schema.json" }
  ],
  "editor.formatOnSave": true
}
```

Both files are allowed in `.gitignore` (the rest of `.vscode/` is ignored).

## Licenses and attribution

The project is under MIT. If you port content from third-party sets — preserve their
license and attribution; don't pull content under copyleft licenses (e.g. AGPL) into
MIT packages. Cite the source in the pack's `sources.md`.
