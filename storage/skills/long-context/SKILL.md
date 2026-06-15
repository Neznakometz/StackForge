---
name: long-context
description: Strategies for working with a large context — choosing between a code index, RAG, recursive decomposition (RLM), and grep. Apply when you need to process a large volume (a codebase, a giant file/log/transcript, a docs corpus) that doesn't fit in context.
---

# Long-context strategies

Don't drag everything into context. Pick the tool for the nature of the input — stop at the first one that solves the task.

| Input | Strategy | With what |
|-------|----------|-----------|
| Codebase, "where/what calls X" | **Code index** | codegraph-nav + an engine (SocratiCode): a graph of symbols/dependencies, impact analysis. Reusable, cheap. |
| Knowledge/docs corpus, Q&A | **RAG** | the `rag` skill: chunk → embedding → vector search → rerank. |
| ONE huge unstructured artifact (a 500k-line log, a giant transcript) | **Recursive decomposition (RLM)** | context as a variable in a REPL → programmatically cut into pieces → sub-calls over the pieces. Natively: a file + Claude subagents + Bash; an external tool — `rlms` (Python). |
| Pinpoint search for a line/symbol | **grep/glob** | direct search for the needed range, without reading the whole thing. |

## Principles
- **Index vs recursion:** for code, an index usually wins (built in advance, reusable, cheap); for arbitrary large text — recursion (the RLM pattern). These are different tools, not "either-or".
- **Recursion is expensive:** many sub-calls = money/time. Apply it when the cheap methods (grep, index, RAG) don't cover it. For the safety of code execution — a sandbox.
- **RLM as an external tool, not the core.** The `rlms` engine plugs in as an optional tool/MCP for a specific task of processing a giant input, not as a mandatory dependency. The native "poor man's RLM" — your `task-loop` + `scout` + file context — covers most cases.
- **Compress first, then think:** `scout` (haiku) and `bash-output-compression` cut the volume down before it reaches the main context.
