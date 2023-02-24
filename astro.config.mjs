import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import robotsTxt from "astro-robots-txt";

const urlBase = "https://lucdev.net";

// https://astro.build/config
export default defineConfig({
  site: urlBase,
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
