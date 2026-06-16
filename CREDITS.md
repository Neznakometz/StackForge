# Credits & Third-Party Notices

StackForge is licensed under the [MIT License](LICENSE).

This project is an **original work**. It does **not** bundle or redistribute third-party
code. Where it builds on prior art it does so by (a) **referencing** external tools the
user installs separately (name + URL + what they do), and (b) expressing **ideas, methods,
and facts** in our own words. Ideas, methodologies, and factual rules are not protected by
copyright; verbatim third-party text and code are not included.

## Disclaimer

**Not affiliated with, endorsed by, or sponsored by Anthropic.** "Claude" and "Claude Code"
are products and trademarks of [Anthropic](https://www.anthropic.com/). This is an
independent, community project built to be used with Claude Code.

**All other product names, logos, and brands** referenced here — including Cursor, OpenAI Codex,
Google Gemini, GitHub Copilot, Windsurf, Flutter/Dart, React, Vue, Next.js, Tailwind, Docker,
Kubernetes, PostgreSQL, MySQL, Redis, Elasticsearch, ClickHouse, Laravel, Django, NestJS,
Unity, Godot, Unreal, Figma, and others — are the property of their respective owners. Their
use here is nominative (to say what the tool works with) and implies no affiliation or endorsement.

## Referenced projects (not bundled — installed separately by the user)

| Project | Use here | License |
|---------|----------|---------|
| Anthropic `frontend-design`, `mcp-builder` ([anthropics/skills](https://github.com/anthropics/skills)) | referenced as the design-philosophy canon / MCP builder | see repo |
| [obra/superpowers](https://github.com/obra/superpowers) | inspiration for the subagent-driven / TDD workflow | MIT |
| [github/spec-kit](https://github.com/github/spec-kit) | inspiration for the spec-first front-end of the process | MIT |
| [SuperClaude](https://github.com/SuperClaude-Org/SuperClaude_Framework) | structural inspiration (commands/agents/modes layout) | MIT |
| [Claude Code Game Studios](https://github.com/Neznakometz/Claude-Code-Game-Studios) | structural inspiration for the `games` set (hierarchy, path-scoped rules) | MIT |
| [SocratiCode](https://github.com/giancarloerra/socraticode) | **referenced only** as an optional code-index engine — **no code used** | AGPL-3.0 |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | token-economy plugins referenced as optional | MIT |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | referenced as optional UI/React audit skills | MIT |
| [shadcn/ui](https://ui.shadcn.com) & [shadcn-vue](https://www.shadcn-vue.com) | referenced; the token bridge maps to shadcn's CSS-variable convention | MIT |
| [OneRedOak/claude-code-workflows](https://github.com/OneRedOak/claude-code-workflows) | referenced as the live design-review workflow | see repo |
| [Impeccable](https://github.com/pbakaus/impeccable) | referenced as a design-polish toolkit | Apache-2.0 |
| [alexzhang13/rlm](https://github.com/alexzhang13/rlm) | referenced in the long-context strategy (RLM pattern) | see repo |
| [ui-skills.com](https://www.ui-skills.com/) (ibelick) | inspiration for the anti-slop checklist and the `web-metadata` skill | see repo |

## Facts, standards & conventions (used as references, with attribution)

- **Official documentation** of every covered stack (Laravel, Django/DRF, NestJS, PostgreSQL/MySQL, Redis/Memcached, Elasticsearch/ClickHouse, React, Vue/Nuxt, Tailwind/Vite, Docker/K8s/Traefik, GitLab/Ansible, Grafana/Loki/Sentry, Flutter/Dart/Riverpod). Each knowledge pack paraphrases operational rules and cites its sources in `sources.md`.
- **Design principles** — *Refactoring UI* (Adam Wathan & Steve Schoger): principles and numeric heuristics referenced; **no text from the book is reproduced**. **Material Design 3** (Google), **Apple Human Interface Guidelines** (Apple), **WCAG 2.x** (W3C).
- **Color values** in `ui/templates/tokens.css` use the open-source **Tailwind CSS** default palette (slate/indigo), MIT-licensed.
- **Memory-layer concepts** (checkpoints, consolidation, rolling log) are inspired by publicly shared educational material (the "ClaudeClaw" memory system); the implementation and text here are our own.

## If you extend the framework

- Reference external solutions; don't copy their code. Preserve any third-party license + attribution if you ever do bundle something.
- Do not pull copyleft (e.g. AGPL/GPL) content into this MIT project.
- Knowledge packs: rules from **official docs only**, paraphrased, with sources in `sources.md`.

> This file is provided for transparency and good-faith attribution. It is not legal advice.
> Before publishing or distributing, consider a review by a qualified attorney — especially
> regarding project naming/trademark.
