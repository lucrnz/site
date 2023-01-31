# lucsite

Hey! This is my [website](https://lucdev.net) source code.

Currently, it is an [static generated site](https://www.cloudflare.com/learning/performance/static-site-generator/)

You can see the stylesheet source code [here](https://github.com/lucrnz/xess)

# Requirements

+ [Zola](https://www.getzola.org/) to generate the site.
+ [Deno](https://deno.land/) to patch local resources and fetch external ones.
+ [Make](https://www.gnu.org/software/make/) to run the convenience scripts (Optional)
+ [static-web-server](https://github.com/joseluisq/static-web-server) to host it. (Optional, can you use anything you want)
+ [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/gettingstarted/) for deployment. (Optional)

# Development

This will prepare all the resources and start a local server

	make dev

# Deployment

This command will invoke docker compose to build the image and autostart it

	make deploy

# Disclaimer

I released the source code for transparency and to help other people create similar websites.

I keep my right to not give support/accept pull requests or give documentation.

# Copying

Read the [LICENSE](./LICENSE) file for more information.

