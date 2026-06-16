<div align="center">

# ⚙️ StackForge

### **Разверни новый проект одной командой — стек-осознанная настройка, проверенный воркфлоу и кросс-модельное ревью. Создано для Claude Code, переносимо на Cursor · Codex · Gemini · Copilot.**

<p align="center">
  <a href="README.md">🇬🇧 English</a> •
  <b>🇷🇺 Русский</b> •
  <a href="README-fr.md">🇫🇷 Français</a> •
  <a href="README-de.md">🇩🇪 Deutsch</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.2.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
  <img src="https://img.shields.io/badge/built%20for-Claude%20Code-CC785C" alt="Built for Claude Code">
  <img src="https://img.shields.io/badge/cross--agent-SKILL.md-blue" alt="Cross-agent">
  <img src="https://img.shields.io/badge/knowledge%20packs-doc--grounded-brightgreen" alt="Doc-grounded">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>

<p align="center">
  <a href="#-зачем">Зачем</a> •
  <a href="#-установка">Установка</a> •
  <a href="#-ядро">Ядро</a> •
  <a href="#-безопасность">Безопасность</a> •
  <a href="#-наборы">Наборы</a> •
  <a href="#-стек-осознанный-init">/init</a> •
  <a href="#-расширение-и-обновление">Расширение</a>
</p>

</div>

---

<div align="center">

## 📊 Сводка

| **Наборы** | **Агенты** | **Скилы** | **Команды** | **Knowledge-паки** | **Хуки** |
|:--------:|:----------:|:----------:|:------------:|:-------------------:|:---------:|
| **8** | **12** | **32** | **10** | **13** | **5** |

<sub>Тонкое ядро + 7 доменных наборов · каждый knowledge-пак заземлён на официальные доки с датой верификации</sub>

</div>

---

## 🎯 Зачем

Каждый новый проект означает снова устанавливать скилы, снова писать правила, снова собирать процесс. StackForge делает это **одной командой**: тонкое **ядро** ставится всегда, `/init` спрашивает про твой стек и собирает под него `AGENTS.md` (кросс-агентный, с импортом `CLAUDE.md` для Claude Code), а **доменный набор** добавляет специализацию.

```
/plugin install core  →  /init (asks for the stack)  →  /plugin install <domain>
        │                        │                            │
   capability               AGENTS.md for the stack       domain
 (agents/skills/            from knowledge packs          skills/agents
  commands/hooks)
```

### Реальные выгоды

- **🤖 Кросс-модельное ревью.** Claude пишет → **Codex (ChatGPT) и Gemini** атакуют диф → Claude арбитрирует. Асимметрия ролей, а не «слить N ответов». Техника, проверенная на реальном проекте (MeetREC), вшита в каждый цикл задачи.
- **📚 Knowledge-паки из официальных доков.** 13 паков (PHP/Laravel, Django, NestJS, Postgres/MySQL, Redis, ES/ClickHouse, React, Vue/Nuxt, Tailwind, Docker/K8s, GitLab/Ansible, Grafana/Sentry, Flutter/Riverpod) — правила из first-party документации, с источниками и `last_verified`. Низкий риск галлюцинаций, а не блог-спам.
- **🎛 Стек-осознанный старт.** `/init` спрашивает про стек (мультивыбор) и собирает правила только под него; конфликтующие паки (React ⊥ Vue, Riverpod ⊥ Bloc) никогда не склеиваются вместе.
- **🪙 Экономия токенов на четырёх фронтах.** Дисциплина для чтения/генерации/сессий + опциональные плагины для кода, прозы, поиска и вывода команд.
- **🧠 Память между сессиями.** L1 (контекст) + L2 (чекпоинты, авто каждые 10 вызовов инструментов); хуки загружают PROGRESS + чекпоинт при старте.
- **🪶 Тонкое ядро + делегирование.** Ядро остаётся лёгким; доменно- и стек-специфичные вещи живут в плагинах и паках, загружаются лениво по триггеру.

---

## ⚡ Установка

```bash
# register the marketplace (from GitHub)
/plugin marketplace add Neznakometz/StackForge
# install the core
/plugin install core@stackforge
# set up the environment for the project (asks for the stack)
/init
# add a domain set
/plugin install saas@stackforge
```

**Маркетплейс неудобен в расширении VS Code?** Установи без него — клонируй и запусти
`bash scripts/install.sh /path/to/project` (копирует скилы/агентов/команды в `.claude/`).

