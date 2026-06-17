<div align="center">

# ⚙️ StackForge

### **Démarrez un nouveau projet avec une seule commande — configuration adaptée à votre stack, un workflow éprouvé et une revue cross-model. Conçu pour Claude Code, portable vers Cursor · Codex · Gemini · Copilot.**

<p align="center">
  <a href="README.md">🇬🇧 English</a> •
  <a href="README-ru.md">🇷🇺 Русский</a> •
  <b>🇫🇷 Français</b> •
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
  <a href="#-pourquoi">Pourquoi</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-le-core">Core</a> •
  <a href="#-sécurité">Sécurité</a> •
  <a href="#-les-sets">Sets</a> •
  <a href="#-init-adapté-à-votre-stack">/init</a> •
  <a href="#-étendre--mettre-à-jour">Étendre</a>
</p>

</div>

---

<div align="center">

## 📊 En un coup d'œil

| **Sets** | **Agents** | **Skills** | **Commands** | **Knowledge packs** | **Hooks** |
|:--------:|:----------:|:----------:|:------------:|:-------------------:|:---------:|
| **8** | **12** | **32** | **11** | **13** | **6** |

<sub>Un core léger + 7 sets de domaine · chaque knowledge pack ancré dans la documentation officielle avec une date de vérification</sub>

</div>

---

## 🎯 Pourquoi

Chaque nouveau projet signifie réinstaller les skills, réécrire les règles, reconfigurer un processus. StackForge le fait en **une seule commande** : un **core** léger est toujours installé, `/init` demande votre stack et assemble le `AGENTS.md` correspondant (multi-agent, avec un import `CLAUDE.md` pour Claude Code), et un **set de domaine** ajoute la spécialisation.

```
/plugin install core  →  /init (asks for the stack)  →  /plugin install <domain>
        │                        │                            │
   capability               AGENTS.md for the stack       domain
 (agents/skills/            from knowledge packs          skills/agents
  commands/hooks)
```

### Bénéfices concrets

