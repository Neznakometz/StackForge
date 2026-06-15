---
description: Reconcile knowledge packs with the official docs, flag stale ones, and update the rules for new stack versions.
argument-hint: [pack id | all] (default all)
---

# /update-knowledge — update the library's components

Stacks go stale: new versions come out, recommendations change. This command
keeps the packs current. It updates ONLY knowledge packs; plugin code
(agents/skills/commands) is updated normally via `/plugin update`.

## Steps

1. **Determine the scope** from `$ARGUMENTS`: a specific `id` or `all`
   (then go through all `status: ready` in `registry.json`).
2. **Staleness policy.** Mark a pack `status: "stale"` if any of these hold:
   - `last_verified` is older than 90 days;
   - a new major/minor version of the target has been released (check via `sources`);
   - the section version stated in `sources.md` has diverged from the current docs.
3. **Reconciliation.** For each pack, open the links from `sources.md`, compare the key
   sections. Found a divergence → update the corresponding rule in `rules.md`,
   add/fix the line in `sources.md` with the new version.
4. **Versioning.** Any change to `rules.md` → bump the pack's `version`
   in `registry.json` (semver: a rule edit = minor, a rewrite = major),
   set `last_verified` = today, return `status: "ready"`.
5. **Report.** Table: pack · was→now (version) · what changed · what's
   unchanged. Don't change anything without confirmation from the docs — a divergence without
   a source: don't fix it, put it in the report as "requires manual checking".

## Principles

- An update — based on evidence from the docs, not a guess.
- Don't touch `status: planned` packs (they don't exist yet).
- Re-check conflicts (`conflictsWith`): a new version may have removed/added them.
