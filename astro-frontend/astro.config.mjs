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
	devToolbar: {
		enabled: false,
	},
});
