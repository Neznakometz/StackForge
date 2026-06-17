# Installing StackForge

Pick the method that fits your agent and environment. **Skills and knowledge packs are
portable across agents; the subagent orchestration, hooks, and marketplace are
Claude-Code-native** (see the portability matrix at the bottom).

## Claude Code

**A. Marketplace (recommended, with auto-updates).** Run inside Claude Code:

```
/plugin marketplace add Neznakometz/StackForge
/plugin install core@stackforge
/init
/plugin install <domain>@stackforge      # mobile · saas · ui · games · analytics · storage · spec-prep
```

> Migrating from the old name? Remove the stale marketplace first:
> `/plugin marketplace remove claud-framework` then add the line above.

**B. Local clone + local marketplace** (handy when the remote marketplace is awkward
in the VSCode extension):

```bash
git clone https://github.com/Neznakometz/StackForge
# in Claude Code:
/plugin marketplace add ./StackForge
/plugin install core@stackforge
```

**C. Script — no marketplace at all** (copies skills/agents/commands into `.claude/`):

```bash
git clone https://github.com/Neznakometz/StackForge && cd StackForge
bash scripts/install.sh /path/to/your/project     # or: bash scripts/install.sh --user
```

This is the simplest path if `/plugin` is confusing in your setup. It gives you the
skills, agents, and commands directly; hooks + auto-updates require method A.

## Cursor · Codex CLI · Gemini CLI · Copilot · Windsurf (and 27+ others)

Skills follow the open **SKILL.md** standard, installed with the cross-agent CLI:

```bash
npx skills add Neznakometz/StackForge                       # all skills
npx skills add Neznakometz/StackForge --skill task-loop     # one skill
```

> **Vet before you install — any skill, ours included.** A skill runs with your agent's
> trust. Screen it first with [SkillSpector](https://github.com/NVIDIA/skillspector)
> (NVIDIA, Apache-2.0): `skillspector scan https://github.com/Neznakometz/StackForge` flags
> prompt injection, secret exfiltration, supply-chain and MCP-poisoning patterns before
> anything lands. We run it on our own skills in CI, but verifying yourself is the safe habit.

There is no `/init` slash command outside Claude Code, so assemble the per-stack rules with
the bootstrap script (run from the cloned repo):

```bash
bash scripts/init.sh --list                                    # available packs
bash scripts/init.sh --stack php-laravel,frontend-vue-nuxt .   # → AGENTS.md (+ CLAUDE.md import)
```

For the working method and conventions (process, rules, memory), drop **`AGENTS.md`**
at your repo root — any agent that reads it picks up the StackForge way of working:

- **Cursor:** place under `.cursor/rules/` (or keep `AGENTS.md` at root).
- **Gemini CLI:** copy/rename to `GEMINI.md`.
- **Codex CLI / Copilot / Windsurf:** `AGENTS.md` at root is read natively.

Knowledge packs are plain rule files — append the ones for your stack
(`core/knowledge/<tech>/rules.md`) into your agent's rules file.

## Manual (full control, any agent)

```bash
git clone https://github.com/Neznakometz/StackForge
cp -R StackForge/core/skills/* ~/.claude/skills/     # adjust target dir per agent
cp -R StackForge/core/agents/* ~/.claude/agents/
```

## Portability matrix

| Capability | Claude Code | Cursor / Codex / Gemini / Copilot |
|------------|:-----------:|:---------------------------------:|
| Skills (SKILL.md) | ✅ | ✅ via `npx skills` |
| Knowledge packs (rules) | ✅ | ✅ via `AGENTS.md` / rules file |
| Methodology (process/rules) | ✅ | ✅ via `AGENTS.md` |
| Slash commands | ✅ | ⚠️ varies by agent |
| Subagent orchestration (task-loop) | ✅ | ⚠️ run roles yourself (no native dispatch) |
| Hooks (auto format/analyze/memory) | ✅ | ❌ (Claude-Code-native) |
| Marketplace + auto-update | ✅ | ❌ (use `npx skills` to update) |

> Honest take: on non-Claude agents you get the **skills, packs, and methodology** —
> the full automatic subagent loop and hooks are Claude-Code-only. Cross-model review
> still works anywhere you have the `codex`/`gemini` CLI.
