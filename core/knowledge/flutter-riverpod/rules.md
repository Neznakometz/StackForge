# Flutter + Riverpod 3 — rules
> Targets: Flutter 3.4x / Dart 3.x · Riverpod 3.x + Freezed · riverpod_lint 3.1.x
> Source: official docs (flutter.dev, dart.dev, riverpod.dev) · Updated: 2026-06-15

## State (Riverpod 3)
- Codegen is mandatory: providers via `@riverpod` (`riverpod_generator`). The stack already uses Freezed → build_runner is present anyway, this is the recommended path.
- State holders — only `Notifier` / `AsyncNotifier`. `StateProvider`/`StateNotifier`/`ChangeNotifier` — legacy (moved to `package:riverpod/legacy.dart`); any use = a smell.
- `ref.watch` — in `build` (declaratively). `ref.read` — in handlers (onPressed, initState). `ref.listen` — for imperative side effects. Do NOT swap `watch` for `read` "for optimization" — that's a bug; to optimize rebuilds use `select()`.
- autoDispose with codegen — by default. Long-lived — explicitly `@Riverpod(keepAlive: true)`. A provider with parameters — keep it autoDispose (otherwise a state leak per combination).
- `family` isn't needed with codegen — parameters are passed directly; parameters require a consistent `==` (no list/map literals).
- `AsyncValue` is sealed → an exhaustive `switch` (AsyncData/AsyncError/AsyncLoading, no default). Wrap async work in `AsyncValue.guard`. After `await` in a Notifier check `ref.mounted`.

## Architecture (official: layered + MVVM)
- Two layers: **UI** (View + ViewModel) and **Data** (Repository + Service); Domain (use-cases) — only when logic combines several repositories or is reused.
- **View** — only widgets, zero business logic (allowed: show/hide, animation, size-based layout). It gets all data from the ViewModel.
- **ViewModel** ≈ an `(Async)Notifier` provider; one per feature/screen; holds UI state, exposes command callbacks.
- **Repository** — the single source of truth per data type, returns domain models, cache/retry/refresh; repositories don't know about each other. **Service** — a wrapper for a single source (REST/platform/file), stateless. Repo/Service are injected via `ref`, mocked with overrides in tests.
- Structure — feature-first: a feature = View + ViewModel + its repositories.

## Tooling guardrails (mandatory)
- `riverpod_lint` 3.x is wired via `plugins:` in `analysis_options.yaml`, surfaced through `dart analyze`. Key rules: `missing_provider_scope`, `avoid_build_context_in_providers`, `avoid_public_notifier_properties`, `avoid_ref_inside_state_dispose`, `provider_parameters`, `notifier_extends`, `protected_notifier_properties`.
- Lint set: `include: package:flutter_lints/flutter.yaml`. Enforce: `avoid_print`, `directives_ordering`, `prefer_const`, typed exports (no `dynamic` leakage).
- Blocking format gate: `dart format -o none --set-exit-if-changed .`. Auto-fixes: `dart fix --apply` (after commit).

## Path-scoped
- `lib/features/**` → one View + one ViewModel(Notifier) per feature; zero business logic in widgets.
- `lib/data/**` → repositories and services; repositories don't import each other; secrets only via `flutter_secure_storage`.
- `lib/core/**` → shared providers/utilities, a stable API.

## Anti-patterns (catch in review)
- `StateProvider`/`StateNotifier` → replace with Notifier/AsyncNotifier.
- `ref.read` in `build` → `ref.watch`. `ref` in `dispose` → forbidden (`avoid_ref_inside_state_dispose`).
- Public fields/getters on a Notifier → only `.state` (`avoid_public_notifier_properties`).
- `BuildContext` inside a provider → forbidden.
- Mocking the Notifier itself → instead mock the repository it uses.
- Secrets in code/`SharedPreferences`/logs → `flutter_secure_storage` + `--dart-define`.

## Generated files — exclude from analysis
`**/*.g.dart`, `**/*.freezed.dart`, `**/*.mocks.dart` in `analyzer.exclude`.

## Conflicts with
- `flutter-bloc` (an alternative state management — can't coexist in one project).
