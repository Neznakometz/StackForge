<div align="center">

# ⚙️ StackForge

### **Spin up a new project with one command — stack-aware setup, a proven workflow, and cross-model review. Built for Claude Code, portable to Cursor · Codex · Gemini · Copilot.**

<p align="center">
  <img src="https://img.shields.io/badge/version-0.2.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
  <img src="https://img.shields.io/badge/built%20for-Claude%20Code-CC785C" alt="Built for Claude Code">
  <img src="https://img.shields.io/badge/cross--agent-SKILL.md-blue" alt="Cross-agent">
  <img src="https://img.shields.io/badge/knowledge%20packs-doc--grounded-brightgreen" alt="Doc-grounded">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>

<p align="center">
  <a href="#-why">Why</a> •
  <a href="#-install">Install</a> •
  <a href="#-the-core">Core</a> •
  <a href="#-safety">Safety</a> •
  <a href="#-the-sets">Sets</a> •
  <a href="#-stack-aware-init">/init</a> •
  <a href="#-extend--update">Extend</a>
</p>

</div>

---

<div align="center">

## 📊 At a glance

| **Sets** | **Agents** | **Skills** | **Commands** | **Knowledge packs** | **Hooks** |
|:--------:|:----------:|:----------:|:------------:|:-------------------:|:---------:|
| **8** | **12** | **32** | **10** | **13** | **5** |

<sub>A thin core + 7 domain sets · every knowledge pack grounded in official docs with a verification date</sub>

</div>

---

## 🎯 Why

Every new project means installing skills again, writing rules again, wiring up a process again. StackForge does it in **one command**: a thin **core** is always installed, `/init` asks for your stack and assembles `CLAUDE.md` for it, and a **domain set** adds the specialization.

```
/plugin install core  →  /init (asks for the stack)  →  /plugin install <domain>
        │                        │                            │
   capability               CLAUDE.md for the stack       domain
 (agents/skills/            from knowledge packs          skills/agents
  commands/hooks)
```

### Real benefits

- **🤖 Cross-model review.** Claude writes → **Codex (ChatGPT) and Gemini** attack the diff → Claude arbitrates. An asymmetry of roles, not "merge N answers." A technique proven on a real project (MeetREC), wired into every task cycle.
- **📚 Knowledge packs from official docs.** 13 packs (PHP/Laravel, Django, NestJS, Postgres/MySQL, Redis, ES/ClickHouse, React, Vue/Nuxt, Tailwind, Docker/K8s, GitLab/Ansible, Grafana/Sentry, Flutter/Riverpod) — rules from first-party documentation, with sources and `last_verified`. Low hallucination risk, not blog spam.
- **🎛 Stack-aware start.** `/init` asks for the stack (multi-select) and assembles rules for it only; conflicting packs (React ⊥ Vue, Riverpod ⊥ Bloc) are never glued together.
- **🪙 Token economy on four fronts.** Discipline for reading/generation/sessions + optional plugins for code, prose, search, and command output.
- **🧠 Memory across sessions.** L1 (context) + L2 (checkpoints, auto every 10 tool calls); hooks load PROGRESS + checkpoint at startup.
- **🪶 Thin core + delegation.** The core stays lean; domain- and stack-specific things live in plugins and packs, loaded lazily on trigger.

---

## ⚡ Install

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

**Marketplace awkward in the VS Code extension?** Install without it — clone and run
`bash scripts/install.sh /path/to/project` (copies skills/agents/commands into `.claude/`).

**Other agents (Cursor · Codex · Gemini · Copilot · Windsurf):** skills are portable —
`npx skills add Neznakometz/StackForge`; drop `AGENTS.md` at your repo root for the
methodology. Full guide + portability matrix: **[INSTALL.md](INSTALL.md)**.

---

## 🧠 The Core

<table>
<tr>
<td width="50%">

### 🔄 Process (task-loop)
`implementer` → `spec-reviewer` →
`code-reviewer` (+`design-reviewer` for UI) →
**cross-model review** → `test-runner`.
End of phase — `phase-check` + `security-auditor` +
adversarial review.

</td>
<td width="50%">

### 🤖 Cross-model review
Claude writes → **Codex/Gemini** attacks → Claude
arbitrates. An external "second brain" via CLI,
mandatory on every task.

</td>
</tr>
<tr>
<td width="50%">

### 💾 Memory (L1+L2)
`/compact`, `/convolife`, `/checkpoint`,
auto-checkpoint every 10 tool calls.
Hooks load context at session start.

</td>
<td width="50%">

### 🪙 Token economy
Discipline + optional plugins `ponytail-safe`,
`ponytail-terse`, `codegraph-nav`,
`bash-output-compression`.

</td>
</tr>
</table>

**Agents (7):** implementer · spec-reviewer · code-reviewer · design-reviewer · security-auditor · test-runner · scout
**Skills (7):** task-loop · cross-model-review · tdd · contracts · token-economy · memory · prompt-audit
**Commands:** init · next-task · phase-check · checkpoint · add-stack · update-knowledge

---

## 🛡 Safety

Two layers, on by default:

