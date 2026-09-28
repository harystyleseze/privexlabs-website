#!/usr/bin/env bash
#
# PrivexLabs: SecretVM deployment helper (https://privexlabs.com).
#
# Usage: ./scripts/docker/secretvm.sh <command>
#
# Commands:
#   show           Validate docker-compose.secretvm.yml and print it for the SecretVM portal
#   verify [url]   Smoke-test the live deployment (default https://$SECRETVM_DOMAIN)
#
# Release flow:
#   1. ./scripts/docker/build-push.sh          (pins the digest in docker-compose.secretvm.yml)
#   2. git commit the pinned compose files
#   3. ./scripts/docker/secretvm.sh show       → paste/upload in the SecretVM portal, deploy
#   4. ./scripts/docker/secretvm.sh verify

set -euo pipefail

# shellcheck source=scripts/docker/common.sh
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

usage() {
    sed -n '3,15p' "${BASH_SOURCE[0]}" | sed -E 's/^# ?//'
}

COMMAND="${1:-}"
[[ $# -gt 0 ]] && shift

case "$COMMAND" in
    show)
        image="$(compose_image_ref "$COMPOSE_SECRETVM")"
        [[ "$image" == *@sha256:* ]] \
            || die "The web image in docker-compose.secretvm.yml is not pinned to a digest (${image:-none}). Run ./scripts/docker/build-push.sh first."
        require_compose
        docker compose -f "$COMPOSE_SECRETVM" config --quiet \
            || die "docker-compose.secretvm.yml is not valid."
        log_success "docker-compose.secretvm.yml is valid and pinned to ${image}"
        echo
        echo "----- docker-compose.secretvm.yml (upload this file) -----"
        cat "$COMPOSE_SECRETVM"
        echo "----- end -----"
        cat <<EOF

SecretVM portal
  1. Upload the compose file above (no environment file is needed).
  2. First launch only: enter ${SECRETVM_DOMAIN} in the "Custom Domain" box before launching.
     Then in DNS: an A record for ${SECRETVM_DOMAIN} → the VM IP (Network tab), and the
     CNAME record printed as "CNAME Challenge" in the VM logs (ZeroSSL validation).
     Traefik serves that certificate from /mnt/secure/cert.
  3. Deploy, then run: ./scripts/docker/secretvm.sh verify
EOF
        ;;
    verify)
        smoke "${1:-https://${SECRETVM_DOMAIN}}"
        ;;
    -h|--help|help)
        usage
        ;;
    *)
        usage
        [[ -z "$COMMAND" ]] && exit 1
        die "Unknown command: ${COMMAND}"
        ;;
esac