- **🤖 Revue cross-model.** Claude écrit → **Codex (ChatGPT) et Gemini** attaquent le diff → Claude arbitre. Une asymétrie des rôles, et non un « fusionner N réponses ». Une technique éprouvée sur un vrai projet (MeetREC), intégrée à chaque cycle de tâche.
- **📚 Knowledge packs issus de la documentation officielle.** 13 packs (PHP/Laravel, Django, NestJS, Postgres/MySQL, Redis, ES/ClickHouse, React, Vue/Nuxt, Tailwind, Docker/K8s, GitLab/Ansible, Grafana/Sentry, Flutter/Riverpod) — des règles tirées de la documentation de première main, avec leurs sources et `last_verified`. Faible risque d'hallucination, pas du blog spam.
- **🎛 Démarrage adapté à votre stack.** `/init` demande la stack (sélection multiple) et assemble uniquement les règles correspondantes ; les packs en conflit (React ⊥ Vue, Riverpod ⊥ Bloc) ne sont jamais collés ensemble.
- **🪙 Économie de tokens sur quatre fronts.** Discipline pour la lecture/la génération/les sessions + plugins optionnels pour le code, la prose, la recherche et la sortie des commandes.
- **🧠 Mémoire entre les sessions.** L1 (contexte) + L2 (checkpoints, automatique tous les 10 appels d'outils) ; les hooks chargent PROGRESS + checkpoint au démarrage.
- **🪶 Core léger + délégation.** Le core reste minimal ; les éléments spécifiques au domaine et à la stack vivent dans les plugins et les packs, chargés à la demande sur déclenchement.

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

**Le marketplace est peu pratique dans l'extension VS Code ?** Installez sans lui — clonez et lancez
`bash scripts/install.sh /path/to/project` (copie les skills/agents/commands dans `.claude/`).

**Autres agents (Cursor · Codex · Gemini · Copilot · Windsurf) :** les skills sont portables —
`npx skills add Neznakometz/StackForge` ; déposez `AGENTS.md` à la racine de votre dépôt pour la
méthodologie. Guide complet + matrice de portabilité : **[INSTALL.md](INSTALL.md)**.

---

## 🧠 Le Core

<table>
<tr>
<td width="50%">

### 🔄 Processus (task-loop)
`implementer` → `spec-reviewer` →
`code-reviewer` (+`design-reviewer` pour l'UI) →
**revue cross-model** → `test-runner`.
Fin de phase — `phase-check` + `security-auditor` +
revue adversariale.

</td>
<td width="50%">

### 🤖 Revue cross-model
Claude écrit → **Codex/Gemini** attaque → Claude
arbitre. Un « second cerveau » externe via CLI,
obligatoire à chaque tâche.

</td>
</tr>
<tr>
<td width="50%">

### 💾 Mémoire (L1+L2)
`/compact`, `/convolife`, `/checkpoint`,
auto-checkpoint tous les 10 appels d'outils.
Les hooks chargent le contexte au démarrage de la session.

</td>
<td width="50%">

### 🪙 Économie de tokens
Discipline + plugins optionnels `ponytail-safe`,
`ponytail-terse`, `codegraph-nav`,
`bash-output-compression`.

</td>
</tr>
</table>

**Agents (7) :** implementer · spec-reviewer · code-reviewer · design-reviewer · security-auditor · test-runner · scout
**Skills (7) :** task-loop · cross-model-review · tdd · contracts · token-economy · memory · prompt-audit
**Commands :** init · next-task · phase-check · checkpoint · add-stack · update-knowledge · stackforge

---

## 🛡 Sécurité

En couches, activée par défaut. Les hooks d'application sont natifs à Claude Code ; les **règles se portent vers n'importe quel agent** via `AGENTS.md`.

- **Permissions sûres** *(Claude Code)* — `/init` génère `.claude/settings.json` avec une deny-list (pas de lecture de `.env`/secrets, pas de force-push, pas de `rm -rf /`, pas de `curl`/`wget`) plus une allow-list pour les commandes de build/test de la stack. Sur Cursor/Codex/Gemini, utilisez le système de permissions propre à cet agent ; la même intention vit dans `AGENTS.md`.
- **`bash-guard`** *(hook Claude Code)* — un hook `PreToolUse(Bash)` qui inspecte chaque commande shell **avant** l'exécution des règles de permission et bloque celles qui sont destructrices / réseau / à code arbitraire : `rm` de `/`·`~`, `git push --force`, `reset --hard`, `clean`, `sudo`, `chown`, les pipes `curl|sh`, les `npx`/`dlx`/`bunx` arbitraires. Il exprime des exceptions qu'une deny-list ne peut pas — `rm -rf dist` passe, `rm -rf /` est bloqué — et `npx` est mis en allow-list pour les outils de confiance (`npx skills`/`shadcn`). Exit 2 = bloqué (la raison est remontée au modèle) ; fail-open en cas d'erreur d'analyse, pour que l'agent ne se bloque jamais.
- **Méthodologie** *(n'importe quel agent)* — `AGENTS.md` porte les règles « ne jamais exécuter de commandes destructrices/réseau/à code arbitraire », de sorte que les agents sans système de hooks les suivent quand même. Les revues lancent un agent `security-auditor` + une revue cross-model externe sur le diff de chaque phase (tout agent doté d'un CLI `codex`/`gemini`).
- **Vérifiez les skills avant de les installer** *(install-time, tout agent)* — bash-guard attrape les mauvaises commandes à l'*exécution* ; le contrôle complémentaire est de scanner un skill *avant* son installation. Lancez [**SkillSpector**](https://github.com/NVIDIA/skillspector) (NVIDIA, Apache-2.0) sur tout skill tiers — y compris les nôtres — avant installation : `skillspector scan <repo-or-dir>` repère prompt injection, exfiltration de secrets, supply-chain et MCP-poisoning. Référencé, non embarqué ; nos propres skills sont scannés en CI (voir ci-dessous).

> Des heuristiques, pas un parseur de shell — une protection contre les erreurs de l'agent et les attaques grossières, pas une frontière du système d'exploitation. Pour une isolation stricte, comptez sur **le sandbox de votre agent** (Claude Code, Cursor, etc.).

---

## 📦 Les Sets

| Set | Objectif |
|-----|---------|
| **core** | Core : processus, revue, mémoire, économie de tokens, /init |
| **spec-prep** | idée → SPECIFICATION / DESIGN_SPEC / IMPLEMENTATION_PLAN avec critères d'acceptation |
| **saas** | backend/web : api-design, background-jobs, multitenancy |
| **ui** | conception d'interface : ui-designer génératif, visual-craft, tokens prêts à l'emploi, accessibilité |
| **mobile** | Flutter + Riverpod 3, garde-fous de lint, migration Unity→Flutter, release |
| **games** | gamedev : GDD, choix du moteur (Godot/Unity/Unreal), game-designer |
| **analytics** | recherche/analytics : fusion (Claude+Codex+Gemini), report-builder |
| **storage** | stockage/mémoire : mémoire durable + rolling-log, RAG, stratégies long-context (incl. RLM) |

---

## 📚 Knowledge packs (13, ancrés dans la doc)

| Catégorie | Packs |
|----------|-------|
| **Backend** | php-laravel · python-django · node-nestjs |
| **Data** | data-sql (PG/MySQL) · data-cache (Redis/Memcached) · data-search-olap (ES/ClickHouse) |
| **Frontend** | frontend-react · frontend-vue-nuxt · frontend-styling (Tailwind/SCSS/Vite) |
| **DevOps** | devops-containers · devops-ci-infra · devops-observability |
| **Mobile** | flutter-riverpod |

Chaque pack est `rules.md` (règles tirées de la doc) + `sources.md` (sources + versions) + une entrée dans `registry.json` (`version`, `last_verified`). Le registre est la source unique de vérité pour `/init`, `/add-stack` et `/update-knowledge`.

---

## 🎛 /init adapté à votre stack

1. Détecte greenfield/brownfield (scanne `package.json`/`pubspec.yaml`/…).
2. Demande **(sélection multiple)** : type de projet + composants de la stack. Il existe un preset « notre stack ».
3. Assemble `AGENTS.md` à partir des packs choisis (+ un import `CLAUDE.md` pour Claude Code) ; ceux en conflit (React ⊥ Vue, Riverpod ⊥ Bloc) ne sont jamais collés — il pose la question.
4. Génère la mémoire (PROGRESS.md), la constitution, la spec, les permissions sûres.
5. Active les skills de domaine.

---

## 🧩 Étendre & mettre à jour

- **Nouvelle stack** → `/add-stack <technology>` : ancre les règles dans la doc, crée un pack, l'enregistre.
- **Nouveau domaine** → un dossier de plugin + une entrée dans `marketplace.json` (voir [CONTRIBUTING.md](CONTRIBUTING.md)).
- **Mise à jour du code** → `/plugin update` (natif, via le marketplace).
- **Mise à jour des connaissances** → `/update-knowledge [id|all]` : réconcilie avec la doc, semver, péremption à 90 jours / une nouvelle version cible.

Les serveurs MCP optionnels sont référencés, jamais embarqués — voir [MCP.md](MCP.md). Tout se dégrade gracieusement sans eux.

---

## 🔗 Intégrations

- **[Graphify](https://github.com/safishamsi/graphify)** — un **index** de graphe de connaissances optionnel sur un projet StackForge (construit une fois sur Claude, interrogé depuis n'importe quel agent / MCP) pour une navigation long-contexte moins coûteuse en tokens. Recettes d'installation par agent (Claude Code · Cursor · Codex · Antigravity) dans **[`docs/graphify/`](docs/graphify/README.md)**. Référencé, non embarqué.

---

## 🧩 IDE (VS Code)

Le framework est **agnostique de l'IDE** — à l'intérieur de l'extension VS Code de Claude Code, les plugins/skills/agents/commands/hooks se comportent à l'identique du terminal ; rien n'a besoin de changer. L'extension ajoute l'UX d'éditeur (diffs inline, sidebar, diagnostics LSP). `/init` peut générer `.vscode/extensions.json` pour que Claude obtienne des diagnostics LSP adaptés à votre stack, sans exécutions `analyze` supplémentaires.

---

## 🛠 Maintenir le framework

Ce dépôt se nourrit de lui-même (dogfooding) : un [`CLAUDE.md`](CLAUDE.md) racine porte les conventions de rédaction (un agent qui édite le framework les suit), `scripts/validate.sh` vérifie la structure (JSON, frontmatter, registre, plugins, hooks), et la CI le lance à chaque push.

---

## ⚖️ Licence & avertissement

MIT — voir [LICENSE](LICENSE). L'attribution des projets, standards et conventions référencés
se trouve dans [CREDITS.md](CREDITS.md). Ce projet **référence** des outils externes (installés
séparément) et exprime des idées/faits avec ses propres mots — il n'embarque aucun code tiers.

**Non affilié à, ni approuvé ou sponsorisé par Anthropic.** « Claude » et « Claude Code »
sont des marques d'Anthropic ; il s'agit d'un projet communautaire indépendant destiné à être utilisé avec Claude Code.

## 🗺 Structure

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
<sub>MIT · conçu pour Claude Code, portable vers Cursor/Codex/Gemini · knowledge packs ancrés dans la documentation officielle (vérifié le 2026-06-15)</sub>
</div>

---

## ⚠️ Avertissement

Non affilié à Anthropic, ni approuvé ni sponsorisé par elle. « Claude » et « Claude Code »
sont des marques d'Anthropic ; ceci est un projet communautaire indépendant destiné à être
utilisé avec Claude Code.

Tous les autres noms de produits, logos et marques (Cursor, OpenAI Codex, Google Gemini,
GitHub Copilot, Flutter, React, Vue et autres) appartiennent à leurs propriétaires respectifs ;
leur usage ici est nominatif et n'implique aucune affiliation ni approbation. Voir [CREDITS.md](CREDITS.md).
