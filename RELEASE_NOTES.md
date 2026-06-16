## StackForge v0.2.0

Spin up a new project with one command — stack-aware setup, a proven subagent workflow, and cross-model review. Built for **Claude Code**, portable to **Cursor · Codex · Gemini · Copilot** via the SKILL.md standard.

**What's inside**
- ⚙️ **8 sets · 12 agents · 32 skills · 11 commands · 13 knowledge packs · 6 hooks**
- 🤖 **Cross-model review** — Claude writes, Codex/Gemini attack the diff, Claude arbitrates (with a Claude-subagent fallback when no external CLI).
- 📚 **Knowledge packs from official docs** — PHP/Laravel, Django, NestJS, Postgres/MySQL, Redis, ES/ClickHouse, React, Vue/Nuxt, Tailwind, Docker/K8s, GitLab/Ansible, Grafana/Sentry, Flutter/Riverpod — each with sources and `last_verified`.
- 🎛 **Stack-aware `/init`** — assembles `AGENTS.md` (+`CLAUDE.md` import) for your stack; never glues conflicting packs.
- 🛡 **Safety** — `bash-guard` PreToolUse hook + safe permissions; hard isolation via your agent's sandbox.

**New in 0.2.0**
- Hook test suite wired into CI; weekly knowledge-freshness workflow (auto-issue for packs unverified >90 days).
- Cross-agent bootstrap `scripts/init.sh` (assemble `AGENTS.md` from packs outside Claude Code).
- `/stackforge` status command; opt-out local telemetry (`SessionEnd` → `.stackforge/metrics.log`).

**Install**
```
/plugin marketplace add Neznakometz/StackForge
/plugin install core@stackforge
/init
```
Other agents: `npx skills add Neznakometz/StackForge`. Full guide → [INSTALL.md](https://github.com/Neznakometz/StackForge/blob/main/INSTALL.md).

📖 [README](https://github.com/Neznakometz/StackForge/blob/main/README.md) · 🌍 RU/FR/DE · 📋 [CHANGELOG](https://github.com/Neznakometz/StackForge/blob/main/CHANGELOG.md) · ⚖️ MIT

> Not affiliated with, endorsed by, or sponsored by Anthropic. "Claude" and "Claude Code" are trademarks of Anthropic.
