---
name: ui-architecture
description: UI component and frontend architecture — structure, states, separation of logic and presentation. Apply when building screens and web interface components.
---

# UI Architecture

- **Logic separate from presentation.** Business logic lives in hooks/stores/composables, not in JSX/templates. A component renders, it doesn't compute.
- **States are mandatory.** Every screen/component with data implements: loading (skeleton, not a bare spinner) · empty · error · success. A missing state is a review bug.
- **Components are reusable and free of required side effects.** Props are typed; no required props without defaults where avoidable.
- **Accessibility from the start** (see the `web-a11y` skill), not an after-the-fact patch.
- **Design via tokens only** (see the `design-system` skill): hardcoded hex/px is a review bug.
- **i18n from the start:** strings via dictionaries, not hardcoded.
- **Performance:** don't ship needless code to the client; lazy boundaries, memoization where needed (not everywhere). Stack specifics (RSC, useMemo, Nuxt islands) come from the stack's knowledge pack.
