<!-- Demo recording script for the README GIF. Working doc, not part of the framework. -->

# StackForge — 60-second demo script

Goal: in the first 5 seconds show the hook (one command → stack-aware setup), then the
differentiator (cross-model review). Front-load value; trim every idle second.

## Production route — pick one

- **A) Terminal GIF (simplest).** `asciinema` records the terminal, `agg` turns it into a GIF. No captions, but small and crisp. Best for a README.
- **B) Screen recording (more polished).** [Kap](https://getkap.co) or QuickTime → edit in iMovie/CapCut to add text captions and speed-ramps. Use this if you want on-screen labels.

## Pre-production (do before recording)

- Terminal window ~**100×30**, font **16–18pt**, a clean dark theme, and a **minimal prompt** (hide git noise): `export PS1="$ "`.
- A throwaway project dir: `mkdir ~/demo-shop && cd ~/demo-shop && git init -q`.
- Pre-install StackForge so the GIF doesn't spend 10s on the marketplace (show install as ONE line, then cut): have `core` already installed.
- Decide the stack you'll pick in `/init`: e.g. **Node/NestJS + Postgres** (fast to show) or **Laravel + Vue**.
- Have one tiny task ready in the plan so `/next-task` produces a short, reviewable diff.

## Shot list (target ~55–60s)

| Time | On screen | Beat / why |
|------|-----------|-----------|
| 0:00–0:04 | Type `/plugin install core@stackforge` → it confirms | The hook: one command. |
| 0:04–0:18 | `/init` → the **multi-select stack questionnaire** appears; pick language/framework/DB; it says "assembling AGENTS.md…" then "✓ CLAUDE.md import written" | The visual magic — stack-aware setup. This is the most screenshot-able moment. |
| 0:18–0:24 | `cat AGENTS.md` scrolls a few lines — real, stack-specific rules with a `last_verified` date visible | Proof the rules are doc-grounded, not generic. |
| 0:24–0:40 | `/next-task` → a short diff is written (trim the "thinking"); then **cross-model review** runs: a line like `codex review → 1 finding: missing tenant scope on query (file:line)` | The differentiator. The wow. Keep the finding short and real. |
| 0:40–0:50 | The fix goes in; `test-runner` → `PASS`; PROGRESS.md updated | Closes the loop: review → fix → green. |
| 0:50–0:58 | Quick `/stackforge` → status (sets/stack/packs) | Shows breadth in one frame. |
| 0:58–1:00 | Freeze on the repo URL or the StackForge logo line | Call to action. |

Keep total ≤ 60s. If a beat runs long, cut idle time (next section) rather than rushing the typing.

## The single most important beat

The **cross-model review catching something** (0:24–0:40). Make it a *real, small* finding — e.g. a query missing a tenant/owner scope, or a missing null check. One line in, Claude arbitrates, one line fixed. That 8-second beat is what makes people install. If a full live run is too slow for a clean GIF, record it separately, trim hard, and it's fine.

## Recording (route A, terminal GIF)

```bash
brew install asciinema agg gifsicle
asciinema rec demo.cast          # do the shot list; Ctrl-D to stop
# trim idle time so it doesn't drag (agg honors this flag):
agg --idle-time-limit 1 --font-size 18 --speed 1.2 demo.cast demo.gif
# shrink for the README:
gifsicle -O3 --lossy=60 --colors 128 demo.gif -o demo-opt.gif
```

- `--idle-time-limit 1` collapses any pause >1s to 1s — kills dead air from agent thinking.
- `--speed 1.2` gently speeds the whole thing up.
- Aim for **< 4–5 MB** so GitHub renders it inline; gifsicle's `--lossy`/`--colors` get you there.

## Add to README

Put it right under the tagline / language switcher:

```md
<p align="center"><img src="demo-opt.gif" alt="StackForge: one command → stack-aware setup → cross-model review" width="760"></p>
```

Commit the GIF (`git add demo-opt.gif`). Keep the raw `demo.cast` out of the repo (or in a `media/` you gitignore).

## Fallback if a live agent run is too slow/messy

Don't fake output, but you can **show the artifacts** instead of a live run:
- `/init` live (fast, reliable) → then `cat AGENTS.md` and `cat .claude/settings.json` to show what it produced.
- For the review beat, show a real transcript snippet you captured earlier (a genuine `codex review` finding from one of your projects), as a short scroll. Real, just pre-recorded.

## One-line captions (route B only)

- "One command. Stack-aware setup." (over /init)
- "Rules from official docs — with a verified date." (over cat AGENTS.md)
- "A second model reviews every diff." (over cross-model review)
- "Works in Claude Code, Cursor, Codex, Gemini." (end card)
