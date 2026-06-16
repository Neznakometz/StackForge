#!/usr/bin/env bash
# StackForge installer — copy skills/agents/commands into a project's .claude/
# without the marketplace (handy when /plugin in the VSCode extension is awkward).
#
# Usage (run from the cloned StackForge repo):
#   bash scripts/install.sh [TARGET_DIR] [--user] [--agents-md]
#     TARGET_DIR   project to install into (default: current directory)
#     --user       install into ~/.claude instead of TARGET/.claude
#     --agents-md  also copy AGENTS.md (cross-agent methodology) to the target root
#
# For Claude Code FULL setup (subagent orchestration + hooks + updates) prefer the
# marketplace: /plugin marketplace add Neznakometz/StackForge  (see INSTALL.md).
# For other agents (Cursor/Codex/Gemini), use:  npx skills add Neznakometz/StackForge
set -uo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"

TARGET="."; USER_SCOPE=0; AGENTS_MD=0
for a in "$@"; do
  case "$a" in
    --user) USER_SCOPE=1 ;;
    --agents-md) AGENTS_MD=1 ;;
    --*) echo "unknown flag: $a"; exit 1 ;;
    *) TARGET="$a" ;;
  esac
done

if [ "$USER_SCOPE" -eq 1 ]; then DEST="$HOME/.claude"; else DEST="$(cd "$TARGET" && pwd)/.claude"; fi
mkdir -p "$DEST/skills" "$DEST/agents" "$DEST/commands"

# skills: each skill is a folder containing SKILL.md
s=0; for d in "$SRC"/*/skills/*/; do [ -f "$d/SKILL.md" ] && cp -R "$d" "$DEST/skills/" && s=$((s+1)); done
# agents and commands are flat .md files
a=0; for f in "$SRC"/*/agents/*.md; do [ -f "$f" ] && cp "$f" "$DEST/agents/" && a=$((a+1)); done
c=0; for f in "$SRC"/*/commands/*.md; do [ -f "$f" ] && cp "$f" "$DEST/commands/" && c=$((c+1)); done

[ "$AGENTS_MD" -eq 1 ] && cp "$SRC/AGENTS.md" "$(cd "$TARGET" && pwd)/AGENTS.md" && echo "copied AGENTS.md"

echo "StackForge installed → $DEST"
echo "  skills:   $s"
echo "  agents:   $a"
echo "  commands: $c"
echo
echo "Note: hooks and subagent orchestration come with the marketplace install"
echo "(/plugin marketplace add Neznakometz/StackForge). This script gives you the"
echo "skills/agents/commands directly — enough to work without the marketplace."
