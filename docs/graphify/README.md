# Graphify on top of StackForge

Per-agent recipes for adding **[Graphify](https://github.com/safishamsi/graphify)** to a
StackForge project — efficiently, and without breaking anything.

> **Graphify** by [@safishamsi](https://github.com/safishamsi) — a tool that turns a folder
> (code, markdown, PDFs, images) into a persistent **knowledge graph** you query instead of
> re-reading raw files. Multimodal (Claude vision), AST for code (tree-sitter), local, no server.
> Repo: https://github.com/safishamsi/graphify · not affiliated with StackForge.

## Pick your agent

| Agent | Recipe |
|-------|--------|
| Claude Code | [claude-code.md](claude-code.md) |
| Cursor | [cursor.md](cursor.md) |
| Codex (OpenAI) | [codex.md](codex.md) |
| Antigravity (Google) | [antigravity.md](antigravity.md) |

## Why it fits StackForge

StackForge's `long-context` skill already says: don't read everything — query an **index** for
code, RAG for knowledge, recursion for huge artifacts. Graphify is that **index**, with one edge
the others lack: it's **multimodal and persistent**. So it slots in as a **token-economy
multiplier** — query the graph (or read `graphify-out/wiki/index.md`) instead of grep-reading
files. It complements `codegraph-nav`/SocratiCode; it does **not** replace StackForge's process,
reviewers, packs, or hooks.

## The model that makes it cross-agent

Graphify is a Python CLI (`pip install graphifyy` → `graphify`) plus a Claude Code skill wrapper.
Two phases, with very different requirements:

- **Build (extraction)** runs on **Claude** (concept + vision passes). Inside Claude Code it uses
  the session; as a standalone CLI it needs an Anthropic API key (see Graphify's docs). This is
  the only step that needs an LLM.
- **Query** (`graphify query/explain/path`, or just reading `graphify-out/graph.json` /
  `wiki/index.md`) is **plain local data — agent-agnostic, no LLM, no key**.

→ **The robust cross-agent pattern: build the graph once (in Claude Code, or via the CLI with a
key), then query it from any agent.** For live querying, Graphify's **MCP mode**
(`graphify . --mcp`, an stdio MCP server) plugs into Cursor / Codex / Antigravity directly.

## Common rules (apply to every agent)

- **Build once, update incrementally.** `graphify .` to build; `graphify . --update` after — the
  SHA256 cache reprocesses only changed files, so you don't re-pay the extraction cost.
- **`--watch` for code** (AST-only, instant); reserve `--mode deep` (more INFERRED edges, more
  cost) for when you need discovery.
- **Don't commit the output.** Add to `.gitignore`: `graphify-out/` and `.stackforge/`. Keep
  `graphify-out/graph.json` only if you want the graph versioned (`!graphify-out/graph.json`).
- **INFERRED ≠ fact.** Graphify tags edges `EXTRACTED` / `INFERRED` / `AMBIGUOUS`. Matching
  StackForge's "don't invent behavior" rule, treat `INFERRED`/`AMBIGUOUS` as **leads to verify**,
  not ground truth.
- **Keep the rule thin.** Wire Graphify into the agent with **one usage line** (query the graph
  before reading files), not a wall of config. Per-agent files show exactly where.
- **Don't touch StackForge.** Graphify is additive: it must not modify StackForge's process,
  reviewers, packs, settings, or (on Claude Code) hooks.

## Verify (any agent)

1. `graphify .` produced `graphify-out/graph.json` + `GRAPH_REPORT.md`.
2. `git status` shows `graphify-out/` ignored, not staged.
3. A sample `graphify query "…"` (or MCP query) returns nodes/edges with EXTRACTED/INFERRED tags.
4. StackForge still checks out clean — on Claude Code: `bash scripts/validate.sh` + `node tests/hooks.test.mjs` pass.
