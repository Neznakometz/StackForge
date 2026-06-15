# Redis / Memcached — rules
> Targets: Redis 7+/8 / Memcached 1.4+ · Source: redis.io/docs, docs.memcached.org · Updated: 2026-06-15

## Cache patterns
- **Cache-aside** for read-heavy: read from cache → miss → primary → write back; on update write to primary and invalidate the key.
- ALWAYS set a TTL (`SET ... EX/PX`) — it bounds the staleness window. Don't cache without expiry.
- Keys — namespace/structure (`cache:{entity}:{id}`); cache only what is actively requested, without unbounded key growth.

## Invalidation / stampede
- Explicit invalidation on write (`DEL`).
- Protect against cache stampede (a popular key expires under load → a crowd hits the DB): atomically via Lua/`EVAL` — a mutex lock or probabilistic early refresh / TTL jitter.

## Redis specifics
- Right structure: Hash (`HSET`/`HGET`) or JSON for partial fields (no re-serialization of the whole object); Sorted Set for leaderboards/ranges.
- Persistence: RDB (snapshots) + AOF (write log) — both recommended in production. Use as a primary store only with deliberate persistence.
- Pub/Sub — fire-and-forget without replay; if you need durability/replay → **Streams** (consumer groups).

## Memcached specifics
- Pure KV: key + TTL + flags + raw data, no structures. Need partial updates → Redis.
- Eviction — segmented LRU; an item may be evicted even with a live TTL.
- Default item maximum — **1MB** (the `-I` flag for more, but storing >1MB is not recommended).

## When to use which
- Memcached — a simple multithreaded KV cache with LRU.
- Redis — structures, partial updates, persistence, pub/sub/streams, Lua (stampede), plus sessions/rate-limit/queues on one instance.
