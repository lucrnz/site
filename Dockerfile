FROM ghcr.io/getzola/zola:v0.16.0 AS zola
FROM joseluisq/static-web-server AS sws
FROM denoland/deno:bin-1.26.0 AS deno

FROM debian:bullseye-slim AS build
COPY --from=deno /deno /usr/bin/deno
COPY --from=zola /bin/zola /usr/bin/zola
RUN mkdir -p /tmp/build
WORKDIR /tmp/build
ADD . .
RUN zola build && \
		deno run -A _scripts/getXess.ts

FROM alpine:3.16
COPY --from=sws /static-web-server /usr/bin/static-web-server
RUN addgroup -S www && \
		adduser -D -u 1000 -G www www && \
		mkdir /home/www/public
WORKDIR /home/www
COPY --from=build --chown=www:www /tmp/build/public ./public
USER www
ENTRYPOINT ["/usr/bin/static-web-server", "-p", "8080"]