- **Safe permissions** — `/init` scaffolds `.claude/settings.json` with a deny-list (no `.env`/secret reads, no force-push, no `rm -rf /`, no `curl`/`wget`) plus an allow-list for the stack's build/test commands.
- **`bash-guard`** — a `PreToolUse(Bash)` hook that inspects every shell command **before** permission rules run and blocks destructive / network / arbitrary-code ones: `rm` of `/`·`~`, `git push --force`, `reset --hard`, `clean`, `sudo`, `chown`, `curl|sh` pipes, and arbitrary `npx`/`dlx`/`bunx`. It expresses exceptions a deny-list can't — `rm -rf dist` passes, `rm -rf /` is blocked — and `npx` is allow-listed for trusted tooling (`npx skills`/`shadcn`). Exit 2 = blocked (reason surfaced to the model); fail-open on a parse error so the agent never wedges.

> Heuristics, not a shell parser — a guard against agent mistakes and crude attacks, not an OS boundary. For hard isolation, rely on Claude Code's sandbox. Reviews also run a `security-auditor` agent + external cross-model review on every phase diff.

---

## 📦 The Sets

| Set | Purpose |
|-----|---------|
| **core** | Core: process, review, memory, token economy, /init |
| **spec-prep** | idea → SPECIFICATION / DESIGN_SPEC / IMPLEMENTATION_PLAN with acceptance criteria |
| **saas** | backend/web: api-design, background-jobs, multitenancy |
| **ui** | interface design: generative ui-designer, visual-craft, drop-in tokens, accessibility |
| **mobile** | Flutter + Riverpod 3, lint guardrails, Unity→Flutter migration, release |
| **games** | gamedev: GDD, engine choice (Godot/Unity/Unreal), game-designer |
| **analytics** | research/analytics: fusion (Claude+Codex+Gemini), report-builder |
| **storage** | storage/memory: durable memory + rolling-log, RAG, long-context strategies (incl. RLM) |

---

## 📚 Knowledge packs (13, doc-grounded)

| Category | Packs |
|----------|-------|
| **Backend** | php-laravel · python-django · node-nestjs |
| **Data** | data-sql (PG/MySQL) · data-cache (Redis/Memcached) · data-search-olap (ES/ClickHouse) |
| **Frontend** | frontend-react · frontend-vue-nuxt · frontend-styling (Tailwind/SCSS/Vite) |
| **DevOps** | devops-containers · devops-ci-infra · devops-observability |
| **Mobile** | flutter-riverpod |

Each pack is `rules.md` (rules from the docs) + `sources.md` (sources + versions) + an entry in `registry.json` (`version`, `last_verified`). The registry is the single source of truth for `/init`, `/add-stack`, and `/update-knowledge`.

---

## 🎛 Stack-aware /init

1. Detects greenfield/brownfield (scans `package.json`/`pubspec.yaml`/…).
2. Asks **(multi-select)**: project type + stack components. There's an "our stack" preset.
3. Assembles `CLAUDE.md` from the chosen packs; conflicting ones (React ⊥ Vue, Riverpod ⊥ Bloc) are never glued — it asks.
4. Scaffolds memory (PROGRESS.md), the constitution, the spec, safe permissions.
5. Activates the domain skills.

---

## 🧩 Extend & update

- **New stack** → `/add-stack <technology>`: grounds the rules in the docs, creates a pack, registers it.
- **New domain** → a plugin folder + an entry in `marketplace.json` (see [CONTRIBUTING.md](CONTRIBUTING.md)).
- **Updating code** → `/plugin update` (native, via the marketplace).
- **Updating knowledge** → `/update-knowledge [id|all]`: reconcile with the docs, semver, staleness at 90 days / a new target version.

Optional MCP servers are referenced, never bundled — see [MCP.md](MCP.md). Everything degrades gracefully without them.

---

## 🧩 IDE (VS Code)

The framework is **IDE-agnostic** — inside the Claude Code VS Code extension, plugins/skills/agents/commands/hooks behave identically to the terminal; nothing needs to change. The extension adds editor UX (inline diffs, sidebar, LSP diagnostics). `/init` can scaffold `.vscode/extensions.json` so Claude gets LSP diagnostics for your stack with no extra `analyze` runs.

---

## 🛠 Maintaining the framework

This repo dogfoods itself: a root [`CLAUDE.md`](CLAUDE.md) holds the authoring conventions (an agent editing the framework follows them), `scripts/validate.sh` checks structure (JSON, frontmatter, registry, plugins, hooks), and CI runs it on every push.

---

## ⚖️ License & disclaimer

MIT — see [LICENSE](LICENSE). Attribution for referenced projects, standards, and conventions
is in [CREDITS.md](CREDITS.md). This project **references** external tools (installed
separately) and expresses ideas/facts in its own words — it does not bundle third-party code.

**Not affiliated with, endorsed by, or sponsored by Anthropic.** "Claude" and "Claude Code"
are trademarks of Anthropic; this is an independent community project for use with Claude Code.

## 🗺 Layout

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
<sub>MIT · built for Claude Code, portable to Cursor/Codex/Gemini · knowledge packs grounded in official docs (verified 2026-06-15)</sub>
</div>
