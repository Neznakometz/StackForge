# Graphify on top of StackForge

Optional add-on: use **[Graphify](https://github.com/safishamsi/graphify)** (a knowledge-graph
tool by [@safishamsi](https://github.com/safishamsi)) as a token-saving **index** on a StackForge
project — efficiently, and without breaking anything.

Per-agent setup recipes live in **[`docs/graphify/`](docs/graphify/README.md)**:

| Agent | Recipe |
|-------|--------|
| Claude Code | [docs/graphify/claude-code.md](docs/graphify/claude-code.md) |
| Cursor | [docs/graphify/cursor.md](docs/graphify/cursor.md) |
| Codex (OpenAI) | [docs/graphify/codex.md](docs/graphify/codex.md) |
| Antigravity (Google) | [docs/graphify/antigravity.md](docs/graphify/antigravity.md) |

Start with the index — [docs/graphify/README.md](docs/graphify/README.md) — for the shared model
(build once on Claude, query from any agent / MCP), the common don't-break rules, and attribution.

> Graphify is a separate project, not affiliated with StackForge — repo:
> https://github.com/safishamsi/graphify (credit in [CREDITS.md](CREDITS.md)).
