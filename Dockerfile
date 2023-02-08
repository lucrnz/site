FROM ghcr.io/getzola/zola:v0.16.1 AS zola
FROM joseluisq/static-web-server:2 AS sws
FROM denoland/deno:bin-1.30.0 AS deno

FROM debian:bullseye-slim AS build
RUN apt-get -y update && apt-get install -y curl
COPY --from=deno /deno /usr/bin/deno
COPY --from=zola /bin/zola /usr/bin/zola
RUN mkdir -p /tmp/build
WORKDIR /tmp/build
ADD . .
RUN zola build && \
		deno run -A scripts/patchRssFeed.ts && \
		deno run -A --unstable scripts/generateJsonFeed.ts

FROM alpine:3.17
COPY --from=sws /static-web-server /usr/bin/static-web-server
RUN addgroup -S www && \
		adduser -D -u 1000 -G www www && \
		mkdir /home/www/public
WORKDIR /home/www
COPY --from=build --chown=www:www /tmp/build/public ./public
USER www
ENTRYPOINT ["/usr/bin/static-web-server", "-p", "8080", "-g", "info"]
