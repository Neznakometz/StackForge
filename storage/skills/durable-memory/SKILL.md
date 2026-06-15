---
name: durable-memory
description: L3 durable memory for the agent across sessions — SQLite + agent-memory.md, consolidation and cleanup. Apply when you need persistent project memory (patterns, paths, architectural decisions) beyond the core checkpoints (L2).
---

# L3 — durable memory

Extends the core memory (L1 context + L2 checkpoints). L3 doesn't die between sessions.

## Storage
- **SQLite** (`store/agent.db`) — the machine-readable source of truth (if an MCP/plugin for memories is available).
- **`agent-memory.md`** — a human-readable mirror for review.
- If SQLite is unavailable — work via `agent-memory.md` only (simpler, less reliable).

## What lives in L3
Paths to important files/folders, architectural decisions ("why a webhook, not polling"), style rules, the user's behavioural patterns, the project's long-term goals.

## Expiration policy
- Keep permanently: paths, architecture, patterns, style rules.
- Delete after 30 days: one-off findings, temporary solutions, observations without generalization.
- Permanent-storage markers: `permanent` / `important` / `keep` (in the text or a tag) — protect a record from cleanup.

## Rules for writing to agent-memory.md
- Specify a `scope`: user / project / team / session.
- Replace outdated records on the same topic — don't accumulate contradictions.
- Normalize dates to absolute format (YYYY-MM-DD).
- Compact facts and patterns, not raw chat logs. A task's temporary noise → L2, not here.

## Cycle
- Before a task — read `agent-memory.md` for relevant knowledge.
- After — if you learned a permanent pattern/fact, add it (a generalization, not junk).
- Maintenance commands: `/dream` (consolidation), `/warmup` (cache), `/memory-gc` (cleanup).

## Record format
```markdown
### YYYY-MM-DD — topic_key — [PERMANENT]
- Scope: project
- Content: [a specific fact or pattern]
```
