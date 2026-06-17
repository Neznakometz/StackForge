<!--
Launch / promo copy for StackForge. Working doc — not part of the framework.
Delete or gitignore before/after the launch if you don't want it in the repo.
Order to ship: demo GIF → awesome-claude-code PR + registries → one wave
(HN + Reddit + X + LinkedIn) → dev.to story article. Lead with the 3 differentiators:
cross-model review · doc-grounded packs · cross-agent.
-->

# StackForge — launch & promo kit

Repo: https://github.com/Neznakometz/StackForge

---

## 0) Repo polish (do first — so traffic converts)

- **About / description:** `Thin core + domain sets for a fast, stack-aware project start. Cross-agent (Claude Code, Cursor, Codex, Gemini) via the SKILL.md standard. MIT.`
- **Topics:** `claude-code` `agent-skills` `ai-agents` `cursor` `codex` `developer-tools` `llm` `mcp`
- **Demo (highest-leverage):** a ~60s GIF/video at the top of the README — `/init` asking the stack → a task running → cross-model review catching something. Without it, most visitors bounce. Tools: `asciinema` + `agg` (terminal→GIF), or a screen recording.

---

## 1) awesome-claude-code (PR) — the canonical list

PR title: `Add StackForge`

Entry (match the list's current format/category, e.g. "Tooling" / "Plugins"):

```
[StackForge](https://github.com/Neznakometz/StackForge) — Thin core + domain sets for one-command, stack-aware project setup. Mandatory cross-model review (Codex/Gemini), knowledge packs grounded in official docs, cross-agent via SKILL.md. MIT.
```

Also submit to: agentskills.io, the Vercel skills ecosystem (`npx skills`), Smithery, and any Claude plugin directories (claudemarketplaces, mcpmarket). One-time, durable discovery.

---

## 2) Show HN (Hacker News)

**Title** (≤80 chars, no hype):
```
Show HN: StackForge – one-command, stack-aware project setup for Claude Code
```

**Text:**
```
I kept re-doing the same setup at the start of every AI-coding project: install skills, write rules, wire up a review process. StackForge turns that into one command.

A thin core is always installed; `/init` asks for your stack (PHP/Laravel, Django, NestJS, React, Vue/Nuxt, Flutter, …) and assembles the rules from knowledge packs; a domain set adds the specialization (saas, ui, mobile, games, analytics, storage, spec-prep).

Three things I think are actually different from "lots of slash commands" frameworks:

1. Cross-model review. Claude writes the code, then Codex (ChatGPT) and/or Gemini attack the diff via their CLIs, and Claude arbitrates the findings. An asymmetry of roles, not "merge N answers." If you don't have the external CLIs, it falls back to a second Claude subagent so review never gets skipped. I built this on a real project and it caught real bugs.

2. Knowledge packs from official docs, not from the model's memory. Each of the 13 packs paraphrases operational rules from first-party documentation, ships a sources.md, and carries a last_verified date. A weekly CI job flags packs that go stale. Lower hallucination risk than "best practices" pulled from training data.

3. Cross-agent. Skills follow the open SKILL.md standard (`npx skills add`), and the methodology is a portable AGENTS.md, so it works in Cursor / Codex / Gemini / Copilot too — not just Claude Code. The subagent orchestration and hooks are Claude-Code-native; everything else ports.

Also: a PreToolUse bash-guard that blocks destructive/network/arbitrary-code commands before permission rules (allows `rm -rf dist`, blocks `rm -rf /`), and an opt-out local token/tool-call log so you can see what the token discipline saves.

MIT, not affiliated with Anthropic. Repo: https://github.com/Neznakometz/StackForge
Honest caveats: the bash-guard is heuristic (not an OS boundary), and I haven't benchmarked token savings — the optional plugins' numbers are their authors', not mine. Feedback welcome.
```

> Post Tue–Thu, ~8–10am US Eastern. Reply to every comment quickly for the first few hours.

---

## 3) Reddit — r/ClaudeAI (and r/ChatGPTCoding)

**Title:**
```
I built StackForge: one-command stack-aware setup for Claude Code, with cross-model review (Codex/Gemini) and doc-grounded rule packs
```

**Body:**
```
After repeating the same setup on every project — installing skills, writing rules, wiring a review loop — I packaged it into a Claude Code plugin marketplace and made it cross-agent.

What it does: `/plugin install core` → `/init` (asks your stack, assembles the rules from packs) → install a domain set (saas / ui / mobile / games / analytics / storage / spec-prep).

What I think is genuinely different:
- Cross-model review — Claude writes, Codex/Gemini attack the diff, Claude arbitrates (falls back to a 2nd Claude subagent if you don't have the CLIs, so review is never skipped).
- Knowledge packs from official docs (sources + last_verified date + a weekly freshness CI), not "best practices" from memory.
- Cross-agent: skills via `npx skills add`, methodology via AGENTS.md — Cursor/Codex/Gemini/Copilot too.

Plus a bash-guard safety hook and an opt-out local metrics log.

MIT, independent project (not affiliated with Anthropic): https://github.com/Neznakometz/StackForge

Happy to answer questions or take suggestions on which stacks/packs to add next.
```

> Read each subreddit's self-promo rules first. Frame as "I built / here's how", engage in comments, don't drop-and-run.

---

## 4) X / Twitter thread

```
1/ I kept re-doing the same setup on every AI-coding project — skills, rules, review process.

So I built StackForge: one command to spin up a new project, stack-aware, with a real review loop.

Built for Claude Code, portable to Cursor/Codex/Gemini. MIT. 🧵

2/ The bit I'm most happy with: cross-model review.

Claude writes the code → Codex (ChatGPT) + Gemini attack the diff via CLI → Claude arbitrates the findings.

Asymmetry of roles, not "merge N answers." No external CLI? Falls back to a 2nd Claude subagent so review never gets skipped.

3/ The rules aren't from the model's memory.

13 knowledge packs (Laravel, Django, NestJS, Postgres, React, Vue/Nuxt, Flutter…) paraphrase OFFICIAL docs, ship sources, and carry a last_verified date. A weekly CI job flags stale ones.

Lower hallucination risk than "best practices" from training data.

4/ /init asks your stack (multi-select), assembles an AGENTS.md from the chosen packs (+ a CLAUDE.md import for Claude Code), and never glues conflicting packs (React ⊥ Vue, Riverpod ⊥ Bloc).

5/ Cross-agent by design: skills follow the open SKILL.md standard (npx skills add), methodology is a portable AGENTS.md. Works in Cursor / Codex / Gemini / Copilot, not just Claude Code.

6/ Safety: a PreToolUse bash-guard blocks destructive/network/arbitrary-code commands before permission rules — allows `rm -rf dist`, blocks `rm -rf /`.

7/ MIT, independent (not affiliated with Anthropic).
👉 github.com/Neznakometz/StackForge
Feedback + "which stack should I add next?" very welcome.
```

> Attach the demo GIF to tweet 1. Best times: weekday mornings. A short, honest thread beats a hype one.

---

## 5) dev.to / Hashnode — story article

**Title:** `Two ideas that turned my repeated AI-setup into a framework (StackForge)`
**Tags:** `ai`, `claude`, `opensource`, `devtools`

```
Every time I started a new project with an AI coding agent, I did the same chores: install the right skills, write the project rules, and wire up some kind of review so the agent didn't quietly ship something broken. By the third project I was copy-pasting my own config around. So I turned it into a framework — StackForge — and two ideas ended up being the whole point.

## Idea 1: don't trust one model to review itself

On a real project (a SaaS that records and transcribes calls), I started having a second model look at every diff. The flow became: Claude writes the code, then Codex (ChatGPT) and/or Gemini attack the diff through their CLIs, and Claude arbitrates the findings — keep the real ones, discard the noise. It's an asymmetry of roles, not "ask three models and average." It caught a class of bugs a single model kept waving through.

The catch with making this a framework: not everyone has those CLIs. So if neither `codex` nor `gemini` is available, it falls back to a fresh Claude subagent as the external reviewer — different model where possible, clean context. Review is never skipped; external models are an upgrade, not a prerequisite.

## Idea 2: rules from official docs, not from the model's memory

"Use best practices for Laravel" pulls whatever the model absorbed in training — often stale, sometimes wrong. So StackForge ships knowledge packs: short, operational rules paraphrased from first-party documentation, each with a `sources.md` and a `last_verified` date. There are 13 (Laravel, Django, NestJS, Postgres/MySQL, Redis, Elasticsearch/ClickHouse, React, Vue/Nuxt, Tailwind, Docker/K8s, GitLab/Ansible, Grafana/Sentry, Flutter/Riverpod). A weekly CI job opens an issue when a pack hasn't been re-verified in 90 days — because doc-grounded only stays true if you keep it grounded.

## How it fits together

A thin **core** is always installed (the process, reviewers, memory, token discipline). `/init` asks for your stack and assembles the rules — into an `AGENTS.md` (plus a one-line `CLAUDE.md` import for Claude Code). A **domain set** adds specialization: saas, ui, mobile (Flutter + a Unity→Flutter migration kit), games, analytics, storage, spec-prep.

It's cross-agent on purpose. Skills follow the open SKILL.md standard, so `npx skills add Neznakometz/StackForge` installs them into Cursor, Codex, Gemini, Copilot and others; the methodology is a portable `AGENTS.md`. The subagent orchestration and hooks are Claude-Code-native, but the skills, packs, and rules port everywhere.

## Try it

    /plugin marketplace add Neznakometz/StackForge
    /plugin install core@stackforge
    /init

MIT, independent project (not affiliated with Anthropic): https://github.com/Neznakometz/StackForge

Honest about limits: the safety hook is heuristic, not an OS sandbox; and I haven't benchmarked token savings. If you try it, tell me which stack to add a pack for next.
```

---

## 6) LinkedIn (EN)

```
I open-sourced StackForge — a framework that spins up a new AI-coding project in one command.

Three things that make it more than "a pile of slash commands":
• Cross-model review — Claude writes, Codex & Gemini attack the diff, Claude arbitrates. A second model catches what one model misses.
• Knowledge packs from official docs (with sources + a verification date), not "best practices" from training data.
• Cross-agent — works in Claude Code, Cursor, Codex, Gemini via the open SKILL.md standard.

MIT, independent project. Built from real use on production projects.
👉 github.com/Neznakometz/StackForge
```

## 6b) LinkedIn / корп-мессенджер (RU)

```
Выложил в опенсорс StackForge — фреймворк, который разворачивает новый AI-проект одной командой.

Три вещи, которые отличают его от «кучи слэш-команд»:
• Кросс-модельное ревью — Claude пишет, Codex и Gemini атакуют diff, Claude арбитрирует. Вторая модель ловит то, что одна пропускает.
• Knowledge-паки из официальных доков (с источниками и датой сверки), а не «best practices» из памяти модели.
• Кросс-агентность — работает в Claude Code, Cursor, Codex, Gemini через открытый стандарт SKILL.md.

MIT, независимый проект. Собран из реального опыта на боевых проектах.
👉 github.com/Neznakometz/StackForge
```

---

## Sequencing checklist

- [ ] Repo About + topics set
- [ ] Demo GIF in README
- [ ] PR to awesome-claude-code; submit to agentskills.io / Vercel skills / Smithery
- [ ] Launch wave (same 1–2 days): Show HN · Reddit · X thread · LinkedIn
- [ ] dev.to story article (a few days later, links back to the repo)
- [ ] Reply to everything; note which stacks people ask for → backlog
