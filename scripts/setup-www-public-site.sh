#!/usr/bin/env bash
# Public website on https://www.sjamsde.org/
# SSMP member portal unchanged on https://sjamsde.org/

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NGINX_AVAILABLE="/etc/nginx/sites-available/www.sjamsde.org"
NGINX_ENABLED="/etc/nginx/sites-enabled/www.sjamsde.org"

if ! docker ps --format '{{.Names}}' | grep -qx 'sjamsde-web'; then
  echo "ERROR: sjamsde-web container is not running."
  echo "  cd $ROOT && docker build -t sjamsde-web:latest ."
  echo "  docker run -d --name sjamsde-web --restart unless-stopped -p 3001:3000 sjamsde-web:latest"
  exit 1
fi

if [[ -f "$NGINX_AVAILABLE" ]]; then
  cp "$NGINX_AVAILABLE" "${NGINX_AVAILABLE}.bak.$(date +%Y%m%d%H%M%S)"
fi

cp "$ROOT/scripts/nginx-www.sjamsde.org.conf" "$NGINX_AVAILABLE"
ln -sf "$NGINX_AVAILABLE" "$NGINX_ENABLED"

nginx -t
systemctl reload nginx

echo ""
echo "Done."
echo "  Public website:  https://www.sjamsde.org/"
echo "  SSMP portal:     https://sjamsde.org/  (unchanged)"
