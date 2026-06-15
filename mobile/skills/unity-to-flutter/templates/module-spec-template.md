# Module spec: <name>

**Status:** draft / in review / approved (date, owner)
**Ph1 gate decision:** port / simplify / drop — <what exactly is dropped when simplifying>
**Sources:** `audit/behavior/<module>.md`, `design/screens/<...>.md`, <product docs>

## 1. Purpose and boundaries
What the module does in one paragraph. What is explicitly OUT of scope.

## 2. Screens and states
List of screens (links to design/screens/), and for each — states: default / empty / loading / error. A transition diagram if there are > 3 states.

## 3. Behaviour and business rules
Numbered rules, precise and verifiable. Formulas, timings, conditions — as numbers, with a source reference (Unity file:line or doc).

## 4. Data
- Module's local state: schema, migration from Unity keys (link to `audit/data-schema.md`).
- External/server-driven content (if any): contract (link to ADR), sample data.

## 5. Analytics
Event table: name, trigger, parameters.

## 6. Animations and sound
What is animated, durations/curves (tokens), which sounds and when. Links to art briefs.

## 7. Edge cases
Interruption, offline, re-entry, locale change, process kill — expected behaviour for each.

## 8. Acceptance criteria
Checkboxes of the form "when X, Y happens". Every rule from §3 is covered by at least one criterion.

## ⚠️ Source conflicts (resolved)
| # | Conflict | Sources | Owner's decision | Date |
|---|----------|---------|------------------|------|

## 📌 Open questions
Empty before approval — otherwise the spec is not approved.
