#!/usr/bin/env sh

test -d dist && rm -rf dist

pnpm exec astro build && \
test -d dist && \
find pages -mindepth 1 -type f -delete && \
cp -r dist/* pages && \
rm -rf dist