**Другие агенты (Cursor · Codex · Gemini · Copilot · Windsurf):** скилы переносимы —
`npx skills add Neznakometz/StackForge`; положи `AGENTS.md` в корень репозитория для
методологии. Полный гайд + матрица переносимости: **[INSTALL.md](INSTALL.md)**.

---

## 🧠 Ядро

<table>
<tr>
<td width="50%">

### 🔄 Процесс (task-loop)
`implementer` → `spec-reviewer` →
`code-reviewer` (+`design-reviewer` для UI) →
**кросс-модельное ревью** → `test-runner`.
Конец фазы — `phase-check` + `security-auditor` +
adversarial-ревью.

</td>
<td width="50%">

### 🤖 Кросс-модельное ревью
Claude пишет → **Codex/Gemini** атакует → Claude
арбитрирует. Внешний «второй мозг» через CLI,
обязателен на каждой задаче.

</td>
</tr>
<tr>
<td width="50%">

### 💾 Память (L1+L2)
`/compact`, `/convolife`, `/checkpoint`,
авто-чекпоинт каждые 10 вызовов инструментов.
Хуки загружают контекст в начале сессии.

</td>
<td width="50%">

### 🪙 Экономия токенов
Дисциплина + опциональные плагины `ponytail-safe`,
`ponytail-terse`, `codegraph-nav`,
`bash-output-compression`.

</td>
</tr>
</table>

**Агенты (7):** implementer · spec-reviewer · code-reviewer · design-reviewer · security-auditor · test-runner · scout
**Скилы (7):** task-loop · cross-model-review · tdd · contracts · token-economy · memory · prompt-audit
**Команды:** init · next-task · phase-check · checkpoint · add-stack · update-knowledge

---

## 🛡 Безопасность

Многослойная, включена по умолчанию. Enforcement-хуки нативны для Claude Code; **правила переносятся на любой агент** через `AGENTS.md`.

- **Безопасные разрешения** *(Claude Code)* — `/init` создаёт `.claude/settings.json` с deny-списком (никаких чтений `.env`/секретов, никакого force-push, никакого `rm -rf /`, никаких `curl`/`wget`) плюс allow-список для build/test-команд стека. На Cursor/Codex/Gemini используй собственную систему разрешений этого агента; тот же замысел живёт в `AGENTS.md`.
- **`bash-guard`** *(хук Claude Code)* — хук `PreToolUse(Bash)`, который проверяет каждую shell-команду **до** того, как сработают правила разрешений, и блокирует деструктивные / сетевые / выполняющие произвольный код: `rm` для `/`·`~`, `git push --force`, `reset --hard`, `clean`, `sudo`, `chown`, пайпы `curl|sh`, произвольные `npx`/`dlx`/`bunx`. Он выражает исключения, которые deny-список не может — `rm -rf dist` проходит, `rm -rf /` блокируется — а `npx` в allow-списке для доверенного тулинга (`npx skills`/`shadcn`). Exit 2 = заблокировано (причина показана модели); fail-open при ошибке парсинга, чтобы агент никогда не заклинило.
- **Методология** *(любой агент)* — `AGENTS.md` несёт правила «никогда не запускай деструктивные/сетевые/произвольно-кодовые команды», так что агенты без системы хуков всё равно им следуют. Ревью запускают агента `security-auditor` + внешнее кросс-модельное ревью на дифе каждой фазы (любой агент с CLI `codex`/`gemini`).

> Эвристики, а не парсер шелла — защита от ошибок агента и грубых атак, а не граница ОС. Для жёсткой изоляции полагайся на **песочницу твоего агента** (Claude Code, Cursor и т. д.).

---

## 📦 Наборы

| Набор | Назначение |
|-----|---------|
| **core** | Ядро: процесс, ревью, память, экономия токенов, /init |
| **spec-prep** | идея → SPECIFICATION / DESIGN_SPEC / IMPLEMENTATION_PLAN с критериями приёмки |
| **saas** | бэкенд/веб: api-design, background-jobs, multitenancy |
| **ui** | дизайн интерфейсов: генеративный ui-designer, visual-craft, drop-in токены, доступность |
| **mobile** | Flutter + Riverpod 3, lint-гардрейлы, миграция Unity→Flutter, релиз |
| **games** | геймдев: GDD, выбор движка (Godot/Unity/Unreal), game-designer |
| **analytics** | исследования/аналитика: fusion (Claude+Codex+Gemini), report-builder |
| **storage** | хранилище/память: durable-память + rolling-log, RAG, стратегии длинного контекста (вкл. RLM) |

---

## 📚 Knowledge-паки (13, заземлены на доки)

