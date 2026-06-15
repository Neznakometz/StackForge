# MCP and external tools — map

The framework **does not bundle** MCP servers: they are tied to accounts/keys/machine and are installed once by you. All skills work **without** them — MCP only enhances. Below — what to optionally connect for which set.

## Principle
- A set must work without any MCP (graceful degradation is built in).
- MCP/connectors are installed via Claude Code (`/plugin`, `claude mcp add`) or the connector registry — with your credentials.
- Cross-model review is a **CLI** (`codex`, `gemini`), not MCP: it needs an installed CLI with active authentication.

## Map

| Set | Optional MCP / tool | Connection | What it gives | Without it |
|-------|------------------------|-------------|----------|----------|
| **core** (cross-model-review) | Codex CLI, Gemini CLI (*CLI, not MCP*) | install the CLI + authenticate | an external code reviewer (Codex/Gemini) | review only by Claude's internal agents |
| **ui** | Figma Dev Mode MCP (paid seat) / Framelink Figma-Context-MCP (free token) | `claude plugin install figma@claude-plugins-official` / `figma-developer-mcp` | design-to-code from Figma | design from DESIGN_SPEC/tokens |
| **ui** | Playwright MCP | `claude mcp add` Playwright | live design review in the browser (screenshots, a11y) | static diff review |
| **ui** | shadcn MCP | `npx shadcn@latest mcp init` | project-aware component selection/installation | CLI `shadcn-vue add` manually |
| **storage / long-context** | SocratiCode (codegraph) MCP | `claude plugin marketplace add giancarloerra/socraticode` (Docker) | a code index: dependency graph, impact analysis | `scout` + grep; RAG on pgvector |
| **storage / RAG** | Qdrant (*infra, not MCP*) or pgvector | docker / a Postgres extension | a vector store | pgvector, if you already have Postgres |
| **storage / long-context** | `rlms` (*Python tool/MCP*) | `pip install rlms` | recursive processing of huge artifacts | task-loop + scout + file context |
| **analytics** (fusion full) | OpenRouter (no MCP of its own — build via `mcp-builder`) | — | many models through one API | `lite` mode (Claude subagents) or the Codex/Gemini CLI |
| **mobile** | Android Studio / Xcode (*not MCP — a CLI toolchain*) | install the SDK | build/run/simulators via `flutter`/`adb`/`xcrun simctl` (the `flutter-toolchain` skill) | — |
| **mobile** | Very Good CLI MCP (if you install the VGV plugin) | the VGV plugin | create/test/lint via VGV | the dart CLI directly |
| **saas** | — (`mcp-builder` builds an MCP, doesn't require one) | — | — | — |

## When it's worth building your own MCP
Only for a concrete need and via the `mcp-builder` skill (the `saas` set): e.g. a wrapper for an internal API or OpenRouter for full-fusion. Not in advance "just in case".
