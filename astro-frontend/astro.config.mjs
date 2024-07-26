import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

export default defineConfig({
	integrations: [tailwind(), icon()],
});
