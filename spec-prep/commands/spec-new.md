---
description: Turn an idea into an approved project spec (SPECIFICATION + DESIGN_SPEC + IMPLEMENTATION_PLAN) before any code.
argument-hint: <short description of the idea>
---

# /spec-new — idea → spec

Runs ONCE at the start of the project, before code. The goal — a correct spec as the foundation, so you don't have to redo it later. Do NOT write code.

## Steps

1. **Brainstorm** (the `spec-writing` skill → questions section). Draw the spec out of the idea `$ARGUMENTS` through dialogue: for whom, which problem we're solving, the main value criterion, what's out of scope (anti-scope). In chunks, let it be confirmed.
2. **Constitution.** Create `constitution.md` from the template: principles (quality, tests, UX, performance), inviolable project rules, hierarchy of sources of truth.
3. **Specify.** Fill in `SPECIFICATION.md` from the template: what we're building and why, functional requirements (FR-*), entities/data, API (if any), without tying to a stack at this step.
4. **Clarify.** Go through the under-specified spots with structured questions; record the answers in the "Clarifications" section. Don't move to the plan with unresolved conflicts — mark them `⚠️ CONFLICT`.
5. **Design** (if there's a UI). `DESIGN_SPEC.md`: tokens, screens, states (loading/empty/error), accessibility.
6. **Plan.** `IMPLEMENTATION_PLAN.md`: break it into phases; each phase — tasks + **verifiable acceptance criteria** ("when X, Y happens"). This is what `/phase-check` checks later.
7. **Analyze (checklist).** Run the spec like "unit tests for text": is every requirement unambiguous, measurable, with no gaps or contradictions? Run the `prompt-audit` skill on `CLAUDE.md` if it has already been assembled by `/init`.
8. **Verify.** `ls` the created files. Show the owner a summary + open questions. STOP — from here the domain set starts the code (`/next-task`).

Templates are in `templates/`. Don't invent requirements: no data — ask the owner, don't guess.
