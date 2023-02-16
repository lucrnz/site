# lucsite

Hey! This is my [website](https://lucdev.net) source code.
Currently, it is an [static generated site](https://www.cloudflare.com/learning/performance/static-site-generator/).

## Notes

Currently I think I hit the limit of my understanding of Zola, I have a lot of ideas for the site but I can't implement them because of the limitations of the template engine.

I plan to move this project to [Astro](https://astro.build/) in the future, I think it will be a better fit for my needs.

## Tools used

+ [Zola](https://www.getzola.org/) to generate the site.
+ [Deno](https://deno.land/) to patch local resources and fetch external ones.
+ [GNU Bash](https://www.gnu.org/software/bash/) to run build script. POSIX shell might work, I haven't tested it.
+ [static-web-server](https://github.com/joseluisq/static-web-server) to host it.
+ [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/gettingstarted/) for deployment.
+ [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.js.org/) for TypeScript client-side code development.

## Development

This will prepare all the resources and start a local server, it will also setup a watcher for the TypeScript code.

```bash
pnpm install
pnpm run dev:zola
pnpm run dev:ts
```

## Deployment

A combination of tools is used, you can check the command `pnpm run build` and the github actions workflow to see how it works.

The tool uses a program called [mypli](https://github.com/lucrnz/mypli) that I wrote to manage my personal infrastructure.

## Disclaimer

I released the source code for transparency and to help other people create similar websites.

I keep my right to not give support/accept pull requests or give documentation.

## Copying

Read the [LICENSE](./LICENSE) file for more information.

