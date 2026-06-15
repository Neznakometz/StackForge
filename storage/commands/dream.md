---
description: Consolidation of durable memory (L3) — extract patterns from recent sessions, update agent-memory.md, prune the old.
---

Memory consolidation (once a week; can be done manually):

1. Read the sessions/checkpoints of the last week.
2. Extract **patterns and generalizations** (not specific facts, but conclusions): "the user picks a webhook over polling in new integrations".
3. Delete records older than 30 days without `permanent/important/keep` markers.
4. Update `agent-memory.md` (and SQLite, if used): replace the outdated, don't duplicate.
5. Append the generalizations to the `## Learned Patterns` section (with a date and a session count).
6. Report: what was added/generalized/deleted.

Auto-run (optional): cron Sunday 03:00. Don't invent patterns — only what actually recurred across sessions.
