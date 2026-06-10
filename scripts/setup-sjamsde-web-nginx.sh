#!/usr/bin/env bash
# Serve the public website at https://sjamsde.org/web/
# Root https://sjamsde.org/ stays on the live SSMP app (port 3000).

set -euo pipefail

NGINX_SITE="/etc/nginx/sites-available/default"
MARKER="# sjamsde-web public site"

if [[ ! -f "$NGINX_SITE" ]]; then
  echo "ERROR: $NGINX_SITE not found"
  exit 1
fi

if ! docker ps --format '{{.Names}}' | grep -qx 'sjamsde-web'; then
  echo "ERROR: sjamsde-web container is not running. Start it first:"
  echo "  docker run -d --name sjamsde-web --restart unless-stopped -p 3001:3000 sjamsde-web:latest"
  exit 1
fi

cp "$NGINX_SITE" "${NGINX_SITE}.bak.$(date +%Y%m%d%H%M%S)"

if grep -q "$MARKER" "$NGINX_SITE"; then
  echo "Removing previous sjamsde-web nginx block..."
  sed -i "/$MARKER/,/sjamsde-web public site end/d" "$NGINX_SITE"
fi

# Insert /web routes into the HTTPS sjamsde.org server block only.
python3 - "$NGINX_SITE" "$MARKER" <<'PY'
import sys

path, marker = sys.argv[1], sys.argv[2]
block = f"""
\t{marker}
\tlocation = /web {{
\t\treturn 301 $scheme://$host/web/;
\t}}

\tlocation /web/ {{
\t\tproxy_pass http://127.0.0.1:3001/;
\t\tproxy_set_header Host $host;
\t\tproxy_set_header X-Real-IP $remote_addr;
\t\tproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
\t\tproxy_set_header X-Forwarded-Proto $scheme;
\t}}
\t# sjamsde-web public site end
"""

lines = open(path).read().splitlines(keepends=True)
out = []
in_sjamsde_ssl = False
inserted = False

for line in lines:
    out.append(line)
    if "server_name sjamsde.org; # managed by Certbot" in line:
        in_sjamsde_ssl = True
        continue
    if in_sjamsde_ssl and not inserted and line.lstrip().startswith("location /"):
        out.insert(len(out) - 1, block)
        inserted = True
        in_sjamsde_ssl = False

if not inserted:
    raise SystemExit("ERROR: could not find sjamsde.org HTTPS location / block")

open(path, "w").writelines(out)
PY

nginx -t
systemctl reload nginx

echo ""
echo "Done."
echo "  Public website: https://sjamsde.org/web/"
echo "  SSMP portal:    https://sjamsde.org/ (unchanged, port 3000)"
