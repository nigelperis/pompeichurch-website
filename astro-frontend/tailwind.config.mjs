import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'inknut-antiqua': ['Inknut Antiqua', defaultTheme.fontFamily.serif],
				roboto: ['Roboto', defaultTheme.fontFamily.sans],
			},
			keyframes: {
				slidein: {
					from: {
						opacity: '0',
						transform: 'translateY(20px)',
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				slideInLeft: {
					from: {
						opacity: '0',
						transform: 'translateX(-100%)',
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				slideInRight: {
					from: {
						opacity: '0',
						transform: 'translateX(100%)',
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
			},
		},
		animation: {
			slidein: 'slidein 1s ease-out var(--slidein-delay, 0) forwards',
			'slidein-left': 'slideInLeft 1s ease-out forwards',
			'slidein-right': 'slideInRight 1s ease-out forwards',
		},
	},

	plugins: [],
};
