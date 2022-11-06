all: deploy
.PHONY: deploy

deploy:
		docker-compose build --no-cache && \
		docker-compose up -d

