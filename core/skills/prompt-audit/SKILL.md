---
name: prompt-audit
description: Audit of the system prompt/CLAUDE.md against 12 criteria with a concrete improvement plan. Apply to check the quality of your own sets and the project's CLAUDE.md.
---

# Prompt audit (CLAUDE.md / AGENTS.md)

Rate the file against 12 criteria (1–10 each), for each: what's good / what's missing.

1. **Agent identity** — who, for whom, the launch context.
2. **Owner profile** — stack, language, the main value criterion.
3. **Anti-cliché** — an explicit list of forbidden phrases/behaviors (specifics > "don't ramble").
4. **Routing** — rules for choosing the model/tool/subagent by task type (triggers).
5. **Result verification** — a requirement to physically check (ls/cat/grep after writing).
6. **Memory and context** — when to /compact, how to write to memory, the expiration policy.
7. **Safety/autonomy** — Autonomy Matrix: what's done autonomously, what via confirmation.
8. **SOP** — step-by-step algorithms for frequent tasks (with paths and formats).
9. **Learned Patterns** — a mechanism for recording lessons from real sessions.
10. **Maintainability** — separation of permanent and temporary, no duplicates/contradictions.
11. **Architectural decomposition (the most important)** — a thin core + delegation (subagents/skills/specs by trigger), lazy loading of context.
12. **File Edit Policy** — read before editing, replace/patch instead of overwrite, stop on mismatch.

Output: a table of scores (X/120) → the top 3 weakest criteria with ready-to-paste markdown blocks → a verdict (beginner/working/advanced/production-ready). Rate by operational usefulness, not length: a short file with delegation > a long one with everything inside.
