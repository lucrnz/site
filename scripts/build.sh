#!/usr/bin/env bash

zola build && \
pnpm exec tsc && \
deno run -A scripts/patchRssFeed.ts && \
deno run -A --unstable scripts/generateJsonFeed.ts && \
./scripts/addLicenseFieldsToJs.sh
