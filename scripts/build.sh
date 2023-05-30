#!/usr/bin/env sh

test -d dist && rm -rf dist

pnpm exec astro build && \
test -d dist && \
find pages -mindepth 1 ! -path 'pages/.git*' -exec rm -fvr {} + && \
cp -r dist/* pages && \
cp public/.domains pages/ && \
test -d dist && rm -rf dist