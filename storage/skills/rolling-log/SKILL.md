---
name: rolling-log
description: Layer 0.5 — a verbatim rolling log of the conversation. Apply when you need absolute reliability of "what was said recently" with no loss on compression and no hallucinations about the recent context.
---

# Layer 0.5 — Rolling Message Log

The lowest-level and most reliable layer. A checkpoint (L2) is a summary — the agent itself decides what matters and sometimes gets it wrong. The rolling log writes **every message verbatim**, without filtering or compression.

## Two files
- `Sessions/messages/YYYY-MM-DD.md` — a full archive by day, grows forever, nothing is deleted.
- `Sessions/recent-messages.md` — a rolling window of the last 20 pairs; this is what gets injected into a new session.

## Format
```
[YYYY-MM-DD HH:MM] User: text (up to 500 characters)
[YYYY-MM-DD HH:MM] Agent: reply (up to 500 characters)
```

## Write order (critical for reliability)
1. The user wrote → IMMEDIATELY write the `User:` line to the daily file (BEFORE processing — it survives any crash/restart).
2. The agent processes.
3. After a successful reply — write the `Agent:` line.
4. Recompute `recent-messages.md` (the last 20 pairs = 40 lines).

## Rules
- Don't log: errors/timeouts/interrupted replies, messages with API keys/secrets.
- Inject `recent-messages.md` only at the start of a NEW session (after /newchat/restart/pause); in a continuing session the conversation is already in context.
- Injection order: `[Memory]` → `[Previous session]` → `[Recent Messages]` → the user's message.

## Implementation
Requires FS access from the agent's code (a hook/script in Node/Python: `logUserMessage` before processing, `logAgentResponse` + recompute after the reply). Daily files are small (text) — keep forever, archive after 90 days if desired.
