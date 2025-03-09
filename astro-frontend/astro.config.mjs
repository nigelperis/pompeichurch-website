import partytown from '@astrojs/partytown';
import node from '@astrojs/node';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
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
		domains: ['astro.build', 'http://localhost:1337'],
		// remotePatterns: [{ protocol: 'https' }, { protocol: 'http' }],
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