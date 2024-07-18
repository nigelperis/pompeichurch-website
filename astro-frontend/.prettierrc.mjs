/** @type {import("prettier").Config} */
export default {
	plugins: [
		'prettier-plugin-astro',
		'prettier-plugin-organize-imports',
		'prettier-plugin-tailwindcss',
	],
	useTabs: true,
	singleQuote: true,
	semi: true,
	endOfLine: 'lf',
};
