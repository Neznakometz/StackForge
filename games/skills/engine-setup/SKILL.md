---
name: engine-setup
description: Choosing and setting up a game engine — Godot 4, Unity, Unreal 5. Apply when starting a game project and when setting up the structure for the engine.
---

# Engine setup

Choose ONE engine for the project; activate the corresponding conventions and path-scoped rules.

| Engine | When | Specialists |
|--------|------|-------------|
| **Godot 4** | 2D/3D indie, open stack, lightweight | GDScript, shaders, GDExtension |
| **Unity** | cross-platform, large asset store, mobile | DOTS/ECS, shaders/VFX, Addressables, UI Toolkit |
| **Unreal 5** | high-fidelity 3D, AAA graphics | GAS, Blueprints, replication, UMG/CommonUI |

## Path-scoped rules (by layer)
- `src/gameplay/**` → data-driven values, delta-time, no references to the UI.
- `src/core/**` → no allocations in the hot path, thread safety, stable API.
- `src/ui/**` → does not own game state, localizable, accessible.
- `prototypes/**` → relaxed standards, README + hypothesis required.

## Rules
- Heavy logic — data-driven and testable; do not bloat the per-frame `Update`.
- The structure isolates the engine: business logic is separated from the engine API as much as possible.
- One engine per project; switching — through an ADR.
