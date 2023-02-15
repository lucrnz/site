#!/usr/bin/env bash

test -d public && rm -rf public

zola build && \
mkdir -p public/fonts && \
deno run -A scripts/googleFontsToLocal.ts && \
pnpm exec tsc && \
cp -av static/scripts public/ && \
deno run -A scripts/patchRssFeed.ts && \
deno run -A --unstable scripts/generateJsonFeed.ts && \
./scripts/minifyJs.sh && \
./scripts/patchResources.sh
