// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://adheeban.com",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  // Fetch a page when the pointer rests on its link, so the click finds it ready.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  integrations: [sitemap()],
});
