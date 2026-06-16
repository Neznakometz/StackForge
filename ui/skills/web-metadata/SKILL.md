---
name: web-metadata
description: Page metadata for web — title/description, canonical, Open Graph, Twitter cards, JSON-LD structured data, robots/sitemap. Apply when building or auditing pages, landing pages, and shareable links (SEO and social previews).
---

# Web metadata (SEO & social)

Sources: HTML living standard, Open Graph protocol (ogp.me), schema.org, Google Search Central.

## Core (every page)
- Unique `<title>` (~50–60 chars) and `<meta name="description">` (~150–160 chars) per page — not a single global default.
- `<link rel="canonical" href="…">` — absolute URL; prevents duplicate-content splitting. One canonical per page.
- `<meta name="viewport" content="width=device-width, initial-scale=1">`, correct `<html lang>`, charset utf-8.
- `<meta name="robots">` — `index,follow` for public pages; `noindex` for private/staging/duplicate. Ship a `robots.txt` + `sitemap.xml`.

## Social previews
- **Open Graph** (Facebook, LinkedIn, Slack, etc.): `og:title`, `og:description`, `og:type`, `og:url` (canonical), `og:image` (absolute URL, ~1200×630, <5MB), `og:site_name`, `og:locale`.
- **Twitter/X cards:** `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`. Falls back to OG if omitted, but set `twitter:card` explicitly.
- Test previews before shipping (e.g. social debuggers); a broken/missing `og:image` makes shared links look unfinished.

## Structured data
- **JSON-LD** (`<script type="application/ld+json">`) with schema.org types relevant to the page: `Organization`/`WebSite` (home), `Article`/`BlogPosting`, `Product`, `BreadcrumbList`, `FAQPage`. Match the visible content (no markup for things not on the page).
- Validate against schema.org / rich-results expectations.

## Framework notes
- Next.js: the Metadata API (`export const metadata` / `generateMetadata`) — per-route, not hardcoded in one layout.
- Nuxt: `useHead` / `useSeoMeta` per page.
- Don't hardcode strings — use i18n + data; dynamic pages generate metadata from their data.

## Anti-patterns
- Same title/description on every page; missing canonical; relative `og:image`; JSON-LD that doesn't match the page; `noindex` accidentally left on production.
