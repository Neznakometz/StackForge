# Parity checklist: <module>

**Spec:** <link, version> | **Build:** <commit> | **Reference:** Unity build <version>
**Devices:** iPhone <min>, iPhone current, Android low-end <model>, Android current

## A. Behaviour (from the spec's acceptance criteria)
- [ ] <generated from the spec, one item per criterion>

## B. Visual parity with Figma
- [ ] Colors/typography = tokens (eyedropper ≥5 elements)
- [ ] Layout within ±2dp tolerance on the reference screens
- [ ] Component states (pressed/disabled/loading) = `design/components.md`
- [ ] Small screen and tablet — no layout breakage

## C. Verification against the Unity reference
- [ ] The spec's "as it is now" items match the reference
- [ ] Animation feel/timings are subjectively the same (video side by side)
- [ ] Discrepancies not flagged as intentional: NONE / list

## D. Robustness
- [ ] Incoming call / backgrounding in every key state — correct recovery
- [ ] Process kill — state is restored
- [ ] Offline: behaviour per spec
- [ ] Locale switch EN↔RU: strings switch, layout intact
- [ ] 60fps on low-end Android (profiler, jank ≤2 frames)

## E. Platform/specifics
- [ ] Tap targets ≥ 48dp (Android) / 44pt (iOS)
- [ ] Analytics: events per spec, no extra PII in payload (debug mode)
- [ ] (Children's/regulated) parental gate before leaving the protected space, not brute-forceable

## F. Phase 4 only (release)
- [ ] Data migration: progress/purchases on ≥3 real dumps
- [ ] Purchase restoration through the store
- [ ] Crash-free on beta ≥ 99.5%

**Verdict:** PASS / FAIL · **Bug reports:** <links>
