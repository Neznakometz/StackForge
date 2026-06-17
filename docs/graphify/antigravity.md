# Graphify on StackForge — Antigravity (Google)

Read [README.md](README.md) first (shared model + common rules). Antigravity is Google's
agent-first IDE on Gemini 3; since **v1.20.3** it reads **`AGENTS.md`** at the repo root (alongside
`GEMINI.md`), keeps agent skills in **`.agents/skills/`**, and supports **MCP** servers. So
StackForge here = skills (`npx skills` → place under `.agents/skills/` if needed) + `AGENTS.md`.
Graphify: https://github.com/safishamsi/graphify

## Install

```bash
pip install graphifyy        # Python 3.10+
```

The **build (extraction) runs on Claude**, not on Gemini — set an Anthropic API key for the CLI,
or build the graph once in Claude Code and just **query** it from Antigravity (querying is plain
local data, no LLM/key). Practical pattern: Claude builds the map, Antigravity's Gemini agents
read it.

## Wire it in

**A) MCP (recommended).** Register Graphify as an MCP server in Antigravity's MCP settings
(Agent Manager → MCP, or the MCP config file):

```json
{
  "mcpServers": {
    "graphify": { "command": "graphify", "args": [".", "--mcp"] }
  }
}
```

> Antigravity's MCP UI/config is evolving — if the JSON path differs, use the in-IDE
> "MCP servers" settings and point it at `graphify . --mcp`.

**B) Rule in AGENTS.md** (supported v1.20.3+). Append **one usage line**:

```md
- Long-context: if `graphify-out/` exists, query the graph (`graphify query "…"`,
  `graphify explain "X"`) or read `graphify-out/wiki/index.md` before reading raw files. Treat
  INFERRED/AMBIGUOUS edges as leads to verify, not facts.
```

Optionally drop the query helper as a skill in `.agents/skills/` (Antigravity's skill folder).
`.gitignore`: `graphify-out/`, `.stackforge/`.

## Build & use

```bash
graphify .              # build (needs Claude/API key)
graphify . --update     # refresh changed files
graphify . --wiki       # wiki/index.md — ideal for Antigravity's file-reading agents
graphify query "what are the god nodes in the data layer?"
```

## Verify

`graphify-out/graph.json` + `GRAPH_REPORT.md` produced; `graphify-out/` git-ignored; an MCP/CLI
query returns tagged nodes/edges. StackForge's `AGENTS.md`/skills unchanged except the one rule.

## Paste into Antigravity

```
Set up Graphify on this StackForge project per docs/graphify/antigravity.md:
1) pip install graphifyy (Python 3.10+).
2) Register the graphify MCP server in Antigravity's MCP settings: command "graphify",
   args [".","--mcp"].
3) Append ONE usage line to AGENTS.md: query the graph / read graphify-out/wiki/index.md before
   reading files; INFERRED/AMBIGUOUS = leads to verify.
4) Add `graphify-out/` and `.stackforge/` to .gitignore.
5) Build once with `graphify .` (extraction needs an Anthropic key, or build it in Claude Code),
   report GRAPH_REPORT.md god-nodes. Don't change StackForge beyond the one rule. Stop and ask
   before anything else.
```
