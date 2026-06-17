# Graphify on StackForge — Codex (OpenAI)

Read [README.md](README.md) first (shared model + common rules). On Codex, StackForge is skills
(`npx skills`) + an `AGENTS.md` (Codex reads `AGENTS.md` natively). Graphify:
https://github.com/safishamsi/graphify

## Install

```bash
pip install graphifyy        # Python 3.10+
```

The **build (extraction) runs on Claude**, not on the Codex model — set an Anthropic API key for
the CLI, or build the graph once in Claude Code and just **query** it from Codex (querying needs
no LLM/key). This is the practical pattern: Claude builds the map, Codex reads it.

## Wire it in (two clean options)

**A) MCP (recommended).** Register Graphify's MCP server with Codex. Either:

```bash
codex mcp add graphify -- graphify . --mcp
```

or add it to Codex's config (`~/.codex/config.toml`):

```toml
[mcp_servers.graphify]
command = "graphify"
args = [".", "--mcp"]
```

> Codex's MCP config syntax can shift between versions — check `codex mcp --help` / the current
> Codex docs if the above differs.

**B) Rule in AGENTS.md.** Append **one usage line**:

```md
- Long-context: if `graphify-out/` exists, query the graph (`graphify query "…"`,
  `graphify explain "X"`) or read `graphify-out/wiki/index.md` before reading raw files. Treat
  INFERRED/AMBIGUOUS edges as leads to verify, not facts.
```

`.gitignore`: `graphify-out/`, `.stackforge/`.

## Build & use

```bash
graphify .              # build (needs Claude/API key)
graphify . --update     # refresh changed files
graphify query "where does request validation happen?"
graphify . --wiki       # wiki/index.md for file-based navigation
```

## Verify

`graphify-out/graph.json` + `GRAPH_REPORT.md` produced; `graphify-out/` git-ignored; an MCP/CLI
query returns tagged nodes/edges. StackForge's `AGENTS.md`/skills unchanged except the one rule.

## Paste into Codex

```
Set up Graphify on this StackForge project per docs/graphify/codex.md:
1) pip install graphifyy (Python 3.10+).
2) Register the graphify MCP server with Codex (`codex mcp add graphify -- graphify . --mcp`, or
   ~/.codex/config.toml [mcp_servers.graphify]).
3) Append ONE usage line to AGENTS.md: query the graph / read graphify-out/wiki/index.md before
   reading files; INFERRED/AMBIGUOUS = leads to verify.
4) Add `graphify-out/` and `.stackforge/` to .gitignore.
5) Build once with `graphify .` (extraction needs an Anthropic key, or build it in Claude Code),
   report GRAPH_REPORT.md god-nodes. Don't change StackForge beyond the one rule. Stop and ask
   before anything else.
```
