---
name: background-jobs
description: Background jobs and queues for SaaS — workers, retries, idempotency, dead-letter. Apply for heavy/async work (media processing, external APIs, mailings, reports).
---

# Background Jobs

- **Heavy work only in workers.** No long/heavy calls in API handlers (media, LLM/ASR, report generation, bulk mailings). The API enqueues a job and responds quickly.
- **Idempotency.** A job may run again (retry, duplicate delivery) — write it so that a repeat doesn't corrupt data (upsert, an "already done" check).
- **Retries with backoff** + an attempt limit → dead-letter/failure queue, alert. Don't retry forever.
- **Timeouts** on external calls; a job doesn't hang forever.
- **No secrets/PII in job logs.** Progress of long jobs — via checkpoints, so it survives restarts.
- **External providers — through interfaces** + a mock implementation (as in the core rules): the worker's business code does not import the SDK directly.
- **Observability:** queue metrics (depth, latency, fail rate) in Grafana/Sentry.
