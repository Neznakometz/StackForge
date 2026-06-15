---
description: Check the current phase's acceptance criteria before closing it.
---

Closing a phase:

1. Determine the current phase from `PROGRESS.md`; write out its acceptance criteria from the implementation plan VERBATIM.
2. Run `test-runner`: a full run of the project's quality commands (lint, typecheck, unit, e2e if the phase requires it).
3. Run `security-auditor` on the phase diff.
4. Run `cross-model-review` (adversarial) on the whole phase diff (`--base <phase-start>`).
5. For each acceptance criterion — verify it FACTUALLY (a command/test/manual instruction), not "from memory". Table: criterion → how verified → PASS/FAIL.
6. On any FAIL — the phase isn't closed: create fix tasks in PROGRESS.md.
7. All PASS → mark the phase done in PROGRESS.md and STOP: the next phase is started by the user.
