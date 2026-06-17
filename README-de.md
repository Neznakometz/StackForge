<div align="center">

# ⚙️ StackForge

### **Starte ein neues Projekt mit einem einzigen Befehl — stack-bewusstes Setup, ein bewährter Workflow und Cross-Model-Review. Gebaut für Claude Code, portierbar nach Cursor · Codex · Gemini · Copilot.**

<p align="center">
  <a href="README.md">🇬🇧 English</a> •
  <a href="README-ru.md">🇷🇺 Русский</a> •
  <a href="README-fr.md">🇫🇷 Français</a> •
  <b>🇩🇪 Deutsch</b>
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
  <a href="#-warum">Warum</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-der-core">Core</a> •
  <a href="#-sicherheit">Sicherheit</a> •
  <a href="#-die-sets">Sets</a> •
  <a href="#-stack-bewusstes-init">/init</a> •
  <a href="#-erweitern--aktualisieren">Erweitern</a>
</p>

</div>

---

<div align="center">

## 📊 Auf einen Blick

| **Sets** | **Agents** | **Skills** | **Commands** | **Knowledge Packs** | **Hooks** |
|:--------:|:----------:|:----------:|:------------:|:-------------------:|:---------:|
| **8** | **12** | **32** | **11** | **13** | **6** |

<sub>Ein schlanker Core + 7 Domänen-Sets · jedes Knowledge Pack ist in offiziellen Docs verankert, mit Verifizierungsdatum</sub>

</div>

---

## 🎯 Warum

Jedes neue Projekt bedeutet: Skills erneut installieren, Regeln erneut schreiben, einen Prozess erneut verdrahten. StackForge erledigt das in **einem Befehl**: ein schlanker **Core** ist immer installiert, `/init` fragt nach deinem Stack und stellt dafür die `AGENTS.md` zusammen (agentübergreifend, mit `CLAUDE.md`-Import für Claude Code), und ein **Domänen-Set** ergänzt die Spezialisierung.

```
/plugin install core  →  /init (asks for the stack)  →  /plugin install <domain>
        │                        │                            │
   capability               AGENTS.md for the stack       domain
 (agents/skills/            from knowledge packs          skills/agents
  commands/hooks)
```

### Echter Mehrwert

- **🤖 Cross-Model-Review.** Claude schreibt → **Codex (ChatGPT) und Gemini** greifen den Diff an → Claude entscheidet. Eine Asymmetrie der Rollen, kein „N Antworten zusammenführen". Eine Technik, die sich an einem realen Projekt (MeetREC) bewährt hat und in jeden Task-Zyklus eingebunden ist.
- **📚 Knowledge Packs aus offiziellen Docs.** 13 Packs (PHP/Laravel, Django, NestJS, Postgres/MySQL, Redis, ES/ClickHouse, React, Vue/Nuxt, Tailwind, Docker/K8s, GitLab/Ansible, Grafana/Sentry, Flutter/Riverpod) — Regeln aus der Erstanbieter-Dokumentation, mit Quellen und `last_verified`. Geringes Halluzinationsrisiko, kein Blog-Spam.
- **🎛 Stack-bewusster Start.** `/init` fragt nach dem Stack (Mehrfachauswahl) und stellt nur die Regeln dafür zusammen; widersprüchliche Packs (React ⊥ Vue, Riverpod ⊥ Bloc) werden niemals zusammengeklebt.
- **🪙 Token-Ökonomie an vier Fronten.** Disziplin beim Lesen/Generieren/in Sessions + optionale Plugins für Code, Prosa, Suche und Befehlsausgabe.
- **🧠 Gedächtnis über Sessions hinweg.** L1 (Kontext) + L2 (Checkpoints, automatisch alle 10 Tool-Aufrufe); Hooks laden PROGRESS + Checkpoint beim Start.
- **🪶 Schlanker Core + Delegation.** Der Core bleibt schlank; Domänen- und stackspezifische Dinge leben in Plugins und Packs und werden bei Trigger faul nachgeladen.

---

## ⚡ Installation

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

**Marketplace in der VS-Code-Erweiterung umständlich?** Installiere ohne ihn — klonen und
`bash scripts/install.sh /path/to/project` ausführen (kopiert Skills/Agents/Commands nach `.claude/`).

**Andere Agents (Cursor · Codex · Gemini · Copilot · Windsurf):** Skills sind portierbar —
`npx skills add Neznakometz/StackForge`; lege `AGENTS.md` im Wurzelverzeichnis deines Repos ab für die
Methodik. Vollständige Anleitung + Portabilitätsmatrix: **[INSTALL.md](INSTALL.md)**.

---

## 🧠 Der Core

<table>
<tr>
<td width="50%">

### 🔄 Prozess (task-loop)
`implementer` → `spec-reviewer` →
`code-reviewer` (+`design-reviewer` für UI) →
**Cross-Model-Review** → `test-runner`.
Phasenende — `phase-check` + `security-auditor` +
adversariales Review.

