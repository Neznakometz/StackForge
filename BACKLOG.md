# Backlog

Deferred ideas, not yet started. Ordered roughly by value.

## Owner action (needs you)

- **Demo / walkthrough** — record a short GIF or video of `/init` → first task → cross-model review, or add an `examples/` project. Demos convert to installs more than features. *(Owner records the media; an `examples/` walkthrough doc can be authored separately.)*
- **Cut the release** — `git tag v0.2.0 && git push --tags`, then create a GitHub Release from the `0.2.0` CHANGELOG section. (Files are version-cut; the tag/release needs a push.)
- **Distribution** — submit to `hesreallyhim/awesome-claude-code`, the Vercel skills registry, and agentskills.io; add repo topics (`claude-code`, `agent-skills`, `cursor`, `codex`, `developer-tools`). Visibility beats more features at this stage.

## Product depth

- **Mobile beyond Flutter** — RN (Callstack), Swift (twostraws), Kotlin (rcosteira79) are referenced as anchors but not built as packs/skills. Build real packs if mobile breadth matters.
- **More knowledge packs** — community contributions via `/add-stack`; a "packs wanted" list could seed it.
- **Deepen `analytics`/`fusion`** — the generation-side fusion skill is intentionally thin.

## Nice-to-have

- A rendered metrics view over `.stackforge/metrics.log` (trend of tokens/tool-calls per session).
- A skill/plugin grading rubric (100-point) for contributors, à la jeremylongshore's `validate-plugin`.
