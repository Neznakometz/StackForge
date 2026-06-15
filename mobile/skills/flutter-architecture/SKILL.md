---
name: flutter-architecture
description: Архитектура и стейт-менеджмент Flutter-приложения на Riverpod 3. Применять при создании фич, экранов, провайдеров, репозиториев и при любом вопросе «куда положить логику» во Flutter-проекте.
---

# Flutter + Riverpod 3 — архитектура

Опирается на официальный гайд Flutter (layered + MVVM) и доки Riverpod 3.
Детали правил — knowledge-пак `flutter-riverpod` (подгружен в CLAUDE.md при `/init`).

## Слои

- **UI:** `View` (виджеты, ноль бизнес-логики) + `ViewModel` (= `Notifier`/`AsyncNotifier`-провайдер, один на фичу/экран).
- **Data:** `Repository` (single source of truth, доменные модели, кэш/ретрай) + `Service` (обёртка одного источника, без состояния).
- **Domain (опц.):** use-cases — только когда логика объединяет несколько репозиториев или переиспользуется.
- Структура feature-first: `lib/features/<feature>/` = view + viewmodel + репозитории; общее в `lib/core/`, данные в `lib/data/`.

## Стейт (строго)

- Провайдеры — `@riverpod` кодоген. Стейт-холдеры — `Notifier`/`AsyncNotifier`. `StateProvider`/`StateNotifier` не использовать (legacy).
- `ref.watch` в `build`; `ref.read` в колбэках; `ref.listen` для side-effect'ов. Оптимизация ребилдов — `select()`, не `read`.
- autoDispose по умолчанию (кодоген). Долгоживущее — `@Riverpod(keepAlive: true)`.
- Async — через `AsyncValue` + `AsyncValue.guard`; UI разбирает sealed `switch` (data/error/loading). После `await` — `ref.mounted`.
- Состояние — Freezed-классы (immutable, `copyWith`).

## Чек перед кодом

1. Где логика? UI → ViewModel(Notifier); данные → Repository; источник → Service.
2. Провайдер с параметрами — без `family`, параметры напрямую, `==` консистентен.
3. Виджет не лезет в данные напрямую — только через провайдер ViewModel.
4. Прогон заборов: `dart analyze` (riverpod_lint), `dart format`. См. скил `flutter-testing` для тестов.
