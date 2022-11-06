all: dev deploy
.PHONY: dev deploy

dev:
	zola build && \
	deno run -A _scripts/getXess.ts && \
	deno run -A _scripts/patchRssFeed.ts && \
  deno run -A --unstable _scripts/generateJsonFeed.ts && \
	zola serve

deploy:
		docker-compose build --no-cache && \
		docker-compose up -d

