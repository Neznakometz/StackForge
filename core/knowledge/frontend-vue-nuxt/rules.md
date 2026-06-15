# Vue 3 / Nuxt 3 — rules
> Targets: Vue 3.5+ / Nuxt 3.x+ + TS · Source: vuejs.org, nuxt.com · Updated: 2026-06-15

## Composition API
- Default — `<script setup>` + Composition API.
- Reactive state — `ref()` (auto-unwrapped in the template, `.value` only in the script).
- Derived — `computed()` (cached by dependencies), not a method (a method recomputes on every re-render).
- Every `v-for` — a unique stable `:key`; a template ref inside `v-for` — a function ref, not an array.

## Props / emits
- `defineProps` / `defineEmits`, preferably type-based (`defineProps<{...}>()`) for TS inference.
- Props — a one-way downward flow; don't mutate a prop, emit an event.
- Vue 3.5+: destructuring from `defineProps` stays reactive; on <3.5 — access via `props.x`.

## Reactivity
- Destructuring/spreading a `reactive` object loses reactivity — wrap with `toRefs()` (or `toRef()`) when returning from a composable.

## Nuxt
- File-based routing (`pages/`), not a manual router. Auto-imports from `composables/`, `utils/`, `components/`, `server/utils/` — don't write imports manually.
- Data — `useFetch` / `useAsyncData` (SSR-safe, passed in the payload, no double fetch on hydration). A unique `key` → dedup. Plain `$fetch` — only for client-only calls in handlers.
- State — `useState(key, init)` (SSR-friendly, survives hydration). NEVER `const x = ref()` at the module top level (state leak between requests on the server). The `useState` value — JSON-serializable.

## Conflicts with
- `frontend-react` (a different front-end framework — one per project).
