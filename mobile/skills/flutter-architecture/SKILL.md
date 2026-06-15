---
name: flutter-architecture
description: Architecture and state management for a Flutter app on Riverpod 3. Apply when building features, screens, providers, repositories, and for any "where should this logic go" question in a Flutter project.
---

# Flutter + Riverpod 3 — architecture

Grounded in the official Flutter guide (layered + MVVM) and the Riverpod 3 docs.
Rule details — knowledge pack `flutter-riverpod` (loaded into CLAUDE.md at `/init`).

## Layers

- **UI:** `View` (widgets, zero business logic) + `ViewModel` (= `Notifier`/`AsyncNotifier` provider, one per feature/screen).
- **Data:** `Repository` (single source of truth, domain models, cache/retry) + `Service` (wrapper over a single source, stateless).
- **Domain (optional):** use-cases — only when the logic combines multiple repositories or is reused.
- Feature-first structure: `lib/features/<feature>/` = view + viewmodel + repositories; shared code in `lib/core/`, data in `lib/data/`.

## State (strict)

- Providers — `@riverpod` codegen. State holders — `Notifier`/`AsyncNotifier`. Do not use `StateProvider`/`StateNotifier` (legacy).
- `ref.watch` in `build`; `ref.read` in callbacks; `ref.listen` for side effects. Optimize rebuilds with `select()`, not `read`.
- autoDispose by default (codegen). Long-lived — `@Riverpod(keepAlive: true)`.
- Async — via `AsyncValue` + `AsyncValue.guard`; the UI handles a sealed `switch` (data/error/loading). After `await` — `ref.mounted`.
- State — Freezed classes (immutable, `copyWith`).

## Pre-code check

1. Where does the logic go? UI → ViewModel(Notifier); data → Repository; source → Service.
2. Provider with parameters — without `family`, parameters passed directly, `==` consistent.
3. The widget does not touch data directly — only through the ViewModel provider.
4. Run the gates: `dart analyze` (riverpod_lint), `dart format`. See the `flutter-testing` skill for tests.
