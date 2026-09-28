#!/usr/bin/env bash
#
# PrivexLabs: local development in Docker (Redwood/Vite dev server with hot reload).
#
# Usage: ./scripts/docker/dev.sh <command>
#
# Commands:
#   up           Build the dev image and start the dev server in the background
#   down         Stop the dev environment
#   logs         Follow the dev server logs
#   shell        Open a shell in the running container
#   run <cmd…>   Run a one-off command in a fresh container, e.g.
#                  ./scripts/docker/dev.sh run yarn rw test web --no-watch
#                  ./scripts/docker/dev.sh run yarn rw lint
#   clean        Remove the dev containers, volumes and image (asks first)
#
# The site is served on http://localhost:$PRIVEXLABS_DEV_PORT (default 8910).
# The container runs Node 20 as Redwood 8 requires, whatever Node the host has.

set -euo pipefail

# shellcheck source=scripts/docker/common.sh
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

usage() {
    sed -n '3,18p' "${BASH_SOURCE[0]}" | sed -E 's/^# ?//'
}

compose() {
    docker compose -f "$COMPOSE_DEV" "$@"
}

COMMAND="${1:-}"
[[ $# -gt 0 ]] && shift

case "$COMMAND" in
    up)
        require_compose
        # --renew-anon-volumes: node_modules always match the freshly built image,
        # so dependency changes in package.json/yarn.lock are picked up.
        compose up --build --renew-anon-volumes --detach
        log_success "Dev server starting on http://localhost:${PRIVEXLABS_DEV_PORT}"
        log_info "Follow the logs: ./scripts/docker/dev.sh logs"
        ;;
    down)
        require_compose
        compose down
        log_success "Dev environment stopped."
        ;;
    logs)
        require_compose
        compose logs --follow
        ;;
    shell)
        require_compose
        compose exec web bash
        ;;
    run)
        [[ $# -gt 0 ]] || die "Usage: ./scripts/docker/dev.sh run <command…>"
        require_compose
        compose run --rm --no-deps web "$@"
        ;;
    clean)
        require_compose
        log_warn "This removes the dev containers, their volumes and the privexlabs-dev image."
        if confirm "Continue?"; then
            compose down --volumes --rmi local
            log_success "Dev environment removed."
        else
            log_info "Cancelled."
        fi
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
