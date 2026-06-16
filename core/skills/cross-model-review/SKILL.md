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

## Fallback — review still happens with zero external setup

If NEITHER `codex` nor `gemini` CLI is available (check once: `command -v codex || command -v gemini`), do **not** skip review. Fall back to a **fresh Claude subagent** as the external reviewer — a different model from the implementer where possible (e.g. implementer on sonnet → reviewer on opus), with a clean, narrow context (diff + task text only, no dialog history). This is "fusion-lite": the diversity is by role and model size, not vendor, but the adversarial second-pass is preserved. External CLIs are an upgrade, not a prerequisite — review is never skipped.

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
