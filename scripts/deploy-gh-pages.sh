#!/usr/bin/env bash
# ساخت و انتشار خروجی روی شاخهٔ gh-pages (مسیر فعلی انتشار روی GitHub Pages)
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE="${BASE_PATH:-/clutchping/}"

cd "$REPO_DIR"
echo "▸ ساخت خروجی با BASE_PATH=$BASE"
BASE_PATH="$BASE" npm run build

WORK="$(mktemp -d)"
cp -r dist/. "$WORK/"
cd "$WORK"
git init -q
git checkout -q -b gh-pages
git config user.email "deploy@clutchping.local"
git config user.name "clutchping deploy"
echo "" > .nojekyll
git add -A
git commit -q -m "deploy: build of $(git -C "$REPO_DIR" rev-parse --short HEAD 2>/dev/null || echo local)"
git push -f "$(git -C "$REPO_DIR" remote get-url origin)" gh-pages
echo "▸ منتشر شد"
