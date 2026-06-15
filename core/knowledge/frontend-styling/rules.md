# Tailwind / SCSS / Vite — rules
> Targets: Tailwind v4 / Dart Sass 1.80+ / Vite (current) · Source: tailwindcss.com, sass-lang.com, vite.dev · Updated: 2026-06-15

## Tailwind
- Utility-first in the markup — the default; only the CSS of actually used classes is generated.
- Tokens — the `@theme` directive (they become CSS variables + utilities); reference tokens, don't scatter arbitrary `[...]` values everywhere.
- Breakpoints/states — variants (`md:`, `hover:`, `focus:`), not manual media/CSS.
- `@apply` — sparingly, only when you need custom CSS that reuses tokens.
- **v4 CSS-first:** config in CSS via `@theme`, no `tailwind.config.js`; automatic content detection (no `content` array), respects `.gitignore`.

## SCSS
- Only when Tailwind isn't enough (logic, loops, mixins).
- `@use`, NOT `@import` (`@import` is deprecated in Dart Sass 1.80+); `@use` loads a module once and namespaces it.
- Tokens — Sass variables in partials via `@use`. Avoid deep nesting.

## Vite
- Env — `import.meta.env`; only variables prefixed `VITE_` are exposed to the client — secrets without the prefix (they won't end up in the bundle). Types of `VITE_` variables — in `vite/client.d.ts`.
- Code-splitting — dynamic `import()` (a path with `./`/`../` and an explicit extension).

## Vite vs Webpack
- New projects — Vite (native ESM, fast HMR). Webpack — maintaining existing ones; don't migrate without a reason.
