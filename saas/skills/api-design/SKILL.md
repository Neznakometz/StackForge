---
name: api-design
description: REST/HTTP API design for SaaS — endpoints, validation, errors, versioning, contracts. Apply when creating or changing an API.
---

# API Design

Contract discipline (schema is the single source of truth, types derived from the schema) lives in the core `contracts` skill. Here — rules for the API itself.

- **Validate at the boundary.** Every input is validated against a schema before business logic; invalid → 4xx with a machine-readable error code. Responses are validated against a schema too (on both sides).
- **Errors are typed.** Domain errors are classes; the user gets a human-readable message + a stable code; Sentry gets full context. Don't leak stack traces / internal details outward.
- **Idempotency and side effects.** A POST with a side effect — idempotency key wherever retries are possible. GET has no side effects.
- **Pagination/limits** on all listings; rate limiting on sensitive endpoints.
- **Versioning** — prefix (`/v1`); a breaking change = a new version, not editing the old one.
- **Security** (see `security-auditor`): authz on every protected route, no IDOR (access via someone else's id), multi-tenant scoping (see the `multitenancy` skill).
- **Heavy work goes to workers** (`background-jobs` skill): no ASR/LLM/ffmpeg/heavy computation in the request handler.
