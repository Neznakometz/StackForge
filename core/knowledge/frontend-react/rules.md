# React + TypeScript — rules
> Targets: React 19 + TS · Source: react.dev · Updated: 2026-06-15

## Rules of Hooks
- Hooks — only at the top level of a component/custom hook; not in loops/conditions/nested functions/`try`, before any early `return`.
- Hooks — only from function components or custom hooks (`useFoo`). A custom hook — prefixed with `use`.

## Purity / immutability
- A component is pure: same input (props/state/context) → same JSX; no side effects during render.
- Props and state — an immutable snapshot of the render; props are read-only, don't mutate.

## You Might Not Need an Effect
- Whatever is computable from props/state — compute it during render, do NOT store it in state synchronized via `useEffect`.
- Don't use an Effect to update state when other props/state change (cascade of re-renders).
- An Effect is only correct for synchronizing with external systems (browser APIs, third-party widgets, network, subscriptions).
- The `set-state-in-effect`, `exhaustive-deps` lints — follow them, don't suppress.

## Lists / state
- `key` — a stable ID from the data, NOT the array index or `Math.random()`.
- Keep state at the lowest common owner; lift it only when it must be shared between siblings.

## Memoization
- `useMemo`/`useCallback` are only useful if the result feeds a `memo`-wrapped child, a hook dependency, or is a genuinely expensive computation. Don't memoize everything.
- **React 19 / React Compiler 1.0** auto-memoizes — for new code rely on the compiler, leave manual `memo/useMemo/useCallback` as an escape hatch. The compiler preserves manual memoization; opt out with `'use no memo'`.

## TypeScript
- Type props with `interface`/`type`; no `any` in exported signatures. Children — `React.ReactNode`.
- Event handlers — a concrete type (`React.ChangeEvent<HTMLInputElement>`).
- `useState` infers the type from the initial value; an explicit generic when `null`.

## Conflicts with
- `frontend-vue-nuxt` (a different front-end framework — one per project).
