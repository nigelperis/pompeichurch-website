import partytown from "@astrojs/partytown";
import node from "@astrojs/node";
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  prefetch: true,
  compressHTML: true,
  site: "https://pompeichurch.in",
  integrations: [
    icon({
      iconDir: "src/assets/icons",
    }),
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(
      {
        i18n: {
          defaultLocale: "en",
          locales: {
            en: "en-IN",
            kok: "kok-IN",
          },
        },
      },
      {
        serialize(item) {
          const setUrl = [
            { pattern: /\/obituary/, changefreq: "weekly", priority: 0.9 },
            { pattern: /\/events/, changefreq: "weekly", priority: 0.9 },
            { pattern: /\/index/, changefreq: "weekly", priority: 1.0 },
          ];

          for (const url of setUrl) {
            if (url.pattern.test(item.url)){
              item.changefreq = url.changefreq;
              item.priority = url.priority;
              item.lastmod = new Date();
            }
          }
          return item;
        },
      },
    ),
  ],
  i18n: {
    locales: ["en", "kok"],
    defaultLocale: "en",
    routing: {
      redirectToDefaultLocale: true,
    },
  },
  image: {
    domains: ["astro.build", "strapi.pompeichurch.in"],
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["aos"],
    },
    build: {
      minify: "terser",
      rollupOptions: {},
      cssCodeSplit: true,
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          ie8: false,
        },
      },
    },
  },
});