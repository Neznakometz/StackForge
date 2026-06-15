<!--
TEMPLATE for a knowledge pack. Copy the folder, rename to knowledge/<id>/, fill it in.
Take rules ONLY from the official docs (see sources in registry.json) —
that's exactly the protection against hallucinations. Always set the version and date.
Register the pack in core/knowledge/registry.json (status: ready).
-->

# <Technology> — rules
> Targets: <versions> · Source: official docs · Updated: YYYY-MM-DD

## Hard rules
- [an operational, verifiable rule — "use X", not "write well"]
- [...]

## Path-scoped (opt.)
- `path/**` → [what to enforce in this layer]

## Anti-patterns (what to catch in review)
- [a specific anti-pattern → how to do it right]

## Conflicts with
- [ids of packs incompatible by opinion — /init won't glue them together]
