#!/usr/bin/env bash
# Validate the StackForge structure. Run: bash scripts/validate.sh
# Checks: JSON, skill/agent frontmatter, plugin registration,
# knowledge-pack integrity, hook compilation. Exit 1 on any error.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
fail=0
err() { echo "  ✗ $1"; fail=1; }

echo "== JSON valid =="
while IFS= read -r f; do
  python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$f" 2>/dev/null \
    || err "broken JSON: $f"
done < <(find . -name '*.json' -not -path '*/.git/*' -not -path '*/node_modules/*')

echo "== Marketplace plugins have plugin.json =="
python3 -c "import json; [print(p['source']) for p in json.load(open('.claude-plugin/marketplace.json'))['plugins']]" \
| while read -r src; do
    [ -f "$src/.claude-plugin/plugin.json" ] || err "missing plugin.json: $src"
  done

echo "== SKILL.md: frontmatter name =="
while IFS= read -r f; do
  head -5 "$f" | grep -q '^name:' || err "missing name: $f"
done < <(find . -name SKILL.md -not -path '*/.git/*')

echo "== Agents: frontmatter name + description =="
while IFS= read -r f; do
  head -8 "$f" | grep -q '^name:' || err "missing name: $f"
  head -8 "$f" | grep -q '^description:' || err "missing description: $f"
done < <(find . -path '*/agents/*.md' -not -path '*/.git/*')

echo "== Registry: ready packs have rules.md + sources.md =="
python3 - <<'PY' || fail=1
import json,os,sys
d=json.load(open("core/knowledge/registry.json")); bad=0
for p in d["packs"]:
    if p["status"]=="ready":
        base=f"core/knowledge/{p['id']}"
        for fn in ("rules.md","sources.md"):
            if not os.path.isfile(f"{base}/{fn}"):
                print(f"  ✗ pack {p['id']}: missing {fn}"); bad=1
        if p["version"]=="0.0.0" or not p["last_verified"]:
            print(f"  ✗ pack {p['id']}: ready without version/last_verified"); bad=1
sys.exit(1 if bad else 0)
PY

echo "== Hooks (JS) compile =="
while IFS= read -r f; do
  node --check "$f" 2>/dev/null || err "does not compile: $f"
done < <(find . -path '*/hooks/*.js' -not -path '*/.git/*')

echo
if [ "$fail" -eq 0 ]; then echo "✓ all green"; else echo "✗ errors found (see above)"; fi
exit "$fail"
