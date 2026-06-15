---
name: flutter-testing
description: Тестирование Flutter + Riverpod 3 — unit/widget/golden, ProviderContainer.test, override провайдеров, mocktail. Применять при написании или ревью тестов во Flutter-проекте.
---

# Flutter + Riverpod 3 — тестирование

## Тиры
- unit (`package:test`, без Flutter) → widget (`testWidgets`, `flutter_test`) → integration (`integration_test`, девайс/эмулятор).
- e2e/integration — только критические флоу; остальное юнитами (см. core-скил `tdd`).

## Riverpod
- `ProviderContainer.test()` (v3, авто-dispose в конце). НЕ шарь контейнер между тестами.
- Значение: `container.read(provider)`; для autoDispose — `container.listen(...)`, читать через подписку.
- Async: `await expectLater(container.read(provider.future), completion(...))`.
- Widget: `ProviderScope` в корне `pumpWidget`, контейнер — `tester.container()`.

## Override (всё мокается без настройки)
- `provider.overrideWith((ref) => fake)`;
- `notifierProvider.overrideWithBuild((ref, self) => state)` — мокнуть только `build`, методы настоящие;
- `futureProvider.overrideWithValue(AsyncValue.data(x))`.

## Моки
- **mocktail** (без кодогена) — дефолт. Мокай **репозиторий**, который использует Notifier, а не сам Notifier.
- Golden: `matchesGoldenFile('name.png')`, обновление `flutter test --update-goldens`. Гоняй на едином CI-образе (golden'ы чувствительны к платформе/шрифтам/версии).

## Доступность в тестах
`meetsGuideline(textContrastGuideline)`, `androidTapTargetGuideline`/`iOSTapTargetGuideline`, `labeledTapTargetGuideline` — enforce контраст и размер тап-таргета (48×48 Android / 44×44 iOS).
