#!/usr/bin/env sh

pnpm exec astro build && \
test -d dist && \
find ./pages ! -name ".git" -delete && \
cp -r ./dist/* ./pages
