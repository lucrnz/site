FROM ghcr.io/getzola/zola:v0.16.1 AS zola
FROM joseluisq/static-web-server:2 AS sws
FROM denoland/deno:bin-1.30.0 AS deno

FROM node:lts-bullseye AS build
RUN apt-get -y update && apt-get install -y curl
COPY --from=deno /deno /usr/bin/deno
COPY --from=zola /bin/zola /usr/bin/zola
RUN mkdir -p /tmp/build
WORKDIR /tmp/build
ADD . .

RUN find "./scripts" -name "*.sh" -exec chmod +x {} \;

RUN npm install -g pnpm && \
	pnpm install && \
	pnpm run build

FROM node:lts-alpine3.16
RUN apk add --no-cache bash
COPY --from=sws /static-web-server /usr/bin/static-web-server
COPY ./scripts/dockerEntrypoint.sh /usr/bin/docker-entrypoint.sh
RUN chmod +x /usr/bin/docker-entrypoint.sh && \
	mkdir -p /app && \
	chown 1000:1000 /app

USER 1000
WORKDIR /app
COPY --from=build --chown=1000 /tmp/build/public ./public

ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]
