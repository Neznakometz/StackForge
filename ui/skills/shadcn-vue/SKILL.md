---
name: shadcn-vue
description: Setting up and using shadcn-vue in a Vue 3 / Nuxt project — CLI, components.json, Reka UI, tokens, hydration pitfalls. Apply when building UI on Vue/Nuxt with shadcn-vue components.
---

# shadcn-vue (Vue 3 / Nuxt)

The Vue counterpart of shadcn/ui: Tailwind v4 + **Reka UI** (unstyled primitives). Not an npm library — the CLI copies component sources into the project (you own the code).

## Installation
1. Tailwind v4 in the project (see the `frontend-styling` pack).
2. Initialization: `npx shadcn-vue@latest init` — installs dependencies, adds the `cn` utility, configures CSS variables, writes `components.json` (framework, aliases, icons, path). To the "CSS variables for colors?" question — **yes**.
3. Nuxt: use the `shadcn-nuxt` module; wire global CSS via `nuxt.config` (`css: [...]`). Vite-Vue: import in `main.ts`.
4. Adding components: `npx shadcn-vue@latest add button card …` (project-aware — reads `components.json`).

## Tokens (we inherit our palette)
Import at the root of the styles in order:
1. `templates/tokens.css` — our tokens (light+dark, AA).
2. `templates/tokens-shadcn.css` — the bridge: our tokens → shadcn names (`--background`, `--primary`, `--muted-foreground`, `--border`, `--radius`…) + `@theme inline` for Tailwind v4.

After this, shadcn-vue components (`bg-background`, `bg-primary`, `text-muted-foreground`) render in our palette, dark mode — via `.dark`/`data-theme` automatically. Brand customization — change primitives in `tokens.css` without touching components.

## Pitfalls (Nuxt SSR)
- `reka-ui` may break on undefined/hydration — transpile the library in `nuxt.config` (`build.transpile`) or wrap the problematic component in `<ClientOnly>`.
- Reactivity/state — per the `frontend-vue-nuxt` pack (Composition API, `useState`); business logic outside the component (`ui-architecture`).

## Rules
- Before a custom component — check whether there's a ready one in shadcn-vue/registries (the `design-system` skill, `scout`).
- Tokens only, no hardcoding (`design-tokens`); numeric scales — `visual-craft`; accessibility — `web-a11y`.

> The same `tokens-shadcn.css` bridge also works for shadcn/ui on React — the variable nomenclature is shared.
