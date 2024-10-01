import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    prefetch: true,
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
    devToolbar: {
        enabled: false,
    },
});