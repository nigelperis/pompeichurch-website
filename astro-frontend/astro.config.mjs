import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
	integrations: [
		tailwind(),
		icon({
			iconDir: 'src/assets/icons',
		}),
		react(),
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
		enabled: true,
	},
	vite: {
		ssr: {
			noExternal: ['aos'],
		},
	},
});