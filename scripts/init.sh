#!/usr/bin/env bash
# Cross-agent bootstrap — assemble a project AGENTS.md from knowledge packs
# OUTSIDE Claude Code (for Cursor / Codex / Gemini / Copilot, where there is no
# `/init` slash command). In Claude Code prefer `/init` (it's interactive).
#
# Usage (run from the cloned StackForge repo):
#   bash scripts/init.sh --stack php-laravel,frontend-vue-nuxt[,…] [TARGET_DIR]
#   bash scripts/init.sh --list                 # show available packs
#
# Writes  TARGET_DIR/AGENTS.md  (methodology + the chosen packs' rules) and a
# one-line  TARGET_DIR/CLAUDE.md  that imports it (@AGENTS.md) for Claude Code.
set -uo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
REG="$SRC/core/knowledge/registry.json"

list_packs() {
  node -e 'const d=require(process.argv[1]);for(const p of d.packs)console.log(`${p.status==="ready"?"✓":"·"} ${p.id.padEnd(20)} ${p.targets}`)' "$REG"
}

STACK=""; TARGET="."
while [ $# -gt 0 ]; do
  case "$1" in
    --list) list_packs; exit 0 ;;
    --stack) STACK="$2"; shift 2 ;;
    --*) echo "unknown flag: $1"; exit 1 ;;
    *) TARGET="$1"; shift ;;
  esac
done
[ -z "$STACK" ] && { echo "need --stack <id,id,…>  (see: $0 --list)"; exit 1; }

DEST="$(cd "$TARGET" && pwd)"
OUT="$DEST/AGENTS.md"

# methodology header (portable rules) comes first
{
  cat "$SRC/AGENTS.md"
  echo
  echo "---"
  echo
  echo "# Stack rules (assembled by StackForge)"
} > "$OUT"

IFS=','; missing=0
for id in $STACK; do
  id="$(echo "$id" | tr -d ' ')"
  f="$SRC/core/knowledge/$id/rules.md"
  if [ -f "$f" ]; then
    echo >> "$OUT"; cat "$f" >> "$OUT"
  else
    echo "  ! no pack '$id' (skipped)"; missing=1
  fi
done
unset IFS

# CLAUDE.md import shim so Claude Code picks it up natively
printf '@AGENTS.md\n' > "$DEST/CLAUDE.md"

echo "Wrote $OUT  (+ CLAUDE.md import shim)"
echo "Review it, then drop AGENTS.md where your agent reads it"
echo "(Cursor: .cursor/rules/ · Gemini CLI: copy to GEMINI.md · Codex/Copilot: repo root)."
[ "$missing" -eq 1 ] && echo "Note: some pack ids were not found — check '$0 --list'."
