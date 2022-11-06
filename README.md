# lucsite

Hey! This is my [website](https://lucdev.net) source code.

Currently, it is an [static generated site](https://www.cloudflare.com/learning/performance/static-site-generator/)

# Requirements

+ [Zola](https://www.getzola.org/) to generate the site.
+ [Deno](https://deno.land/) to patch local resources and fetch external ones.
+ [static-web-server](https://github.com/joseluisq/static-web-server) to host it. (Optional, can you use anything you want)

# Development

Prepare resources

	deno run -A _scripts/getXess.ts

Start local server

	zola serve

Build the site

	zola build

Patch the RSS Feed
	
	deno run -A _scripts/patchRssFeed.ts

Generate the JSON Feed

	deno run -A --unstable _scripts/generateJsonFeed.ts

# Deployment

You need [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/gettingstarted/)

	make deploy

Remove the `-d` flag to avoid autostart

# Disclaimer

I released the source code for transparency and to help other people create similar websites.

I keep my right to not give support/accept pull requests or give documentation.

# Copying

Read the [LICENSE](./LICENSE) file for more information.

