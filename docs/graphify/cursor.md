# Graphify on StackForge — Cursor

Read [README.md](README.md) first (shared model + common rules). On Cursor, StackForge is skills
(`npx skills`) + an `AGENTS.md` (no Claude Code hooks, so no `bash-guard` — the curl caveat
doesn't apply, but `pip` is still the simplest install). Graphify: https://github.com/safishamsi/graphify

## Install

```bash
pip install graphifyy        # Python 3.10+
```

The **build (extraction) runs on Claude** — set an Anthropic API key for the CLI, or build the
graph once inside Claude Code and just **query** it from Cursor (querying needs no LLM/key).

## Wire it in (two clean options)

**A) MCP (recommended for live querying).** Add Graphify's MCP server to `.cursor/mcp.json`
(project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "graphify": { "command": "graphify", "args": [".", "--mcp"] }
  }
}
```

Now Cursor can query the graph through MCP tools.

**B) Rule + files.** Add a Cursor rule `.cursor/rules/graphify.mdc`:

```md
---
description: Prefer the Graphify knowledge graph over reading raw files.
---
If `graphify-out/` exists, query the graph (`graphify query "…"`, `graphify explain "X"`) or read
`graphify-out/wiki/index.md` before grep-reading source files. Treat INFERRED/AMBIGUOUS edges as
leads to verify, not facts.
```

`.gitignore`: `graphify-out/`, `.stackforge/`.

## Build & use

```bash
graphify .              # build (needs Claude/API key)
graphify . --update     # refresh changed files
graphify query "what connects auth to the optimizer?"
graphify . --wiki       # build wiki/index.md for file-based navigation
```

`graphify . --watch` keeps code in sync (AST, instant).

## Verify

`graphify-out/graph.json` + `GRAPH_REPORT.md` produced; `graphify-out/` git-ignored; an MCP or CLI
query returns tagged nodes/edges. StackForge's skills/`AGENTS.md` unchanged.

## Paste into Cursor

```
Set up Graphify on this StackForge project per docs/graphify/cursor.md:
1) pip install graphifyy (Python 3.10+).
2) Register the graphify MCP server in .cursor/mcp.json: command "graphify", args [".","--mcp"].
3) Add a thin .cursor/rules/graphify.mdc: prefer querying the graph / reading
   graphify-out/wiki/index.md before reading files; INFERRED/AMBIGUOUS = leads to verify.
4) Add `graphify-out/` and `.stackforge/` to .gitignore.
5) Build once with `graphify .` (note: extraction needs an Anthropic key, or build in Claude Code),
   then report GRAPH_REPORT.md god-nodes. Do not change StackForge's skills or AGENTS.md beyond the
   one usage rule. Stop and ask before anything else.
```
