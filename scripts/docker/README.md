# PrivexLabs: Docker

The PrivexLabs site is a RedwoodJS app, but the only thing that ships is the web side, which
builds to static files (`web/dist`). In production there's nothing to run except a web server.
So there's a single image, `privexlabs-web`: Node 20 builds the site and unprivileged nginx
serves it on port 8080. The same image runs in production and on SecretVM, pinned by digest.

| Environment | Compose file | Script |
| --- | --- | --- |
| Development (hot reload) | `docker-compose.dev.yml` | `dev.sh` |
| Production on any Docker host (TLS terminated upstream) | `docker-compose.prod.yml` | `prod.sh` |
| SecretVM, https://privexlabs.com | `docker-compose.secretvm.yml` | `secretvm.sh` |
| Build, push and pin a release | none | `build-push.sh` |

Requirements: Docker with Compose v2 and Buildx (Docker Desktop includes both), plus `curl`.
You don't need Node on the host, because the containers use Node 20 as Redwood 8 requires.

## Configuration

Every setting has a default, so no configuration is required. To change one:

```bash
cp scripts/docker/.env.example scripts/docker/.env   # git-ignored
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `REGISTRY` | `docker.io` | Registry to push to |
| `IMAGE_NAMESPACE` | `privexlabs` | Docker Hub org/user, or GHCR owner |
| `IMAGE_NAME` | `privexlabs-web` | Image name |
| `PLATFORM` | `linux/amd64` | Target platform (SecretVM is amd64) |
| `PRIVEXLABS_DEV_PORT` | `8910` | Host port for the dev server |
| `PRIVEXLABS_PROD_PORT` | `8080` | Host port for the production container (`127.0.0.1:8080` for loopback only) |
| `SECRETVM_DOMAIN` | `privexlabs.com` | Domain checked by `secretvm.sh verify` |

Variables set in your shell override the file, for example
`PRIVEXLABS_DEV_PORT=8920 ./scripts/docker/dev.sh up`. The file is parsed as `KEY=value`
lines and is never executed. Credentials never go in it; use `docker login`.

The release version comes from `"version"` in the root `package.json`. You can override it
by passing a version to `build-push.sh`.

## Development

```bash
./scripts/docker/dev.sh up        # http://localhost:8910, edits hot-reload
./scripts/docker/dev.sh logs
./scripts/docker/dev.sh run yarn rw test web --no-watch
./scripts/docker/dev.sh shell
./scripts/docker/dev.sh down
```

Your working copy is mounted into the container, but `node_modules` stays inside it,
because macOS and Linux binaries differ. Every `up` rebuilds `node_modules` from
`yarn.lock`, so dependency changes are picked up automatically. The dev server runs the
web side only, with the type generator off (`--generate=false`), since the api side isn't used.

## Releasing

```bash
docker login                                          # once, for $REGISTRY
./scripts/docker/build-push.sh --build-only           # optional: build and test first
PRIVEXLABS_WEB_IMAGE=docker.io/privexlabs/privexlabs-web:0.1.0 ./scripts/docker/prod.sh up
./scripts/docker/prod.sh smoke
./scripts/docker/prod.sh down

./scripts/docker/build-push.sh                        # build, push, pin the digest
git add docker-compose.prod.yml docker-compose.secretvm.yml
git commit -m "Release privexlabs-web 0.1.0"
```

What `build-push.sh` does:

- builds for `linux/amd64` without provenance or SBOM attestations, which SecretVM rejects. The Node stages run natively, so there's no emulation on Apple Silicon.
- tags `:<version>`, plus `:latest` unless the version is a prerelease such as `0.2.0-rc.1`
- pushes both tags
- reads the digest back from the registry and checks it's a single image manifest, not an index
- pins that digest in both deployment compose files, then checks the pin landed

It won't push from a working tree with uncommitted changes, or over a version already in the
registry, unless you pass `--force`. If a push fails partway (a registry timeout, for example),
rerun it with `--push-only`.

To cut a new release, bump `"version"` in `package.json`.

### Production (any Docker host)

Copy `docker-compose.prod.yml` to the host, or check out the repo there, then run:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d      # or: ./scripts/docker/prod.sh up
```

