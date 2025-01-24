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
				poppins: ['poppins-latin-500-normal', defaultTheme.fontFamily.sans],
				'poppins-semibold': [
					'poppins-latin-600-normal',
					defaultTheme.fontFamily.sans,
				],
				montserrat: ['Montserrat', defaultTheme.fontFamily.sans],
				merriweather: ['Merriweather', defaultTheme.fontFamily.serif],
				lora: ['Lora', defaultTheme.fontFamily.serif],
				'noto-sans-kannada': [
					'noto-sans-kannada-latin-500-normal',
					defaultTheme.fontFamily.sans,
				],
				'noto-sans-kannada-semibold': [
					'noto-sans-kannada-latin-600-normal',
					defaultTheme.fontFamily.sans,
				],
				geist: ['geist-sans', defaultTheme.fontFamily.sans],
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
			},
		},
		animation: {
			slidein: 'slidein 1s ease-out var(--slidein-delay, 0) forwards',
		},
		screens: {
			xs: '320px', // Extra small devices (small phones)
			'sm-xs': '370px', // Small to medium phones
			'sm-md': '430px', // Medium phones (portrait)
			'sm-lg': '480px', // Medium phones (landscape)
			'md-xs': '550px', // Large phones / small tablets
			sm: '640px', // Standard small devices (phones)
			md: '768px', // Tablets or large phones
			'md-lg': '900px', // Small tablets in landscape / large phones
			'lg-sm': '1024px', // Small laptops / larger tablets
			'lg-md': '1152px', // Medium-sized laptops
			lg: '1280px', // Medium to large laptops
			'xl-sm': '1440px', // Large laptops / small desktop screens
			xl: '1536px', // Large desktops / high-resolution screens
		},
	},

	plugins: [require('tailwind-scrollbar')],
};
