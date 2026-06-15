# ui — domain set

Interface design on top of the core. Not just review — it **generates** professional UI out of the box.

## What's inside (ours)

- **Agent `ui-designer`** — generative: brief/spec → layout + components + states + tokens, a two-pass cycle (concept → self-critique against AI slop → assembly → check against the craft).
- **`visual-craft`** — numeric rules (Refactoring UI / Material 3 / HIG / WCAG): the 4/8px scale, type hierarchy, ~9 shades per hue, AA contrast, "light from above" shadows, states, tap targets.
- **`design-tokens`** + **`templates/tokens.css`** — a drop-in token set (slate+indigo, light+dark, passes AA), three layers (primitives/semantics/components), the "tokens only" rule.
- **`shadcn-vue`** + **`templates/tokens-shadcn.css`** — shadcn-vue plumbing (Vue/Nuxt) and a bridge of tokens into shadcn names (`--background`/`--primary`/…); the same bridge also works for shadcn/ui on React.
- **`ui-architecture`**, **`web-a11y`** — structure and accessibility.
- From the core: the **`design-reviewer`** agent (check against the spec/tokens).

## Quality cycle: generate → audit → review

`ui-designer` assembles → `web-design-guidelines` (Vercel, audit of 100+ rules) → `design-reviewer` + live-review (Playwright) verify. Ours here is generation and tokens; audit/review — with the best external tools.

## Professional external solutions (reference, installed separately)

| What | From | Why |
|------|------|-----|
| `frontend-design` | Anthropic (`anthropics/skills`) | the canon of design philosophy (we don't duplicate — take it as is) |
| shadcn skill + `npx shadcn mcp init` | shadcn (ui.shadcn.com/docs/skills) | project-aware generation from `components.json` |
| `mattbx/shadcn-skills` | GitHub, MIT | search across 30+ registries + audit against shadcn patterns |
| `web-design-guidelines` + `react-best-practices` | Vercel (`vercel-labs/agent-skills`), MIT | portable UI/React audit |
| OneRedOak `design-review` (+ Playwright MCP) | GitHub | live design-review in the browser |
| Figma Dev Mode MCP / Framelink Figma-Context-MCP | Figma / GLips | design-to-code from Figma |

The generation canon is ONE (`frontend-design`), don't stack three overlapping ones. Our `ui-designer` builds on it + adds numeric craft and tokens for our stack.
