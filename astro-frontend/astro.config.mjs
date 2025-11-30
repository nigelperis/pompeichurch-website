import partytown from "@astrojs/partytown";
import node from "@astrojs/node";
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

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
    plugins: [tailwindcss(), svgr()],
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
