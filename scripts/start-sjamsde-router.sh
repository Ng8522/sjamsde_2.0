#!/usr/bin/env bash
# Route https://sjamsde.org/ through port 3000:
#   /              -> sjamsde-web (3001)
#   /en/...        -> SSMP frontend (3002)
# No sudo needed — system nginx still points to port 3000.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ROUTER_NAME="sjamsde-router"
CONF="$ROOT/scripts/sjamsde-router.conf"

for name in sjamsde-web sjamsde-frontend; do
  if ! docker ps --format '{{.Names}}' | grep -qx "$name"; then
    echo "ERROR: $name is not running."
    exit 1
  fi
done

# SSMP must not bind host port 3000 — router owns it.
if docker ps --format '{{.Names}} {{.Ports}}' | grep -q '^sjamsde-frontend .*0.0.0.0:3000->'; then
  echo "Moving sjamsde-frontend from port 3000 to 3002..."
  docker stop sjamsde-frontend
  docker rm sjamsde-frontend
  docker run -d \
    --name sjamsde-frontend \
    --restart unless-stopped \
    -p 3002:3000 \
    semutz-sj:2.2.6
fi

docker stop "$ROUTER_NAME" 2>/dev/null || true
docker rm "$ROUTER_NAME" 2>/dev/null || true

docker run -d \
  --name "$ROUTER_NAME" \
  --restart unless-stopped \
  --network host \
  -v "$CONF:/etc/nginx/conf.d/default.conf:ro" \
  nginx:alpine

echo ""
echo "Router running on port 3000."
echo "  https://sjamsde.org/              -> sjamsde-web"
echo "  https://sjamsde.org/en/admin/login -> SSMP portal"
