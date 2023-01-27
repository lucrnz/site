all: dev deploy
.PHONY: dev deploy

dev:
	zola build && \
	sh scripts/fetchXess.sh -o public/styles.css && \
	deno run -A scripts/patchRssFeed.ts && \
	deno run -A --unstable scripts/generateJsonFeed.ts && \
	zola serve

deploy:
		docker-compose build --no-cache && \
		docker-compose up -d
