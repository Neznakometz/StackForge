---
name: tdd
description: The mandatory order for writing code with tests. Apply whenever writing business logic.
---

# TDD: red → green → refactor

1. Write a test that expresses the task's requirement. Run it — it MUST fail (didn't fail → the test checks nothing, rewrite it).
2. Minimal code until green. Don't implement "for the future" (YAGNI).
3. Refactor while the tests are green. Commit.

Rules:
- External providers (API, payments, ASR/LLM) — only mocks in tests; real keys in tests = a mistake.
- Test behavior, not implementation: reliance on private fields/the call order of mocks is brittleness.
- Edge cases from the acceptance criteria: empty input, zero values, network drop, exhausted limit, timeout.
- No `sleep` in tests — fake timers / explicit awaits.
- e2e — only for the phase's critical flows (listed in the acceptance criteria), everything else — with unit tests: e2e is expensive and slow.
