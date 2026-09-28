# syntax=docker/dockerfile:1
#
# PrivexLabs: container images
#
# Targets:
#   dev   Redwood/Vite dev server (`yarn rw dev web`), source bind-mounted by
#         docker-compose.dev.yml
#   web   Production image (default, last stage): the static web build served
#         by unprivileged nginx on :8080. No Node at runtime.
#
# Build via ./scripts/docker/build-push.sh (production) or ./scripts/docker/dev.sh
# (development).
#
# Only the web side is built: the api side is the unused Redwood scaffold. When
# it gains real services, add an api target (Redwood's `api_serve` stage from
# `yarn rw setup docker` is the reference).
#
# The Node stages run on the build machine's platform ($BUILDPLATFORM): their
# only output is web/dist, plain HTML/JS/CSS. Only the final `web` stage uses
# the target platform and it is COPY-only, so an amd64 image builds natively on
# ARM machines, without QEMU.

# Base images are pinned by tag + digest so a rebuild of the same commit uses
# the same bases. To bump: docker buildx imagetools inspect <tag>
ARG NODE_IMAGE=node:20.20.2-bookworm-slim@sha256:2cf067cfed83d5ea958367df9f966191a942351a2df77d6f0193e162b5febfc0
ARG NGINX_IMAGE=nginxinc/nginx-unprivileged:1.30.5-alpine@sha256:4714e0b1b2577eaa1a6131d07c958b67f0eb68e6d0521e90c6e5287db8cf0bc5

# base
# ----
FROM --platform=$BUILDPLATFORM ${NODE_IMAGE} AS base

RUN corepack enable

# COREPACK_HOME is outside the build-cache mount so the Yarn release named in
# package.json#packageManager is stored in the image layer.
ENV REDWOOD_DISABLE_TELEMETRY=1 \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    COREPACK_HOME=/home/node/.corepack

USER node
WORKDIR /home/node/app

# deps
# ----
FROM base AS deps

# Every workspace manifest is required: yarn.lock lists api@workspace:api, so
# an --immutable install fails without api/package.json. .yarnrc.yml carries
# nodeLinker: node-modules (without it Yarn 4 falls back to PnP).
COPY --chown=node:node package.json yarn.lock .yarnrc.yml ./
COPY --chown=node:node api/package.json api/
COPY --chown=node:node web/package.json web/

# Pre-create Yarn's global dirs as `node`; otherwise the cache mount creates
# /home/node/.yarn as root and Yarn cannot write its index.
RUN mkdir -p /home/node/.yarn/berry/index /home/node/.cache

# Lifecycle scripts must run (no --mode=skip-build): `rw build web` fails
# without them. Prisma's postinstall warnings (no schema, no openssl) are
# expected here; the web build never uses Prisma.
RUN --mount=type=cache,target=/home/node/.yarn/berry/cache,uid=1000,gid=1000 \
    yarn install --immutable

# dev
# ---
# The source tree is bind-mounted over /home/node/app by docker-compose.dev.yml;
# node_modules come from this image through anonymous volumes.
FROM deps AS dev

# Workspace node_modules are mounted as anonymous volumes; creating them here
# makes those volumes owned by `node` (Docker would otherwise create them as root).
RUN mkdir -p web/node_modules api/node_modules

# There is no browser in the container: stop Vite from trying to open one.
ENV BROWSER=none

EXPOSE 8910

# Web side only. --generate=false: the type generator also watches api/ and can
# shell out to `prisma generate`, which the web-only dev loop does not need.
# (Redwood already makes Vite listen on all interfaces.)
CMD ["yarn", "rw", "dev", "web", "--generate=false"]

# web build
# ---------
# The site has no prerendered routes, so the api side is not needed. If routes
# are ever marked `prerender`, this stage must build the api first (see
# Redwood's `web_build_with_prerender` stage).
FROM deps AS web-build

COPY --chown=node:node redwood.toml ./
COPY --chown=node:node web web

# Drop build byproducts that must not be public: the scaffold README copied
# from web/public, and the client manifest (only used for SSR).
RUN yarn rw build web --no-prerender \
 && rm -f web/dist/README.md web/dist/client-build-manifest.json

# web (production)
# ----------------
FROM ${NGINX_IMAGE} AS web

ARG VERSION=dev
ARG VCS_REF=unknown
ARG BUILD_DATE=unknown
ARG SOURCE_URL=""

# The base image's source/url/licenses/maintainer labels describe nginx, not
# this image, so they are overridden.
LABEL org.opencontainers.image.title="privexlabs-web" \
      org.opencontainers.image.description="PrivexLabs website: static RedwoodJS web build served by nginx" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.source="${SOURCE_URL}" \
      org.opencontainers.image.url="" \
      org.opencontainers.image.licenses="" \
      maintainer=""

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
# Site files are owned by root: the nginx user (101) can read but never modify them.
COPY --from=web-build --chown=0:0 /home/node/app/web/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
