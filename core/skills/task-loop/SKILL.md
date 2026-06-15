---
name: task-loop
description: The main development work loop — subagent-driven development. Apply for ANY task from the implementation plan.
---

# Task execution loop (subagent-driven)

The orchestrator (main session) does NOT write code itself — it dispatches subagents and keeps the context small.

1. **Task selection.** Open `PROGRESS.md` (keep it short!), take the next unfinished task of the current phase from the implementation plan. If a task is larger than ~30 min — break it into 5–15 min subtasks with exact file paths, keep the list in PROGRESS.md.
2. **Dispatch.** Launch the `implementer` agent with a FRESH context: the full subtask text + exact references to document sections. Don't retell it the history.
3. **Review:** `spec-reviewer` (conformance to the task) → APPROVE → `code-reviewer` (quality); for UI tasks — additionally `design-reviewer`. Then a **mandatory cross-model review** (an external "second brain", the `cross-model-review` skill). A REJECT from any reviewer → return to the implementer ONLY the list of findings (not the whole dialog); pre-filter the external models' findings (discard false positives). Maximum 2 fix cycles, then escalate to the user.
4. **Verification.** `test-runner`: module tests + lint + typecheck. A full repo run — only at the end of the phase.
5. **Recording (memory).** The commit is made by the implementer. Update PROGRESS.md (1 line: task, status, commit). A non-trivial decision → ADR in `docs/decisions/`. The same review finding ≥2 times → propose to the user adding a rule to CLAUDE.md/a pack (don't edit it yourself). Don't edit the spec and the plan.
6. **End of phase:** `/phase-check` — full test run, `security-auditor` on the phase diff, **adversarial review of the whole phase** (cross-model-review over the phase diff), check the acceptance criteria against the checklist, STOP — show the user; don't start the next phase without confirmation.

Antipatterns: several tasks in a single implementer call; fixing review findings in the orchestrator's context; skipping spec-review or cross-review "because the task is simple".
