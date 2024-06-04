import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
const urlBase = "https://lucdev.net";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0"
  },
  devToolbar: {
    enabled: false
  },
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
    }),
    tailwind(),
    alpinejs({ entrypoint: "/src/scripts/alpinejs" })
  ]
});
