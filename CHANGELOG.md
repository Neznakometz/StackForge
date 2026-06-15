# Changelog

Формат — [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/), версии по semver.

## [Unreleased]

### Added
- Скелет маркетплейса и плагина `core` (`.claude-plugin/`).
- Стек-осознанный `/init`: мультивыбор тип+стек, сборка `CLAUDE.md` из паков.
- Библиотека knowledge-паков: формат, шаблон `_template/`, `registry.json`
  (13 паков под стек пользователя в статусе `planned`).
- Механизм расширения: `/add-stack` — новый пак, заземлённый на доки.
- Механизм обновления: `/update-knowledge` — сверка паков с доками, semver,
  политика устаревания (90 дней / новая версия таргета).
- GitHub-обвязка: LICENSE (MIT), CONTRIBUTING, .gitignore, этот файл.
- Ядро наполнено:
  - 7 агентов (implementer, spec/code/design-reviewer, security-auditor, test-runner, scout);
  - 7 скилов (task-loop, cross-model-review, tdd, contracts, token-economy, memory, prompt-audit);
  - команды next-task, phase-check, checkpoint;
  - hooks (session-start, pre-compact), шаблон settings.json.
- README оформлен (бейджи, таблицы, секции).
- Доменный плагин **mobile** (Flutter+Riverpod): пак `flutter-riverpod` (ready), 5 скилов, 3 агента, hooks (dart format/analyze), скил `unity-to-flutter` с шаблонами.
- Доменные плагины **spec-prep** (idea→спека + 4 шаблона), **saas** (api-design/background-jobs/multitenancy), **ui** (ui-architecture/design-system/web-a11y), **games** (game-design/engine-setup + game-designer), **analytics** (fusion/report-builder).
- Все 7 плагинов зарегистрированы в marketplace.json.

### Planned
- Наполнение knowledge-паков (backend/frontend/devops) — батчами, из доков (12 в статусе planned).
- Опц. L3 durable-память (SQLite), path-scoped rules как hook.