The container serves plain HTTP on `PRIVEXLABS_PROD_PORT`. Put your TLS proxy or load balancer
in front of it and set HSTS there. The health endpoint is `/healthz`. The container runs
read-only, as uid 101, with all capabilities dropped.

### SecretVM

```bash
./scripts/docker/secretvm.sh show     # validates and prints the compose file for the portal
./scripts/docker/secretvm.sh verify   # smoke-tests https://privexlabs.com after deploying
```

Upload `docker-compose.secretvm.yml` in the SecretVM portal. No env file is needed. Traefik:

- terminates TLS with the certificate SecretVM places in `/mnt/secure/cert`, with a minimum of TLS 1.2
- redirects HTTP to HTTPS
- adds HSTS
- routes to the web container through its file provider, so the Docker socket isn't mounted

First launch only:

1. In the portal, enter `privexlabs.com` in the **Custom Domain** box before launching.
2. In DNS, add an A record pointing `privexlabs.com` at the VM's IP (shown on the Network tab).
3. In DNS, add the **CNAME Challenge** record printed in the VM logs, which ZeroSSL uses to validate the domain.

Only `privexlabs.com` is routed. To serve `www.privexlabs.com` as well, the certificate must
cover it. Once it does, add a router for it in the `routes` config; the comment there shows how.
Traefik reads the certificate at startup, so restart it after a renewal.

### Rollback

Put the previous release's digest back into the compose files, either by `git revert` of the
release commit or by editing the `@sha256:` line. Then redeploy: `pull && up -d` on the
production host, or re-upload the file in the SecretVM portal.

## What's in the image

- `Dockerfile` target `web` runs `yarn rw build web --no-prerender` and puts the output in
  `nginxinc/nginx-unprivileged:1.30-alpine`.
  - Both base images are pinned by tag and digest.
  - The Redwood scaffold `README.md` and `client-build-manifest.json` are removed from the output.
  - The image has a built-in `HEALTHCHECK`.
- `docker/nginx/default.conf` handles:
  - the SPA fallback to Redwood's `200.html`
  - immutable caching for `/assets/*`; a missing chunk gets a real 404, never HTML
  - `no-cache` for HTML
  - gzip
  - `/healthz`
- `docker/nginx/security-headers.conf` sets the CSP (`script-src 'self'`), `nosniff`, frame
  denial, the referrer policy, the permissions policy and COOP.
  - The theme bootstrap lives in `web/public/theme-init.js` rather than inline, so scripts stay `'self'`.
  - `style-src` allows `'unsafe-inline'` because NotFoundPage and FatalErrorPage render a `<style>` element.
  - If the site starts loading a new third-party origin (analytics, maps, fonts), add it to the CSP.
- `web/vite.config.ts` turns minification back on. Redwood 8.9 disables it by default.

The api side (`api/`) isn't deployed, because the site doesn't use it yet. When it does, add an
`api` build target (Redwood's `api_serve` stage from `yarn rw setup docker` is the reference)
and an nginx `location /.redwood/functions/` that proxies to it.

## Troubleshooting

- **"Docker daemon is not running"**: start Docker Desktop.
- **Port already in use**: set `PRIVEXLABS_DEV_PORT` or `PRIVEXLABS_PROD_PORT`.
- **Push denied**: run `docker login $REGISTRY` with an account that can push to `$IMAGE_NAMESPACE`.
- **Page is blank in the browser**: open the console and look for CSP violations. `prod.sh smoke`
  also checks the headers and assets.
- **Dev hot reload misses changes**: set `CHOKIDAR_USEPOLLING=true` under `environment:` in
  `docker-compose.dev.yml`. Docker Desktop on macOS didn't need it in testing.