</td>
<td width="50%">

### 🤖 Cross-Model-Review
Claude schreibt → **Codex/Gemini** greift an → Claude
entscheidet. Ein externes „zweites Gehirn" per CLI,
verpflichtend bei jedem Task.

</td>
</tr>
<tr>
<td width="50%">

### 💾 Gedächtnis (L1+L2)
`/compact`, `/convolife`, `/checkpoint`,
Auto-Checkpoint alle 10 Tool-Aufrufe.
Hooks laden den Kontext beim Session-Start.

</td>
<td width="50%">

### 🪙 Token-Ökonomie
Disziplin + optionale Plugins `ponytail-safe`,
`ponytail-terse`, `codegraph-nav`,
`bash-output-compression`.

</td>
</tr>
</table>

**Agents (7):** implementer · spec-reviewer · code-reviewer · design-reviewer · security-auditor · test-runner · scout
**Skills (7):** task-loop · cross-model-review · tdd · contracts · token-economy · memory · prompt-audit
**Commands:** init · next-task · phase-check · checkpoint · add-stack · update-knowledge · stackforge

---

## 🛡 Sicherheit

Mehrschichtig, standardmäßig aktiv. Die Enforcement-Hooks sind Claude-Code-nativ; die **Regeln lassen sich auf jeden Agent portieren** via `AGENTS.md`.

- **Sichere Berechtigungen** *(Claude Code)* — `/init` erstellt das Gerüst `.claude/settings.json` mit einer Deny-Liste (kein Lesen von `.env`/Secrets, kein Force-Push, kein `rm -rf /`, kein `curl`/`wget`) plus einer Allow-Liste für die Build-/Test-Befehle des Stacks. Auf Cursor/Codex/Gemini nutze das eigene Berechtigungssystem des jeweiligen Agents; dieselbe Absicht lebt in `AGENTS.md`.
- **`bash-guard`** *(Claude-Code-Hook)* — ein `PreToolUse(Bash)`-Hook, der jeden Shell-Befehl **vor** dem Greifen der Berechtigungsregeln prüft und destruktive / netzwerkbezogene / beliebigen Code ausführende blockiert: `rm` von `/`·`~`, `git push --force`, `reset --hard`, `clean`, `sudo`, `chown`, `curl|sh`-Pipes, beliebiges `npx`/`dlx`/`bunx`. Er drückt Ausnahmen aus, die eine Deny-Liste nicht kann — `rm -rf dist` geht durch, `rm -rf /` wird blockiert — und `npx` ist für vertrauenswürdige Tools auf der Allow-Liste (`npx skills`/`shadcn`). Exit 2 = blockiert (der Grund wird dem Modell sichtbar gemacht); bei einem Parse-Fehler fail-open, damit sich der Agent nie festfährt.
- **Methodik** *(jeder Agent)* — `AGENTS.md` trägt die Regeln „niemals destruktive/netzwerkbezogene/beliebigen Code ausführende Befehle ausführen", sodass auch Agents ohne Hook-System ihnen folgen. Reviews führen einen `security-auditor`-Agent + externes Cross-Model-Review bei jedem Phasen-Diff aus (jeder Agent mit einer `codex`-/`gemini`-CLI).

> Heuristiken, kein Shell-Parser — ein Schutz gegen Agent-Fehler und grobe Angriffe, keine OS-Grenze. Für harte Isolation verlasse dich auf **den Sandbox deines Agents** (Claude Code, Cursor usw.).

---

## 📦 Die Sets

| Set | Zweck |
|-----|---------|
| **core** | Core: Prozess, Review, Gedächtnis, Token-Ökonomie, /init |
| **spec-prep** | Idee → SPECIFICATION / DESIGN_SPEC / IMPLEMENTATION_PLAN mit Akzeptanzkriterien |
| **saas** | Backend/Web: api-design, background-jobs, multitenancy |
| **ui** | Interface-Design: generativer ui-designer, visual-craft, Drop-in-Tokens, Barrierefreiheit |
| **mobile** | Flutter + Riverpod 3, Lint-Guardrails, Unity→Flutter-Migration, Release |
| **games** | Gamedev: GDD, Engine-Wahl (Godot/Unity/Unreal), game-designer |
| **analytics** | Recherche/Analytics: Fusion (Claude+Codex+Gemini), report-builder |
| **storage** | Storage/Gedächtnis: dauerhaftes Gedächtnis + rolling-log, RAG, Long-Context-Strategien (inkl. RLM) |

---

## 📚 Knowledge Packs (13, doc-grounded)

| Kategorie | Packs |
|----------|-------|
| **Backend** | php-laravel · python-django · node-nestjs |
| **Data** | data-sql (PG/MySQL) · data-cache (Redis/Memcached) · data-search-olap (ES/ClickHouse) |
| **Frontend** | frontend-react · frontend-vue-nuxt · frontend-styling (Tailwind/SCSS/Vite) |
| **DevOps** | devops-containers · devops-ci-infra · devops-observability |
| **Mobile** | flutter-riverpod |

