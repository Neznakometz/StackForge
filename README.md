<div align="center">

# ⚙️ Claud Framework

### **Тонкое ядро + доменные наборы для быстрого, стек-осознанного старта проектов в Claude Code**

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
  <img src="https://img.shields.io/badge/built%20for-Claude%20Code-CC785C" alt="Built for Claude Code">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>

<p align="center">
  <a href="#-установка">Установка</a> •
  <a href="#-ядро">Ядро</a> •
  <a href="#-стек-осознанный-init">/init</a> •
  <a href="#-наборы">Наборы</a> •
  <a href="#-расширение-и-обновление">Расширение</a>
</p>

</div>

---

<div align="center">

## 📊 Состав

| **Наборы** | **Агенты** | **Скилы ядра** | **Команды** | **Knowledge-паки** |
|:----------:|:----------:|:--------------:|:-----------:|:------------------:|
| **7** | **7** | **7** | **6** | **13** |

</div>

---

## 🎯 Идея

Разворачивать новый проект **одной командой**, со стек-осознанной настройкой, без
ручной установки скилов каждый раз. Тонкое **ядро** ставится всегда; `/init`
спрашивает стек и собирает `CLAUDE.md` под него из knowledge-паков; **доменный
набор** добавляет специализацию.

```
/plugin install core  →  /init (спросит стек)  →  /plugin install <домен>
        │                       │                          │
   capability             стек-осознанный             доменные
 (агенты/скилы/           скаффолд проекта            скилы/агенты
  команды/hooks)         (CLAUDE.md под стек)
```

Принцип взят из проверенного сетапа (subagent-driven цикл с кросс-модельным
ревью) и обобщён под любой стек.

---

## ⚡ Установка

```bash
# зарегистрировать маркетплейс
/plugin marketplace add <owner>/Claud_Framework
# поставить ядро
/plugin install core@claud-framework
# развернуть среду под проект (спросит стек)
/init
# добавить доменный набор
/plugin install mobile@claud-framework
```

---

## 🧠 Ядро

<table>
<tr>
<td width="50%">

### 🔄 Процесс (task-loop)
Subagent-driven цикл: `implementer` → `spec-reviewer` →
`code-reviewer` (+`design-reviewer` для UI) →
**кросс-модельное ревью** → `test-runner`.
Конец фазы — `phase-check` + `security-auditor` +
adversarial-review.

</td>
<td width="50%">

### 🤖 Кросс-модельное ревью
Claude пишет → **Codex/Gemini** атакует → Claude
арбитрирует. Внешний «второй мозг» через CLI,
обязателен на каждой задаче. Асимметрия ролей,
а не «смержить N ответов».

</td>
</tr>
<tr>
<td width="50%">

### 💾 Память
L1 (контекст: `/compact`, `/convolife`) +
L2 (чекпоинты: `/checkpoint`, авто каждые 10 tool-calls).
L3 (durable/SQLite) — опционально.
Hooks подгружают PROGRESS+checkpoint при старте.

</td>
<td width="50%">

### 🪙 Экономия токенов
Дисциплина чтения/генерации/сессий + опц. плагины
`ponytail-safe`, `ponytail-terse`, `codegraph-nav`,
`bash-output-compression` — 4 разные статьи расхода.

</td>
</tr>
</table>

**Агенты:** implementer · spec-reviewer · code-reviewer · design-reviewer · security-auditor · test-runner · scout
**Скилы:** task-loop · cross-model-review · tdd · contracts · token-economy · memory · prompt-audit
**Команды:** init · next-task · phase-check · checkpoint · add-stack · update-knowledge

---

## 🎛 Стек-осознанный /init

`/init` делает проект «умным» под конкретный стек:

1. Определяет greenfield / brownfield (сканирует `package.json`/`pubspec.yaml`/…).
2. Спрашивает **(мультивыбор)**: тип проекта + компоненты стека. Есть пресет «наш стек».
3. Собирает `CLAUDE.md` из выбранных **knowledge-паков** (правила из официальных доков → низкий риск галлюцинаций).
4. Скаффолдит память (PROGRESS.md), конституцию, структуру спеки, безопасные permissions.
5. Активирует доменные скилы под выбор.

> При конфликте паков (например `React ⊥ Vue`, `Riverpod ⊥ Bloc`) `/init` не склеит противоречия — спросит, какой оставить.

---

## 📦 Наборы

| Набор | Назначение | Статус |
|-------|-----------|:------:|
| **core** | Ядро: процесс, ревью, память, экономия токенов, /init | ✅ |
| **mobile** | Flutter + Riverpod (+ Unity→Flutter миграция) | ✅ |
| **spec-prep** | idea → SPECIFICATION / DESIGN_SPEC / IMPLEMENTATION_PLAN | ✅ |
| **saas** | бэкенд/веб: api-design, background-jobs, multitenancy | ✅ |
| **ui** | дизайн интерфейсов: ui-architecture, design-system, a11y | ✅ |
| **games** | геймдев: GDD, выбор движка, game-designer | ✅ |
| **analytics** | research/аналитика: fusion, report-builder | ✅ |

### 📱 Mobile — зафиксировано

Flutter + **Riverpod 3** (`@riverpod` + Freezed). Слабость Riverpod (свобода
структуры → дрейф агента) закрыта тулингом: `riverpod_lint` в блокирующем
analyze-hook, `dart-lsp` инлайн-диагностика, жёсткие конвенции, path-scoped rules.
Берём агностичное из VGV (hooks, security, a11y, testing) + правила evanca.
Пишем сами: Unity→Flutter миграция, flutter-release.

---

## 🧩 Расширение и обновление

**Расширить стек** — `/add-stack <технология>`: заземляет правила на официальные
доки, создаёт пак, регистрирует в `registry.json`.

**Обновить компоненты** — два контура:
- код (агенты/скилы/команды) → `/plugin update` (штатно, маркетплейс);
- знания (паки) → `/update-knowledge [id|all]`: сверка с доками, semver,
  `last_verified`, устаревание 90 дней / новая версия таргета.

Единый источник правды — `core/knowledge/registry.json`. Подробности — [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 🗺 Структура

```
Claud_Framework/
├── .claude-plugin/marketplace.json
├── core/
│   ├── .claude-plugin/plugin.json
│   ├── agents/      7 субагентов
│   ├── skills/      task-loop · cross-model-review · tdd · contracts · …
│   ├── commands/    init · next-task · phase-check · checkpoint · add-stack · …
│   ├── hooks/       session-start · pre-compact
│   ├── knowledge/   registry.json · _template/ · паки
│   └── templates/   settings.json
└── LICENSE · CONTRIBUTING · CHANGELOG · README
```

---

## 🛣 Дальше

- Наполнить knowledge-паки из доков (backend/frontend/devops) батчами.
- Собрать доменные плагины: spec-prep, saas, ui, games, mobile, analytics.

---

<div align="center">
<sub>MIT · сделано для Claude Code</sub>
</div>
