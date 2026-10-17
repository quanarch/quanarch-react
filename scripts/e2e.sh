#!/usr/bin/env bash
# Creates a qua, a quanar and a quan from this stack with qu, builds them
# against the local @quanarch/react, delivers the quan and checks that the
# quanar renders it.
#
#   QU=/path/to/qu scripts/e2e.sh
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
qu="${QU:-qu}"
work="$(mktemp -d)"
trap 'kill "${preview_pid:-}" 2>/dev/null || true; rm -rf "$work"' EXIT

step() { printf '\n== %s\n' "$*"; }

step "package"
(cd "$root/packages/react" && npm ci --no-audit --no-fund && npm run build && npm test && npm pack --pack-destination "$work")
tgz="$(ls "$work"/quanarch-react-*.tgz)"

cd "$work"
step "generate"
"$qu" new qua qua-a --stack "$root" --no-run
"$qu" new quanar main --stack "$root" --qua ./qua-a --no-run
"$qu" new quan billing --stack "$root" --qua ./qua-a --no-run
for d in qua-a main billing; do
  "$qu" check "$d"
  # Use the package from this checkout instead of the registry.
  sed -i.bak "s#\"@quanarch/react\": \"^0.1.0\"#\"@quanarch/react\": \"file:$tgz\"#g" "$d/package.json" && rm "$d/package.json.bak"
done

step "build"
(cd qua-a && npm install --no-audit --no-fund && npm run build)
(cd main && npm install --no-audit --no-fund)
(cd billing && npm install --no-audit --no-fund && npm run build && npm run deliver -- ../main)
(cd main && npm run build)

step "check the quan"
quan="billing/dist/index.js"
grep -q '__QUANARCH_SHARED__' "$quan" || { echo "the quan does not use the shared modules"; exit 1; }
if grep -q 'react.transitional.element' "$quan"; then echo "the quan bundles its own React"; exit 1; fi
[ ! -e billing/dist/index.css ] || { echo "CSS was not inlined"; exit 1; }
[ -f main/dist/quans/billing/index.js ] || { echo "the quan was not delivered"; exit 1; }

chrome="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || true)"
if [ -z "$chrome" ]; then
  echo "no Chrome found; skipping the browser check"
  exit 0
fi

step "check in a browser"
# exec, so $! is Vite itself and the trap can stop it.
(cd main && exec ./node_modules/.bin/vite preview --port 4173 --strictPort >/dev/null 2>&1) &
preview_pid=$!
for _ in $(seq 1 60); do curl -sf -o /dev/null http://localhost:4173/ && break; sleep 0.5; done
kill -0 "$preview_pid" 2>/dev/null || { echo "vite preview did not start (is port 4173 free?)"; exit 1; }
dom="$("$chrome" --headless=new --disable-gpu --no-sandbox --virtual-time-budget=5000 --dump-dom http://localhost:4173/ 2>/dev/null)"
if ! grep -q 'Signed in as Ada Lovelace' <<<"$dom"; then
  echo "the quanar did not render the quan:"
  echo "$dom"
  exit 1
fi
echo "ok: the quanar loaded the quan and plugged in qua-a"
