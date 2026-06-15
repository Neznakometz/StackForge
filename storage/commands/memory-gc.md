---
description: Manual cleanup of durable memory (L3) — backup, deletion of the outdated, deduplication, normalization.
---

Memory cleanup (manual, not on cron):

1. Back up `agent-memory.md` → `agent-memory-backup-YYYY-MM-DD.md`.
2. Delete records older than 30 days without `permanent/important/keep` markers.
3. Deduplicate: one topic → keep the newer, delete the older.
4. Normalize dates to YYYY-MM-DD format.
5. Write the cleaned file, report: "N records → M, deleted K".

Run it deliberately, when the memory feels cluttered. Don't touch marked records.
