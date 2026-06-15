---
name: design-system
description: Design system and tokens for web UI — colours, typography, spacing, themes, components. Apply when styling, building components, and working with themes.
---

# Design System

- **Tokens only.** Colours, spacing, radii, shadows, typography, durations — from the design system's tokens, not magic values in components. Hardcoded hex/px is a review bug.
- **Themes.** If dark mode is supported, every component has a variant; check both.
- **Check whether it already exists.** Before creating a component, `scout` the component library; don't breed duplicates.
- **Component states** consistent with the design spec: default/hover/pressed/disabled/loading.
- **Contrast and sizes** follow accessibility (the `web-a11y` skill).
- **Start from ready-made tokens** — `ui/templates/tokens.css` + the `design-tokens` skill; numeric scales — `visual-craft`.

> External installable skills reinforce this layer: `shadcn-ui` (project-aware generation from `components.json`), `web-design-guidelines` (UI audit against 100+ rules), `canvas-design` (posters/covers/infographics in code). Installed separately via `npx skills` / `/plugin`.
