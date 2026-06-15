---
name: spec-writing
description: Writing a project specification from an idea — brainstorm, requirements, acceptance criteria. Apply when creating or editing SPECIFICATION/DESIGN_SPEC/IMPLEMENTATION_PLAN and when turning an idea into a spec.
---

# Writing a Spec

## Brainstorm (extract the spec from the idea)
Don't jump into requirements. With Socratic questions, draw out: for whom / which problem / the main value criterion / what's out of scope. Show it in chunks, let it be confirmed. Talk through alternatives — don't push the first one.

## Principles
- **What and why, not how.** The spec describes behavior and requirements, not the stack or the implementation (the stack comes later, in the plan/`/init`).
- **Verifiability.** Every requirement is measurable. "when X, Y happens", not "works correctly".
- **Anti-scope, explicitly.** What we are NOT doing — as a separate section; it guards against scope creep.
- **Don't paper over conflicts.** A contradiction between sources/requirements → an `⚠️ CONFLICT` block + a recommendation, escalation to the owner.
- **Don't invent.** No data — ask, don't guess.

## Artifact structure
- `SPECIFICATION.md` — product/requirements (FR-*), entities, API. Template `templates/specification-template.md`.
- `DESIGN_SPEC.md` — UI: tokens, screens, states, accessibility. Template `templates/design-spec-template.md`.
- `IMPLEMENTATION_PLAN.md` — phases + tasks + acceptance criteria. Template `templates/implementation-plan-template.md`.
- `constitution.md` — principles and inviolable rules. Template `templates/constitution-template.md`.

## Acceptance criteria (the most important part)
Each phase of the plan is closed by a checklist of verifiable criteria — this is the contract with `/phase-check`. A criterion with no way to verify it (command/test/manual instruction) is not a criterion.
