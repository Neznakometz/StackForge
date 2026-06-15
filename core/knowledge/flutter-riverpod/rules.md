# Flutter + Riverpod 3 — правила
> Targets: Flutter 3.4x / Dart 3.x · Riverpod 3.x + Freezed · riverpod_lint 3.1.x
> Источник: official docs (flutter.dev, dart.dev, riverpod.dev) · Обновлено: 2026-06-15

## Состояние (Riverpod 3)
- Кодоген обязателен: провайдеры через `@riverpod` (`riverpod_generator`). Стек уже на Freezed → build_runner и так есть, это рекомендованный путь.
- Стейт-холдеры — только `Notifier` / `AsyncNotifier`. `StateProvider`/`StateNotifier`/`ChangeNotifier` — legacy (переехали в `package:riverpod/legacy.dart`); любое использование = смелл.
- `ref.watch` — в `build` (декларативно). `ref.read` — в обработчиках (onPressed, initState). `ref.listen` — для императивных side-effect'ов. НЕ подменяй `watch` на `read` «для оптимизации» — это баг; для оптимизации ребилдов используй `select()`.
- autoDispose с кодогеном — по умолчанию. Долгоживущее — явно `@Riverpod(keepAlive: true)`. Провайдер с параметрами — оставляй autoDispose (иначе утечка состояний на каждую комбинацию).
- `family` не нужен с кодогеном — параметры передаются напрямую; у параметров обязателен консистентный `==` (никаких list/map-литералов).
- `AsyncValue` sealed → исчерпывающий `switch` (AsyncData/AsyncError/AsyncLoading, без default). Async-работу оборачивай в `AsyncValue.guard`. После `await` в Notifier проверяй `ref.mounted`.

## Архитектура (официальная: layered + MVVM)
- Два слоя: **UI** (View + ViewModel) и **Data** (Repository + Service); Domain (use-cases) — только когда логика объединяет несколько репозиториев или переиспользуется.
- **View** — только виджеты, ноль бизнес-логики (допустимо: show/hide, анимация, layout по размеру). Все данные получает от ViewModel.
- **ViewModel** ≈ `(Async)Notifier`-провайдер; один на фичу/экран; держит UI-состояние, отдаёт команды-колбэки.
- **Repository** — single source of truth по типу данных, отдаёт доменные модели, кэш/ретрай/рефреш; репозитории не знают друг о друге. **Service** — обёртка одного источника (REST/платформа/файл), без состояния. Repo/Service внедряются через `ref`, мокаются override'ами в тестах.
- Структура — feature-first: фича = View + ViewModel + её репозитории.

## Тулинг-заборы (обязательно)
- `riverpod_lint` 3.x подключается через `plugins:` в `analysis_options.yaml`, surfacing через `dart analyze`. Ключевые правила: `missing_provider_scope`, `avoid_build_context_in_providers`, `avoid_public_notifier_properties`, `avoid_ref_inside_state_dispose`, `provider_parameters`, `notifier_extends`, `protected_notifier_properties`.
- Линт-набор: `include: package:flutter_lints/flutter.yaml`. Enforce: `avoid_print`, `directives_ordering`, `prefer_const`, типизированные экспорты (без утечки `dynamic`).
- Блокирующий формат-гейт: `dart format -o none --set-exit-if-changed .`. Автофиксы: `dart fix --apply` (после коммита).

## Path-scoped
- `lib/features/**` → один View + один ViewModel(Notifier) на фичу; ноль бизнес-логики в виджетах.
- `lib/data/**` → репозитории и сервисы; репозитории не импортируют друг друга; секреты только через `flutter_secure_storage`.
- `lib/core/**` → общие провайдеры/утилиты, стабильное API.

## Анти-паттерны (ловить на ревью)
- `StateProvider`/`StateNotifier` → заменить на Notifier/AsyncNotifier.
- `ref.read` в `build` → `ref.watch`. `ref` в `dispose` → запрещено (`avoid_ref_inside_state_dispose`).
- Публичные поля/геттеры у Notifier → только `.state` (`avoid_public_notifier_properties`).
- `BuildContext` внутри провайдера → запрещено.
- Мок самого Notifier → вместо этого мокай репозиторий, который он использует.
- Секреты в коде/`SharedPreferences`/логах → `flutter_secure_storage` + `--dart-define`.

## Генерируемые файлы — исключить из анализа
`**/*.g.dart`, `**/*.freezed.dart`, `**/*.mocks.dart` в `analyzer.exclude`.

## Конфликтует с
- `flutter-bloc` (альтернативный стейт-менеджмент — нельзя в одном проекте).
