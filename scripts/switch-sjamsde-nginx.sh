#!/usr/bin/env bash
# Deprecated: use setup-sjamsde-web-nginx.sh (serves at /web/, not root).
exec "$(dirname "$0")/setup-sjamsde-web-nginx.sh" "$@"
