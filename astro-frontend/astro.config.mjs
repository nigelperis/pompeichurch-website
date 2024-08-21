import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		icon({
			iconDir: 'src/assets/icons',
		}),
	],
	i18n: {
		locales: ['en', 'kok'],
		defaultLocale: 'en',
		routing: {
			redirectToDefaultLocale: true,
		},
	},
	devToolbar: {
		enabled: false,
	},
});
