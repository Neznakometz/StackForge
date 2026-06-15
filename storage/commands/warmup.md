---
description: Warming up the knowledge cache — short summary cards of recently changed documents for fast search without reading the whole thing.
---

Cache warmup (after /dream or manually before working with a large docs base):

1. Find .md files (vault/docs) changed in the last 7 days (newest first, at most 10).
2. For each, create a 3–5 sentence summary, save it to `warmup-cache/<filename>`.
3. Skip a file if the card is fresher than the source (card mtime ≥ source mtime).
4. Report: "processed N, skipped M".

When searching the base, look in `warmup-cache/` first — use the card; read the original only if there's no card or it's stale. Saves context on large bases.
