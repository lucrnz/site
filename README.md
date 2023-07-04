# lucsite

Hey! This is my [website](https://lucdev.net) source code.
Currently, it is an [static generated site](https://www.cloudflare.com/learning/performance/static-site-generator/).

## Tools used

- [Astro](https://astro.build/) - Framework for building static websites using components and TypeScript.
- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.js.org/) - JavaScript runtime and package manager.

## Development

This will prepare all the resources and start a local server.

```bash
pnpm run dev
```

If you need local HTTPS support, you can use [Caddy](https://caddyserver.com/) with the suplied [Caddyfile](./Caddyfile)

```sh
caddy run --config Caddyfile
```

Then access the site using the URL `lucdev.localhost`

_Note_: Firefox users need to enable the flag `security.enterprise_roots.enabled` to `true` by accessing `about:config` in the URL bar.

_Windows + WSL users:_ What I do is install Caddy with [Scoop](https://scoop.sh/#/apps?q=caddy) and then use PowerShell to navigate to the WSL mount.

## Disclaimer

I released the source code for transparency and to help other people create similar websites.

I keep my right to not give support/accept pull requests or give documentation.

## Copying

Read the [LICENSE](./LICENSE) file for more information.
