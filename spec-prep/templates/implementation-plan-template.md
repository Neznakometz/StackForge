# IMPLEMENTATION_PLAN: <name>

Phases in order. Each is closed by acceptance criteria (the contract with `/phase-check`).
Executed via the `task-loop` skill (`/next-task`).

## Phase 0 — Foundation
**Tasks:** repo skeleton, CI, base conventions (via `/init` for the stack).
**Acceptance criteria:**
- [ ] <verifiable: command/test/instruction> — <expected result>

## Phase 1 — <name>
**Tasks:**
1. <task, 5–15 min, with file paths>
2. <...>
**Acceptance criteria:**
- [ ] when <X>, <Y> happens (how to verify: <...>)
- [ ] <...>

## Phase 2 — <...>
...

---

Rules:
- A task larger than ~30 min — break it into subtasks in `PROGRESS.md`.
- Every `SPECIFICATION` requirement is covered by at least one acceptance criterion.
- A criterion with no way to verify it is not a criterion.
