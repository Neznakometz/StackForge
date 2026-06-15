---
name: fusion
description: Multi-model generation — run a task through several models (Claude + Codex/ChatGPT + Gemini) and synthesize the best answer. Apply to complex non-technical/research tasks where different points of view are valuable.
---

# Fusion — multi-model generation

Run a single query through several models in parallel, analyze the strengths of each answer, and synthesize the best one. For cross-review of CODE — the separate core skill `cross-model-review` (it has the Claude-writes/external-attacks asymmetry); here it's generation and synthesis.

## Two modes

**lite (no dependencies):** fan-out to Claude subagents with different models (opus/sonnet/haiku) and/or different angles (optimist/skeptic/pragmatist). Cheap, always available; diversity by size/angle, not by vendor.

**full (cross-vendor):** queries to Codex and Gemini via their CLIs (`codex`, `gemini`) + Claude, in parallel. Real model diversification. Requires the CLIs installed with active authorization.

## Process

1. Formulate a single prompt.
2. Fan-out: 3–5 generations (models/angles). No more — after 3–4 there are diminishing returns.
3. **Synthesis (Claude as judge):** identify the strengths/weaknesses of each answer, assemble the best combined one; contradictions between models — surface them explicitly, don't average blindly.
4. Return the synthesis + (on request) a short table of "what was taken from which model".

## When to apply

Strategy/analysis/research/creative, where different points of view are valuable. NOT for routine — fusion is expensive (N calls) and slow. Quality comes from a good judge, not from the number of models.
