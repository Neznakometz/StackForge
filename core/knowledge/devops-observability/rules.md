# Grafana/Loki / Sentry — rules
> Targets: Loki 3.x / Sentry (current) · Source: grafana.com/docs/loki, docs.sentry.io · Updated: 2026-06-15

## Grafana / Loki
- Loki indexes **labels, not content** — keep label cardinality LOW. Good labels describe the source: region, cluster, server, app, namespace, environment (bounded values).
- Dynamic labels — sparingly, with bounded values (a few to a few dozen). Don't use a label with unbounded values (a tenant < ~100k active streams).
- **Don't put high-cardinality fields in labels** (`requestId`/`user_id`/trace id). Instead:
  - **LogQL** filter expressions (`|= "text"`, `|~ "regex"`) — "schema at query";
  - or **structured metadata** for frequently-searched high-cardinality fields (without bloating the index).
- Structured logs (`key=value`); dashboards/datasources — via provisioning (as code).

## Sentry
- At init set **`environment`** (separate prod/staging) and **`release`** (otherwise the SDK guesses) — the release enables regressions and commit linking; a new-release event on a closed issue = a regression.
- Source maps for JS (readable stack traces). A sample rate for performance (`tracesSampleRate`) — control over volume/cost. Context: tags, user, breadcrumbs.
- **Don't send secrets/PII.** Data scrubbing: `before_send`/`before_send_transaction` in the SDK; the default filters passwords/auth/sessions/cookies/CSRF; `send_default_pii=False` — also PII (IP). Server-side and Advanced (regex) scrubbing are available.

## General
- Structured logs; never log secrets/tokens/keys/PII/transcript content. Alert on SLOs, not on noise.
