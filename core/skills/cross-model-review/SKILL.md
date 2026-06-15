---
name: cross-model-review
description: Mandatory re-check of the code by an external model (Codex/ChatGPT and/or Gemini) acting as an independent reviewer. Apply on every task after the internal reviewers and on the diff at the end of a phase.
---

# Cross-model review (external "second brain")

Claude writes → an external model attacks → Claude arbitrates. An asymmetry of roles, not "merge N answers". Cheap (one extra call per task), catches what a single model doesn't see.

## Mechanics

The orchestrator calls the external CLI directly via `Bash` (authentication is active beforehand). The plugins' own slash commands (`/codex:*`) are triggered only by the user.

**Codex (ChatGPT):**
- `codex review --commit <SHA>` — a single commit (a task);
- `codex review --base <ref>` — diff from ref to HEAD (a whole phase / several commits);
- `codex review --uncommitted` — the working tree.
- IMPORTANT: `--commit/--base` do NOT accept a text prompt. Custom instructions — only without a scope flag: `codex review "<instructions>"` (over the working tree).

**Gemini (optional, second model):** the `gemini` CLI in the same manner — pass it the diff and the review instruction. Enable it when a second independent point of view is needed (high-risk changes).

## Arbitration (the key part)

The external model's output is the recommendations of a THIRD-PARTY reviewer, not the truth:
- a real finding → return it to the `implementer` as a finding (file:line);
- noise/false positive → discard with a note (just like with `code-reviewer`);
- artifacts of the external tool's sandbox (for example, a build failure due to write permissions) — not a code defect.

Don't forward the external model's whole output into the main context — only the selected findings.

## When mandatory

- Every task — after `spec-reviewer` + `code-reviewer`, before `test-runner`.
- End of phase — adversarial review of the whole phase diff (`--base <phase-start>`).
- Technical/destructive changes (auth, money, migrations, concurrency) — mandatory, both models allowed.
