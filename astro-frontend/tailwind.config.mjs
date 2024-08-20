import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'natgeo-yellow': {
					DEFAULT: '#ffdd00',
					50: '#feffe7',
					100: '#fcffc1',
					200: '#feff86',
					300: '#fff941',
					400: '#ffec0d',
					500: '#ffdd00',
					600: '#d1a300',
					700: '#a67502',
					800: '#895b0a',
					900: '#744a0f',
					950: '#442704',
				},
			},
			fontFamily: {
				'bona-nova-sc': ['Bona Nova SC', defaultTheme.fontFamily.serif],
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
				zoomIn: {
					from: {
						opacity: '0',
						transform: 'scale(0)',
					},
					to: {
						opacity: '1',
						transform: 'scale(1)',
					},
				},
			},
		},
		animation: {
			slidein: 'slidein 1s ease-out var(--slidein-delay, 0) forwards',
			'slidein-left': 'slideInLeft 1s ease-out forwards',
			'slidein-right': 'slideInRight 1s ease-out forwards',
			'zoom-in': 'zoomIn 1s ease-out forwards',
		},
	},

	plugins: [require('tailwind-scrollbar')],
};
