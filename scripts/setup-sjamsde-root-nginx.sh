#!/usr/bin/env bash
# Serve sjamsde-web at https://sjamsde.org/
# SSMP portal stays available at https://sjamsde.org/en/... (port 3000)

set -euo pipefail

NGINX_SITE="/etc/nginx/sites-available/default"
MARKER="# sjamsde.org root = sjamsde-web"

if [[ "${EUID:-0}" -ne 0 ]]; then
  echo "Run with sudo: sudo bash $0"
  exit 1
fi

if [[ ! -f "$NGINX_SITE" ]]; then
  echo "ERROR: $NGINX_SITE not found"
  exit 1
fi

if ! docker ps --format '{{.Names}}' | grep -qx 'sjamsde-web'; then
  echo "ERROR: sjamsde-web container is not running."
  exit 1
fi

cp "$NGINX_SITE" "${NGINX_SITE}.bak.$(date +%Y%m%d%H%M%S)"

if grep -q "$MARKER" "$NGINX_SITE"; then
  echo "Removing previous sjamsde.org root routing block..."
  sed -i "/$MARKER/,/# sjamsde.org root site end/d" "$NGINX_SITE"
fi

python3 - "$NGINX_SITE" "$MARKER" <<'PY'
import sys

path, marker = sys.argv[1], sys.argv[2]
block = f"""
\t{marker}
\tlocation /api/sjam {{
\t\tproxy_pass http://127.0.0.1:3000;
\t\tproxy_set_header Host $host;
\t\tproxy_set_header X-Real-IP $remote_addr;
\t\tproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
\t\tproxy_set_header X-Forwarded-Proto $scheme;
\t}}

\tlocation /api/donations {{
\t\tproxy_pass http://127.0.0.1:8080;
\t\tproxy_set_header Host $host;
\t\tproxy_set_header X-Real-IP $remote_addr;
\t\tproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
\t\tproxy_set_header X-Forwarded-Proto $scheme;
\t}}

\tlocation /_next/ {{
\t\tproxy_pass http://127.0.0.1:3000;
\t\tproxy_set_header Host $host;
\t\tproxy_set_header X-Real-IP $remote_addr;
\t\tproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
\t\tproxy_set_header X-Forwarded-Proto $scheme;
\t}}

\tlocation ~ ^/(en|es|zh-tw|jp)(/|$) {{
\t\tproxy_pass http://127.0.0.1:3000;
\t\tproxy_set_header Host $host;
\t\tproxy_set_header X-Real-IP $remote_addr;
\t\tproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
\t\tproxy_set_header X-Forwarded-Proto $scheme;
\t}}
\t# sjamsde.org root site end
"""

lines = open(path).read().splitlines(keepends=True)
out = []
in_sjamsde_ssl = False
inserted = False
in_root_location = False

for line in lines:
    if "server_name sjamsde.org; # managed by Certbot" in line:
        in_sjamsde_ssl = True
        out.append(line)
        continue

    if in_sjamsde_ssl and not inserted and line.lstrip().startswith("location /"):
        out.append(block)
        inserted = True
        in_sjamsde_ssl = False
        in_root_location = True
        out.append(line)
        continue

    if in_root_location:
        out.append(line.replace("127.0.0.1:3000", "127.0.0.1:3001", 1) if "proxy_pass http://127.0.0.1:3000" in line else line)
        if line.strip() == "}":
            in_root_location = False
        continue

    out.append(line)

if not inserted:
    raise SystemExit("ERROR: could not find sjamsde.org HTTPS location / block")

open(path, "w").writelines(out)
PY

nginx -t
systemctl reload nginx

echo ""
echo "Done."
echo "  Public website: https://sjamsde.org/"
echo "  SSMP portal:    https://sjamsde.org/en/login (and other /en/... routes)"
