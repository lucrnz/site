#!/usr/bin/env sh

zola build && \
deno run -A --unstable scripts/googleFontsToLocal.ts && \
deno run -A scripts/patchRssFeed.ts && \
deno run -A --unstable scripts/generateJsonFeed.ts && \
zola serve
