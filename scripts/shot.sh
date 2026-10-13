#!/usr/bin/env bash
# screenshot the atlas: scripts/shot.sh <out.png> [querystring] [w] [h]
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/shot.png}"
QS="${2:-}"
W="${3:-1500}"
H="${4:-1000}"
PROF="${TMPDIR:-/tmp}/cr-atlas-$$"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
URL="file:///C:/Users/homee/projects/human-atlas/index.html"
[ -n "$QS" ] && URL="$URL?$QS"
"$CHROME" --headless=new --disable-gpu --no-first-run --no-default-browser-check \
  --user-data-dir="$PROF" --hide-scrollbars --window-size="$W,$H" \
  --virtual-time-budget=9000 --screenshot="$OUT" "$URL" >/dev/null 2>&1 || true
rm -rf "$PROF" 2>/dev/null || true
ls -la "$OUT"
