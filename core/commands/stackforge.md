---
description: Show StackForge status — installed sets/skills/agents, the project's stack, and what's available to add.
---

# /stackforge — status & what's available

Give the user a short, scannable status of StackForge in this project. Don't do work — just report.

1. **Installed.** List the StackForge plugins/sets active here (check installed plugins / `.claude/`). For each, name its key skills, agents, and commands.
2. **Project stack.** Read the project's `AGENTS.md` (and `CLAUDE.md` import) if present — report the fixed stack, which knowledge packs are loaded, and the memory depth.
3. **Available to add.** From the marketplace, list domain sets NOT yet installed (`spec-prep`, `saas`, `ui`, `mobile`, `games`, `analytics`, `storage`) with the one-line install command for each (`/plugin install <set>@stackforge`).
4. **Knowledge packs.** From `core/knowledge/registry.json`, summarize ready packs by category; note any flagged stale (`/update-knowledge`).
5. **Next steps.** If no stack is set up yet → suggest `/init`. If a spec is missing → suggest `spec-prep`. Otherwise → `/next-task`.

Keep it ≤25 lines, grouped with short headers. Verify by reading the actual files/registry, don't report from memory.
