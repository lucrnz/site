import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";
const urlBase = "https://lucdev.net";

// https://astro.build/config

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
      sitemap: `${urlBase}/sitemap.xml`,
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
