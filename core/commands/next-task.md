---
description: Take the next task from the plan and run the full loop (implementer → review → cross-model review → tests → recording).
---

Execute the next unfinished task of the current phase per the `task-loop` skill:

1. Read `PROGRESS.md`, determine the current phase and the next task from the implementation plan.
2. If the task is large — break it into 5–15 min subtasks and record the breakdown in PROGRESS.md.
3. Run the loop: `implementer` → `spec-reviewer` → `code-reviewer` (+`design-reviewer` for UI) → `cross-model-review` → `test-runner`.
4. Update PROGRESS.md and show a brief summary (≤10 lines).

If the task requires a decision not described in the documents — stop and ask, don't invent options.
