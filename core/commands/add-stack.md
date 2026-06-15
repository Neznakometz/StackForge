---
description: Add a new knowledge pack (stack/technology) to the library — grounded in official docs, with registration in the registry.
argument-hint: <technology> (e.g. "Svelte" or "Laravel Octane")
---

# /add-stack — extend the stack library

You add a new knowledge pack so that `/init` can deploy projects on
this technology. A pack is rules from OFFICIAL docs, not from memory.

## Steps

1. **Clarify** the technology and its current version from the `$ARGUMENTS` argument
   (if empty — ask). Determine the `id` (kebab-case, e.g. `frontend-svelte`)
   and the `category` (backend | frontend | devops | mobile | other).
2. **Check for a duplicate** in `core/knowledge/registry.json` — if the pack already exists,
   suggest `/update-knowledge <id>` instead of creating one.
3. **Ground in the docs.** Find the official documentation, read the sections
   best-practices / structure / security / testing. Take only what is
   confirmed by the docs; tag the version. Inventing rules from memory is forbidden.
4. **Create** `core/knowledge/<id>/rules.md` and `sources.md` from the template in
   `core/knowledge/_template/`. The rules — operational and verifiable.
   Specify `conflictsWith` if the pack contradicts another by opinion
   (e.g. alternative state management/ORM).
5. **Register** in `registry.json`: add the pack object
   (`status: "ready"`, `version` starts at `1.0.0`, `last_verified` = today,
   `sources` = real doc URLs).
6. **Verification.** `ls core/knowledge/<id>/`, re-read rules.md for conflicts with
   neighboring packs, report what was added and how `/init` will pick it up.

## Principles

- One pack = one technology (or a tight bundle). Don't dump React and Vue into one.
- Brief: a pack is rules in CLAUDE.md, not a textbook.
- Conflicts must be specified — otherwise `/init` will glue together contradictions.
