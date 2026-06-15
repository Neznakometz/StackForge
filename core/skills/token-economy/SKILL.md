---
name: token-economy
description: Rules for saving context/tokens while agents work. Apply always, especially when reading documentation and large files.
---

# Token economy

Reading:
- NEVER read large documents (the spec, the design spec) in full. Use the documentation map from CLAUDE.md: Grep by the section heading → Read with offset/limit.
- "Where/how/is there in the repo" questions — to the `scout` agent (haiku), not into the main context.
- Large code files: first Grep by symbol, read only the needed range. If there is an index (codegraph/LSP) — query it instead of blind grep.
- Don't re-read a file after your own Edit — the tool itself fails on error.

Subagents:
- A fresh, narrow context: the task text + references to sections. Don't pass the dialog history.
- Subagent reports are limited by their prompts; returned a wall of text — that's a bug, demand brevity.
- Long test logs — through `test-runner` (haiku), it compresses them.

Generation:
- Edit pointwise, don't Write the whole file again.
- Don't paste file contents into reports and commit messages.
- Boilerplate (components, configs) — via CLI generators, don't type it by hand.

Sessions:
- PROGRESS.md is the single source of "where we are"; a new session starts from it (≤50 lines), not from re-reading documents.
- /compact between phases; don't drag a single session across several phases.

> Additional reinforcement (optional, separate plugins): `ponytail-safe` (less code),
> `ponytail-terse` (less outgoing prose), `codegraph-nav` (less reading per search),
> `bash-output-compression` (compression of command output). They cover 4 different token cost items.