| Категория | Паки |
|----------|-------|
| **Backend** | php-laravel · python-django · node-nestjs |
| **Data** | data-sql (PG/MySQL) · data-cache (Redis/Memcached) · data-search-olap (ES/ClickHouse) |
| **Frontend** | frontend-react · frontend-vue-nuxt · frontend-styling (Tailwind/SCSS/Vite) |
| **DevOps** | devops-containers · devops-ci-infra · devops-observability |
| **Mobile** | flutter-riverpod |

Каждый пак — это `rules.md` (правила из доков) + `sources.md` (источники + версии) + запись в `registry.json` (`version`, `last_verified`). Реестр — единственный источник истины для `/init`, `/add-stack` и `/update-knowledge`.

---

## 🎛 Стек-осознанный /init

1. Определяет greenfield/brownfield (сканирует `package.json`/`pubspec.yaml`/…).
2. Спрашивает **(мультивыбор)**: тип проекта + компоненты стека. Есть пресет «наш стек».
3. Собирает `AGENTS.md` из выбранных паков (+ импорт `CLAUDE.md` для Claude Code); конфликтующие (React ⊥ Vue, Riverpod ⊥ Bloc) никогда не склеиваются — он спрашивает.
4. Создаёт каркас памяти (PROGRESS.md), конституцию, спеку, безопасные разрешения.
5. Активирует доменные скилы.

---

## 🧩 Расширение и обновление

- **Новый стек** → `/add-stack <technology>`: заземляет правила на доки, создаёт пак, регистрирует его.
- **Новый домен** → папка плагина + запись в `marketplace.json` (см. [CONTRIBUTING.md](CONTRIBUTING.md)).
- **Обновление кода** → `/plugin update` (нативно, через маркетплейс).
- **Обновление знаний** → `/update-knowledge [id|all]`: сверка с доками, semver, устаревание на 90 днях / новой целевой версии.

Опциональные MCP-серверы упоминаются, но никогда не бандлятся — см. [MCP.md](MCP.md). Всё деградирует мягко без них.

---

## 🧩 IDE (VS Code)

Фреймворк **IDE-агностичен** — внутри расширения Claude Code для VS Code плагины/скилы/агенты/команды/хуки ведут себя идентично терминалу; ничего менять не нужно. Расширение добавляет редакторский UX (inline-дифы, сайдбар, LSP-диагностику). `/init` может создать каркас `.vscode/extensions.json`, чтобы Claude получал LSP-диагностику для твоего стека без лишних прогонов `analyze`.

---

## 🛠 Поддержка фреймворка

Этот репозиторий dogfood'ит себя сам: корневой [`CLAUDE.md`](CLAUDE.md) хранит конвенции авторинга (агент, редактирующий фреймворк, им следует), `scripts/validate.sh` проверяет структуру (JSON, frontmatter, реестр, плагины, хуки), а CI прогоняет его на каждом push.

---

## ⚖️ Лицензия и отказ от ответственности

MIT — см. [LICENSE](LICENSE). Атрибуция для упомянутых проектов, стандартов и конвенций
находится в [CREDITS.md](CREDITS.md). Этот проект **ссылается** на внешние инструменты (устанавливаемые
отдельно) и выражает идеи/факты своими словами — он не бандлит сторонний код.

**Не аффилирован с Anthropic, не одобрен и не спонсируется ею.** «Claude» и «Claude Code»
— товарные знаки Anthropic; это независимый общественный проект для использования с Claude Code.

## 🗺 Структура

```
StackForge/
├── .claude-plugin/marketplace.json     # 8 plugins
├── core/        agents · skills · commands · hooks · knowledge/ · templates
├── spec-prep/ · saas/ · ui/ · mobile/ · games/ · analytics/ · storage/
├── scripts/validate.sh · .github/workflows/validate.yml
└── LICENSE · CONTRIBUTING · CHANGELOG · MCP · README
```

---

<div align="center">
<sub>MIT · создано для Claude Code, переносимо на Cursor/Codex/Gemini · knowledge-паки заземлены на официальные доки (проверено 2026-06-15)</sub>
</div>

---

## ⚠️ Дисклеймер

Не аффилирован с Anthropic, не одобрен и не спонсируется ею. «Claude» и «Claude Code» —
товарные знаки Anthropic; это независимый общественный проект для использования с Claude Code.

Все прочие названия продуктов, логотипы и бренды (Cursor, OpenAI Codex, Google Gemini,
GitHub Copilot, Flutter, React, Vue и другие) принадлежат их владельцам; их использование
здесь носит номинативный характер и не подразумевает аффилированности или одобрения.
См. [CREDITS.md](CREDITS.md).
