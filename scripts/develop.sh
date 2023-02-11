#!/usr/bin/env sh

if [ "$1" == "zola" ]; then
    zola build && \
    mkdir -p public/fonts && \
    deno run -A --unstable scripts/googleFontsToLocal.ts && \
    deno run -A scripts/patchRssFeed.ts && \
    deno run -A --unstable scripts/generateJsonFeed.ts && \
    zola serve ${@:2}
fi

if [ "$1" == "ts" ]; then
    pnpm exec tsc -w
fi