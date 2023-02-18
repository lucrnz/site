#!/usr/bin/env bash

if [ -z "$MODE" ]; then
    echo "Error: MODE is not set"
    exit 1
fi

if [ "$MODE" == "pages-deploy" ]; then
    if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
        echo "Error: CLOUDFLARE_API_TOKEN is not set"
        exit 1
    fi

    if [ -z "$CLOUDFLARE_PROJECT_NAME" ]; then
        echo "Error: CLOUDFLARE_PROJECT_NAME is not set"
        exit 1
    fi

    cd public && npx --yes wrangler pages publish . --project-name=$CLOUDFLARE_PROJECT_NAME
elif [ "$MODE" == "self-host" ]; then
    echo "Running server locally..."
    static-web-server -p 8080 -g info
else
    echo "Error: Invalid mode. Valid modes are: pages-deploy | self-host"
    exit 1
fi
