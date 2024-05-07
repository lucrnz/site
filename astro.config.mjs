import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// I'll delay updating to Astro Icon v1 because it has a glitch.
// import astroIcon from "astro-icon";

import robotsTxt from "astro-robots-txt";
const urlBase = "https://lucdev.net";

// https://astro.build/config
export default defineConfig({
  site: urlBase,
  markdown: {
    shikiConfig: {
      theme: "dark-plus"
    }
  },
  integrations: [
    mdx(),
    sitemap(),
    robotsTxt({
      sitemap: `${urlBase}/sitemap-index.xml`,
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/404", "/resume"]
        }
      ]
    })
  ]
});
