---
name: unity-to-flutter
description: Migrating an app from Unity (C#) to Flutter. Apply when porting an existing Unity project to Flutter — audit, specs, implementation, parity QA, data migration. We port BEHAVIOUR, not code.
---

# Unity → Flutter migration

A methodology generalized from a real project. Target stack — `flutter-riverpod`.

## Principle: migration = porting BEHAVIOUR, not code

Unity code is NOT ported line by line. C# is read as **documentation of actual behaviour** (logic, edge cases, progression formulas, animation timings); a spec is extracted from it; Flutter is written from scratch against the spec. Cheaper, cleaner, removes the tech debt.

## Source-of-truth hierarchy (on conflict, the higher one wins)

1. **Figma** — how it should look.
2. **Product docs / feature list** — how it should work (target behaviour).
3. **Unity code** — how it works now (actual logic, edge cases).
4. **Vision** — where we are heading (affects interfaces/contracts, not the v1 scope).

The agent does NOT resolve source conflicts itself → a `⚠️ CONFLICT` block in the artifact + escalation to the owner. No data in the sources → a question, not a guess ("do not invent behaviour").

## Phases and gates

- **Ph0 — Inputs.** Close the checklist (Unity repo as a filesystem + version/packages, reference iOS/Android build, 15–30-min playthrough screencast, Figma access + `[ACTUAL]`/`[ARCHIVE]` tagging, feature list, user-data schema, store accounts). Without closing Ph0 the agents work blind.
- **Ph1 — Audit and foundation.** `unity-auditor` → module inventory + behaviour specs + asset map + data schema. Design extract → tokens + screen specs. Architect → repo skeleton (feature-first, Riverpod, go_router, i18n, analytics, CI) + design system + ADR. **Ph1 gate (the main scope cut):** for each module the owner decides `port / simplify / drop / deferred`.
- **Ph2 — Vertical slice.** One end-to-end path through the entire pipeline (spec→code→QA) on real devices. Gate: the slice is green, the owner went through it by hand. If the pipeline does not work — fix the process, do not scale up.
- **Ph3 — Module conveyor.** Per-module cycle: spec → owner review → code + art → parity QA → merge. Order: from foundational to peripheral. WIP limit ≤2 modules.
- **Ph4 — Data and release.** Migrating local data/progress/purchases (do NOT lose users), restoring purchases through the stores, beta → gradual rollout (10→50→100%) with a rollback to Unity as a fallback. Gate: crash-free ≥99.5%, retention no worse than the old version.

## Team (on top of the core agents)

The core already provides: `implementer` (= Flutter developer), `spec-reviewer`, `code-reviewer`, `cross-model-review`. The set adds migration-specific roles: `unity-auditor` (Unity-code archaeology) and `qa-parity` (parity with the reference build). The architect/spec writer is the `implementer`/orchestrator with the appropriate context pack.

## Paradigm mapping

| Unity | Flutter + Riverpod |
|-------|--------------------|
| Scene / GameObject / Prefab | widget tree / reusable Widgets |
| MonoBehaviour `Update()` | declarative rebuild; animations — `AnimationController`/`Ticker` |
| MonoBehaviour fields (state) | `Notifier`/`AsyncNotifier` + Freezed |
| Singleton managers | providers (`@riverpod`, `keepAlive` where needed) |
| ScriptableObject (data) | domain models + Repository |
| Coroutines / `IEnumerator` | `async`/`await`, `Stream`, `Future` |
| PlayerPrefs | `shared_preferences` / `flutter_secure_storage` (secrets) |
| Real game loop/physics | Flutter + Flame; menus/logic still on Riverpod |

## Module Definition of Done

1. Spec approved by the owner (source conflicts resolved).
2. Lint + unit tests for the logic + goldens for key screens are green.
3. Parity checklist closed (behaviour = spec, visuals = Figma within tolerances).
4. Module data/content — per contract, not hardcoded (if applicable).
5. Analytics wired up; i18n complete, no hardcoded strings.

Templates — in `templates/`: `module-spec-template.md`, `parity-checklist.md`.

> If the app is for children/regulated (COPPA/GDPR-K) — add the inviolable rules: a parental gate before leaving the kids' space, zero child PII in logs/analytics, server-driven content. This is a domain overlay, not part of the general migration.
