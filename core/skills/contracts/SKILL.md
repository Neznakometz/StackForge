---
name: contracts
description: The order for changing API contracts, DB schemas, and UI tokens. Apply for any change to DTOs, tables, or appearance.
---

# Contracts

API / DTO:
1. First the schema in a single place (single source of truth — e.g. `packages/shared`), types are derived from the schema, not duplicated.
2. Then the server (request and response validation by the schema), then the client.
3. Changed the schema — Grep over all usages, update all sides in a single commit.

DB:
- Only via migrations (drizzle-kit / Prisma / Alembic — depending on the stack), in the same PR as the code. Manual SQL in prod — not allowed.
- Multitenant tables must have a tenant/owner column + an index on it.

UI:
- Colors/spacing/radii — only design-system tokens. Before creating a component, check with `scout` whether it already exists.
- New UI strings — immediately into all i18n dictionaries.

LLM prompts (if any):
- Only separate files (`prompts/*.md`), not strings in code; a prompt change — a separate commit (for rollback).
