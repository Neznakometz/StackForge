---
name: rag
description: Retrieval-Augmented Generation — chunking, embeddings, vector storage, search and reranking. Apply when building search over knowledge/documents, Q&A over a corpus, semantic search.
---

# RAG (retrieval-augmented generation)

## When RAG is needed / not needed
- Needed: a large knowledge/docs corpus that doesn't fit in context and changes; you need fresh/private data with citation.
- NOT needed: the data fits in context; the task is about code (a code index is better, see the `long-context` skill); a one-off question (direct search is simpler).

## Pipeline
1. **Chunking.** Cut by meaning (sections/paragraphs), not by fixed characters blindly; a reasonable chunk size + overlap so you don't tear a thought apart. Keep metadata (source, section) for citation and filters.
2. **Embeddings.** One embedding model per corpus (query and documents — by the same model). Version it: changing the model → reindexing.
3. **Storage.** pgvector (if Postgres already exists) or Qdrant. Index — **HNSW** by default (good recall without tuning `lists`, parameters `m=16, ef_construction=200`); IVFFlat — only for very large, rarely changing data for the sake of build speed/memory. **Don't create an index on an empty table** (k-means centroids on empty data → a broken index) — load the data first.
4. **Search.** Query understanding (intent/filters/tenant) → optional lexical prefilter → ANN top 50–200 → **reranking** by exact distance + metadata → top-k into context.
5. **Hybrid.** Semantic + full-text (BM25/FTS) via Reciprocal Rank Fusion (RRF) — noticeably better on terms/exact matches.
6. **Generation.** Into the answer — only the retrieved chunks, each statement with a link to the source; don't mix the model's memory in as fact.

## Multitenancy/security
- Scope the search by tenant (a filter in the query/metadata) — don't hand back someone else's chunks.
- Don't index secrets/PII.
