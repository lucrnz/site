#!/usr/bin/env bash

zola build && \
mkdir -p public/fonts && \
deno run -A scripts/googleFontsToLocal.ts && \
pnpm exec tsc && \
cp -av static/scripts public/ && \
deno run -A scripts/patchRssFeed.ts && \
deno run -A --unstable scripts/generateJsonFeed.ts && \
./scripts/patchResources.sh
