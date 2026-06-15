---
name: design-tokens
description: Setting up and applying the project's design-token system. Apply when initializing UI, styling, and under the "tokens only, no hardcoding" rule. Provides a ready-made starter token set.
---

# Design Tokens

So the agent has something to build on from day one (instead of hardcoding hex), the project starts with a ready-made token set.

## Start
1. Copy `ui/templates/tokens.css` into the project (e.g. `src/styles/tokens.css` or `packages/ui`). This is a neutral professional default (slate greys + indigo, light+dark, passes WCAG AA) — usable as is, customizable to the brand.
2. Import it once at the root of the styles.
3. Tailwind v4: move the values under `@theme` with Tailwind prefixes (`--spacing-*`, `--radius-*`, `--text-*` + `--text-*--line-height`, `--color-*`, `--shadow-*`) — the utilities (`p-4`, `rounded-md`, `text-base`, `bg-surface`, `shadow-md`) generate themselves; dark mode — via a `.dark`/`data-theme` override.

## Three token layers
- **Primitives** — raw values (`--gray-700`, `--primary-600`, `--space-4`).
- **Semantic** — purpose (`--surface`, `--text-muted`, `--accent`, `--border`). Components use THIS layer → free dark mode and rebranding in one place.
- **Component** (optional) — for a specific component, if needed.

## Rules
- **Tokens only.** Colours/spacing/radii/shadows/typography — from tokens. Hardcoded hex/px in a component is a review bug (caught by `design-reviewer`: `Grep #[0-9a-fA-F]{3,6}`).
- In components, pull **semantic** aliases (`var(--surface)`), not raw ramps.
- Brand customization — change the values of primitives/semantics, don't breed new ones in components.
- Changing a scale (e.g. a different primary) — in one place; Grep over usages afterwards.
- Numeric foundations of the scales — the `visual-craft` skill.

## shadcn (React and Vue)
So that shadcn/ui (React) or shadcn-vue components inherit our palette — import `templates/tokens-shadcn.css` AFTER `tokens.css`. It bridges our tokens to the names shadcn expects (`--background`, `--primary`, `--muted-foreground`, `--border`, `--radius`) + `@theme inline` for Tailwind v4. One bridge for both frameworks (the nomenclature is shared). Setting up shadcn-vue — the `shadcn-vue` skill.
