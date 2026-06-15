---
name: multitenancy
description: Multi-tenant data isolation in SaaS — scoping by tenant/workspace, protection against cross-tenant leakage. Apply when working with the database, queries, and data access.
---

# Multi-tenancy

- **Every data query is scoped by tenant** (`workspace_id`/`tenant_id`/`owner_id`) from the auth context. A query without a scope is a review error and a critical vulnerability (leaking someone else's data).
- **Tenant from the context, not from the input.** The tenant identifier is taken from the verified session/token, NOT from the request body/params (otherwise IDOR).
- **Column + index.** Every table with tenant data has a tenant column + an index on it (see the core `contracts` skill).
- **Secure by default.** Prefer a mechanism that makes scoping automatic (global scope/RLS/middleware) over a manual `where` in every query. A manual scope is easy to forget.
- **Cross-tenant operations** (admin panel, analytics) — explicit, separate, audited; not the common path.
- **Tests:** for every protected resource — a "tenant A cannot see tenant B's data" test.
