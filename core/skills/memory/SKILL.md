---
name: memory
description: The agent's memory between sessions — context management (L1) and checkpoints (L2). Apply when the context fills up, when moving to a new chat, and when closing a session.
---

# Memory — L1 (context) + L2 (checkpoints)

L3 (durable/SQLite) and the rolling log (Layer 0.5) are in a separate set, `storage` (`/plugin install storage@stackforge`), installed when persistent memory is needed. Here — L1+L2.

## L1 — active context

- Watch the fill level of the context window. At **40%** — propose `/compact`. Never let it reach auto-compact at 95% (quality degrades).
- `/compact`: a brief summary of progress (task, done, remaining) → continue.
- `/convolife`: estimate the % of context filled, report what's left.
- `/clear`: a full wipe — only when the topic is fully closed.

## L2 — checkpoints

- `/checkpoint` — before every chat close. Creates `Sessions/checkpoints/YYYY-MM-DD-checkpoint.md`:
  `## What was done` (specifics: paths, numbers) · `## Key decisions` (why this way) · `## Not finished` (the next step).
- **Auto-checkpoint:** a task spanning 3+ files or 10+ steps → write progress to `Sessions/tmp/progress-<slug>.md` every exactly 10 tool calls; delete it on completion.
- `/newchat`: checkpoint → "start a new session".

## Injection order for a new session (top to bottom)

`[Memory]` (key facts) → `[Previous session]` (the last checkpoint) → the user's message.

## Rules

- Temporary (task details) → only L2, not into long-term memory.
- Permanent (patterns, paths, architecture) → L3, if enabled; otherwise into `agent-memory.md`.
- Replace stale entries, don't accumulate contradictions.
- PROGRESS.md is maintained by the orchestrator (task-loop), the checkpoint — more detailed, for recovery.
