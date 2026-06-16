---
name: visual-craft
description: Concrete rules of visual design — spacing, typography, colour, depth, states, polish. Apply when building any UI so the interface looks professional out of the box. Numbers and scales, not fluff.
---

# Visual Craft

Sources: Refactoring UI, Material 3, Apple HIG, WCAG. The philosophical canon ("no AI slop, bold-but-restrained, tokens-first") is the external `frontend-design` skill (Anthropic); here is the executable numeric layer.

## Spacing and layout
- One scale, base 4px: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. No off-scale values (13px, 20px).
- Start with excess whitespace, then remove it — dense by default looks unfinished.
- Don't distribute space evenly — group by proximity: a label sits closer to its own field than to the neighbouring one.
- Semantics: 4px = fused (icon+text), 8px = related, 16px = default, 24px = between groups, 32–48px = sections, 64px+ = page regions.
- Prose: 45–75 characters/line (~65ch max width). Don't stretch an element to the container's full width without need.

## Typography
- 1–2 font families. Sizes from a modular scale (`12,14,16,18,20,24,30,36,48`), not arbitrary px. Body ≥ 16px.
- Hierarchy = weight + colour + size together, not size alone. 2–3 weights (400/500-600/700), nothing <400 for body.
- Line-height inverse to size: headings ~1.1–1.2, body ~1.5. ALL-CAPS/small labels — positive tracking; very large headings — slightly negative.
- Don't centre text longer than 2–3 lines (left-align); numeric columns — right-aligned / tabular-nums.

## Colour
- A palette is not 5 hex. About 9–10 shades per hue (50→900). Greys first: a full neutral ramp is the workhorse (most of the UI is grey, not colour).
- Give greys a slight temperature (a touch of blue = techy). Author shades via HSL.
- Semantics: primary/accent + success/warning/danger/info, each as a ramp. Use accent sparingly (one main action per screen).
- Hierarchy by colour: primary text dark, secondary mid, tertiary light. **Not pure black** text (`#0f172a`, not `#000`).
- Don't convey meaning with colour alone (pair an icon with text). AA contrast: body **4.5:1**, large text **3:1**, UI components/borders/focus **3:1**.

## Depth
- Light from above: raised — light top / shadow below; recessed — the reverse.
- Shadow scale (sm→xl): small and sharp = close to the surface, large and soft = higher/more important. Separate regions with ONE method (shadow / border / background contrast) — the lightest one that works.
- Emphasize by dimming the surroundings, not just by enlarging the focus.

## Components and states
- Every interactive component — ALL states: default / hover / focus-visible / active / disabled / loading (+ selected/error where needed). A missing state means unfinished.
- One radius scale (`4/8/12/16/9999`); nested radius = outer − padding. Buttons/inputs — a shared rhythm of height (~40px) and padding.
- Data screens: design empty / loading / error. Loading — a **skeleton**, not a bare spinner.
- Tap targets ≥ 44px (iOS 44pt / Android 48dp); expand the hitbox with padding.

## Polish (what makes it "design")
- One icon set, uniform size and stroke (20/24px, 1.5–2px). Don't stretch icons/logos.
- A visible focus ring (`:focus-visible`, ≥3:1); not `outline: none` without a replacement. Respect `prefers-reduced-motion`, durations 150–250ms.
- Real content, not lorem (design for the longest/empty strings: long names, `$0`, `9999+`). Hairline borders — low-contrast.

## Anti-slop checklist (MUST / SHOULD / NEVER)
Imperative review rules that catch the "AI-generated" look. Token-first; the examples below are Tailwind, adapt to your stack.

- **MUST:** full-height = `100dvh` (`h-dvh`), not `100vh` (mobile URL bar). One accent colour per view. `aria-label` on icon-only buttons. A confirm dialog (e.g. `AlertDialog`) for destructive actions, never a bare button. Visible `:focus-visible` ring.
- **SHOULD:** `text-balance` on headings, `text-pretty` on body; `tabular-nums` for numbers in tables/timers; a fixed z-index scale (no random `z-[9999]`); square sizing via one token (`size-*`) instead of separate w/h; respect `prefers-reduced-motion`.
- **NEVER:** purple/indigo gradients as the default "hero" look; glow/neon as an affordance; pure black (`#000`) text/shadows; identical card grids as the only layout; centered long paragraphs; emoji as UI icons; `outline: none` without a replacement.

> A starter token set covering all these scales is `ui/templates/tokens.css` (light+dark, passes AA). See the `design-tokens` skill.
