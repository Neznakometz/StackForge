# ElasticSearch / ClickHouse — rules
> Targets: Elasticsearch 8.x / ClickHouse 25+ · Source: elastic.co/guide, clickhouse.com/docs · Updated: 2026-06-15

Both are **secondary stores**, fed from a primary OLTP DB (Postgres/MySQL); not a source of truth — design for reindex/rebuild from the primary.

## ElasticSearch
- Explicit **mappings**, don't rely on dynamic in production (types are nearly immutable after creation).
- Field type by purpose: `text` — analyzed full-text; `keyword` — exact match/sort/aggregations (email, statuses, tags). Need both search and aggregation — `text` + a `.keyword` sub-field.
- Index in batches via the **Bulk API**, not document-per-request.
- Don't go into deep pagination: `from`+`size` are capped at 10,000 (`index.max_result_window`); deeper — **`search_after`** (optionally with PIT). Deep `from/size` loads all previous pages into memory.

## ClickHouse
- **OLAP, not OLTP**: columnar, millions of rows/s on bulk, but inefficient for row-by-row mutations. Analytics, not transactions.
- Engine — the **MergeTree** family (`MergeTree`/`ReplicatedMergeTree`/`ReplacingMergeTree`/`AggregatingMergeTree`); data is sorted by primary key.
- `ORDER BY` = the sparse PK / on-disk order — choose it by filtering patterns (low-cardinality, frequently filtered columns first).
- **Batch inserts** (1k–100k rows, ~1 insert/sec), not frequent small ones — each insert creates a part, small ones → "too many parts". No client-side batching → `async_insert=1, wait_for_async_insert=1` (not `=0` — risk of data loss).
- Synchronous MergeTree inserts are idempotent (dedup) — safe to retry with an identical batch.
- Rollups/aggregations — incremental **materialized views** (computed on insert, not on query).

## When to use which
- Elasticsearch — full-text, relevance, log search, facets.
- ClickHouse — high-volume analytical aggregations / time series.
