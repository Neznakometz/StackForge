---
name: flutter-testing
description: Testing Flutter + Riverpod 3 — unit/widget/golden, ProviderContainer.test, provider overrides, mocktail. Apply when writing or reviewing tests in a Flutter project.
---

# Flutter + Riverpod 3 — testing

## Tiers
- unit (`package:test`, no Flutter) → widget (`testWidgets`, `flutter_test`) → integration (`integration_test`, device/emulator).
- e2e/integration — only critical flows; everything else with unit tests (see the core skill `tdd`).

## Riverpod
- `ProviderContainer.test()` (v3, auto-disposes at the end). Do NOT share a container between tests.
- Value: `container.read(provider)`; for autoDispose — `container.listen(...)`, read through the subscription.
- Async: `await expectLater(container.read(provider.future), completion(...))`.
- Widget: `ProviderScope` at the root of `pumpWidget`, container — `tester.container()`.

## Override (everything is mockable with no setup)
- `provider.overrideWith((ref) => fake)`;
- `notifierProvider.overrideWithBuild((ref, self) => state)` — mock only `build`, real methods;
- `futureProvider.overrideWithValue(AsyncValue.data(x))`.

## Mocks
- **mocktail** (no codegen) — default. Mock the **repository** that the Notifier uses, not the Notifier itself.
- Golden: `matchesGoldenFile('name.png')`, update with `flutter test --update-goldens`. Run on a single CI image (goldens are sensitive to platform/fonts/version).

## Accessibility in tests
`meetsGuideline(textContrastGuideline)`, `androidTapTargetGuideline`/`iOSTapTargetGuideline`, `labeledTapTargetGuideline` — enforce contrast and tap-target size (48×48 Android / 44×44 iOS).
