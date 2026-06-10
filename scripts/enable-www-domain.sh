#!/usr/bin/env bash
# Publish the public site to https://www.sjamsde.org/ via GitHub Pages (no sudo).
# SSMP portal stays on https://sjamsde.org/

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Building for www.sjamsde.org"
GITHUB_PAGES_BASE=/ VITE_BASE_PATH= PAGES_CUSTOM_DOMAIN=www.sjamsde.org pnpm run build:pages

echo ""
echo "==> Next steps (no sudo needed)"
echo ""
echo "1) Push to GitHub (triggers deploy):"
echo "     git add -A && git commit -m \"Deploy public site to www.sjamsde.org\""
echo "     git push origin main"
echo ""
echo "2) GitHub repo → Settings → Pages:"
echo "     Source: GitHub Actions"
echo "     Custom domain: www.sjamsde.org"
echo "     Enforce HTTPS: ON (after DNS propagates)"
echo ""
echo "3) GoDaddy DNS (domaincontrol.com) → sjamsde.org → DNS:"
echo "     Edit record  www  →  CNAME  →  Ng8522.github.io"
echo "     (remove CNAME to sjamsde.org if that is what you have now)"
echo ""
echo "4) Wait 5–30 min, then open: https://www.sjamsde.org/"
echo ""
echo "Note: https://sjamsde.org/ stays the SSMP member portal (unchanged)."
