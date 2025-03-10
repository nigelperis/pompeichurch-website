import partytown from '@astrojs/partytown';
import node from '@astrojs/node';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

const adapter =
  import.meta.env.ADAPTER === 'netlify'
    ? netlify()
    : node({ mode: 'standalone' });

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter,
	prefetch: true,
  site: "https://pompeichurch.in",
	integrations: [
		tailwind(),
		icon({
			iconDir: 'src/assets/icons',
		}),
		react(),
		partytown({
			config: {
				forward: ['dataLayer.push'],
			},
		}),
	],
	i18n: {
		locales: ['en', 'kok'],
		defaultLocale: 'en',
		routing: {
			redirectToDefaultLocale: true,
		},
	},
	image: {
		domains: ['astro.build', 'strapi.pompeichurch.in'],
	},
	devToolbar: {
		enabled: false,
	},
	vite: {
		ssr: {
			noExternal: ['aos'],
		},
	},
});