Jedes Pack ist `rules.md` (Regeln aus den Docs) + `sources.md` (Quellen + Versionen) + ein Eintrag in `registry.json` (`version`, `last_verified`). Das Registry ist die einzige Quelle der Wahrheit für `/init`, `/add-stack` und `/update-knowledge`.

---

## 🎛 Stack-bewusstes /init

1. Erkennt Greenfield/Brownfield (scannt `package.json`/`pubspec.yaml`/…).
2. Fragt **(Mehrfachauswahl)**: Projekttyp + Stack-Komponenten. Es gibt ein „our stack"-Preset.
3. Stellt `AGENTS.md` aus den gewählten Packs zusammen (+ `CLAUDE.md`-Import für Claude Code); widersprüchliche (React ⊥ Vue, Riverpod ⊥ Bloc) werden niemals zusammengeklebt — es fragt nach.
4. Erstellt das Gerüst für Gedächtnis (PROGRESS.md), die Verfassung, die Spec, sichere Berechtigungen.
5. Aktiviert die Domänen-Skills.

---

## 🧩 Erweitern & aktualisieren

- **Neuer Stack** → `/add-stack <technology>`: verankert die Regeln in den Docs, erstellt ein Pack, registriert es.
- **Neue Domäne** → ein Plugin-Ordner + ein Eintrag in `marketplace.json` (siehe [CONTRIBUTING.md](CONTRIBUTING.md)).
- **Code aktualisieren** → `/plugin update` (nativ, über den Marketplace).
- **Wissen aktualisieren** → `/update-knowledge [id|all]`: mit den Docs abgleichen, semver, Veralterung bei 90 Tagen / einer neuen Zielversion.

Optionale MCP-Server werden referenziert, niemals gebündelt — siehe [MCP.md](MCP.md). Alles degradiert ohne sie elegant.

---

## 🔗 Integrationen

- **[Graphify](https://github.com/safishamsi/graphify)** — ein optionaler Wissensgraph-**Index** über ein StackForge-Projekt (einmal auf Claude gebaut, aus jedem Agenten / MCP abfragbar) für token-günstigere Long-Context-Navigation. Setup-Rezepte pro Agent (Claude Code · Cursor · Codex · Antigravity) in **[`docs/graphify/`](docs/graphify/README.md)**. Referenziert, nicht gebündelt.

---

## 🧩 IDE (VS Code)

Das Framework ist **IDE-agnostisch** — innerhalb der Claude-Code-VS-Code-Erweiterung verhalten sich Plugins/Skills/Agents/Commands/Hooks identisch zum Terminal; nichts muss geändert werden. Die Erweiterung ergänzt Editor-UX (Inline-Diffs, Seitenleiste, LSP-Diagnostik). `/init` kann das Gerüst `.vscode/extensions.json` erstellen, sodass Claude LSP-Diagnostik für deinen Stack erhält, ohne zusätzliche `analyze`-Läufe.

---

## 🛠 Das Framework warten

Dieses Repo betreibt Dogfooding an sich selbst: eine Wurzel-[`CLAUDE.md`](CLAUDE.md) hält die Authoring-Konventionen (ein Agent, der das Framework bearbeitet, folgt ihnen), `scripts/validate.sh` prüft die Struktur (JSON, Frontmatter, Registry, Plugins, Hooks), und CI führt es bei jedem Push aus.

---

## ⚖️ Lizenz & Haftungsausschluss

MIT — siehe [LICENSE](LICENSE). Die Attribution für referenzierte Projekte, Standards und Konventionen
findet sich in [CREDITS.md](CREDITS.md). Dieses Projekt **referenziert** externe Tools (separat
installiert) und drückt Ideen/Fakten in eigenen Worten aus — es bündelt keinen Drittanbieter-Code.

**Nicht mit Anthropic verbunden, von ihnen unterstützt oder gesponsert.** „Claude" und „Claude Code"
sind Markenzeichen von Anthropic; dies ist ein unabhängiges Community-Projekt zur Verwendung mit Claude Code.

## 🗺 Aufbau

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
<sub>MIT · gebaut für Claude Code, portierbar nach Cursor/Codex/Gemini · Knowledge Packs in offiziellen Docs verankert (verifiziert 2026-06-15)</sub>
</div>

---

## ⚠️ Haftungsausschluss

Nicht mit Anthropic verbunden, von Anthropic weder unterstützt noch gesponsert. „Claude"
und „Claude Code" sind Marken von Anthropic; dies ist ein unabhängiges Community-Projekt
zur Verwendung mit Claude Code.

Alle anderen Produktnamen, Logos und Marken (Cursor, OpenAI Codex, Google Gemini, GitHub
Copilot, Flutter, React, Vue und andere) sind Eigentum ihrer jeweiligen Inhaber; ihre
Verwendung erfolgt hier nominativ und impliziert keine Verbindung oder Billigung. Siehe [CREDITS.md](CREDITS.md).
