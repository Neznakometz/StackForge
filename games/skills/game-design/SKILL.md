---
name: game-design
description: Game design — GDD, game systems, balance, engagement loops. Apply when designing mechanics and systems and when creating/editing a game design document.
---

# Game design

## GDD (game design document)
For each system: goal, rules (precise, with formulas), inputs/outputs, states, economy/progression, edge cases. Balance parameters — as **data** (config), not magic numbers in code.

## Analysis frameworks
- **MDA** — Mechanics → Dynamics → Aesthetics: what the player does → what emerges from it → what experience.
- **Engagement loop** — challenge/skill balance (flow); progression that does not hook with dark patterns.
- **Audience** — who it is for (player types), what we are validating.

## Rules
- **Data, not code.** Balance, levels, rewards, economy — config/data; the designer edits it without a release.
- **Systems are isolated.** Gameplay does not touch the UI directly; shared rules — through interfaces.
- **Verifiability.** Every balance rule comes with a criterion ("when X the player gets Y") so that QA/`balance-check` can verify it.
- Scope is frozen: new mechanics → backlog, not into the current phase.
