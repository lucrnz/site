all: dev deploy
.PHONY: dev deploy

dev:
	zola build && \
	sh _scripts/fetchXess.sh -o public/styles.css && \
	deno run -A _scripts/patchRssFeed.ts && \
	deno run -A --unstable _scripts/generateJsonFeed.ts && \
	zola serve

deploy:
		docker-compose build --no-cache && \
		docker-compose up -d
