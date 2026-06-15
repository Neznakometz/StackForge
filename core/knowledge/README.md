# Knowledge packs

A library of ready-made knowledge for technologies. `/init` reads the chosen packs and
assembles the project's `CLAUDE.md` from them. The source of the rules is the technology's
official docs (low risk of hallucinations), not blog posts.

## Structure

```
knowledge/
  <tech>/
    rules.md       ← rules for CLAUDE.md (glued together at /init)
    SKILL.md       ← opt.: an auto-triggering skill for the technology
    sources.md     ← where the rules were taken from (docs, versions)
  presets/
    <name>.md      ← a ready-made stack bundle (e.g. "our current stack")
```

## rules.md format

```markdown
# <Technology> — rules
> Version: <x.y> · Source: official docs · Updated: YYYY-MM-DD

## Hard rules
- [rule, operational, verifiable]

## Path-scoped (if any)
- `path/**` → [what to enforce]

## Conflicts with
- [other packs that can't be installed together — e.g. riverpod ⊥ bloc]
```

## Rules for a good pack

- Operational rules, not theory. "Use `AsyncValue.guard`", not "write reliable async".
- Tag the version and the date — stacks go stale.
- Specify conflicts so /init doesn't glue together contradictions.
- Brief: a pack is rules in CLAUDE.md, not a textbook.

## Current packs

| Pack | Status |
|-----|--------|
| `flutter-riverpod` | planned (mobile fixed) |
| `presets/current-stack` | **awaiting the user's stack input** |
