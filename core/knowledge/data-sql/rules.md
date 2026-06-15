# PostgreSQL / MySQL — rules
> Targets: PostgreSQL 14+ / MySQL 8.0–8.4 · Source: postgresql.org/docs, dev.mysql.com/doc · Updated: 2026-06-15

## Indexes
- Composite index: equality columns first (leftmost); put a low-selectivity equality column before a range column. Indexes >3 columns are rarely useful — keep them short.
- Covering index — non-key columns via `INCLUDE` (index-only scan). Don't `SELECT *` — it defeats the index-only scan.
- Partial index (PG) — a `WHERE` predicate to index only the needed subset. Caution: parameterized conditions (`x < ?`) don't match a partial index. Don't use it as a substitute for partitioning.
- Don't overdo it: every index slows writes and consumes space. Find bad plans via `EXPLAIN` / `EXPLAIN ANALYZE`.
- MySQL: comparing columns of different charsets blocks the index (utf8mb4 vs latin1) — convert to one charset.

## Queries
- Parameterized queries / prepared statements only; never concatenate user input (injection protection — the value is not interpreted as SQL).
- Keyset pagination (`WHERE id > :last ORDER BY id LIMIT n`) instead of a large `OFFSET`.
- N+1 — batch at the application level (`IN (...)`/join).

## Schema / migrations
- Migrations are forward-only, in the same change as the code.
- Zero-downtime column addition: nullable/with default → backfill in batches → `NOT NULL`/constraint as a separate step.
- FK columns in PG are not indexed automatically — add an index (otherwise slow joins and locks).
- MySQL: the **InnoDB** engine (transactions, row locks), charset **utf8mb4** (not utf8mb3). Remember InnoDB prefix-index limits.

## Postgres specifics
- Multitenancy — **RLS** (row security policies), scoped by tenant at the DB level. Non-`leakproof` functions are not pushed under RLS (affects indexes). RLS does not apply to materialized views.
- JSONB — **GIN** index (`jsonb_ops`; `jsonb_path_ops` is smaller/faster for `@>`). GIN updates are slow.
- Materialized views don't auto-refresh — `REFRESH MATERIALIZED VIEW`, they can't be updated directly.

## Transactions / pool
- Multi-statement — explicit transactions, correct isolation (default Read Committed).
- A connection pool is mandatory (PgBouncer/application pool) — don't open a connection per request.
