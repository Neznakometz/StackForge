---
name: web-a11y
description: Web interface accessibility (WCAG) — contrast, keyboard, focus, ARIA, semantics. Apply when building UI and when reviewing the interface.
---

# Web Accessibility (WCAG)

- **Contrast** of text/controls against the background ≥ 4.5:1 (large text ≥ 3:1).
- **Keyboard.** Everything interactive is reachable from the keyboard; logical tab order; a visible focus style (don't remove `outline` without a replacement).
- **Semantics.** Native elements (`button`, `a`, `label`) instead of a `div` with onClick; ARIA only when native isn't enough, and used correctly.
- **Icon buttons** — `aria-label`. Images — `alt` (or an empty `alt` for decorative ones).
- **Forms** — associated `label`, error messages available to screen readers (`aria-describedby`, `aria-invalid`).
- **Motion** — respect `prefers-reduced-motion`.
- **Verification:** axe/Lighthouse in CI; a manual run with keyboard and screen reader over the key flows.
