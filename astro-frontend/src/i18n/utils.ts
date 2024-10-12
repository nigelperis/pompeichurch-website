import { defaultLang, ui } from './ui';

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

type UiKeys = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: keyof typeof ui) {
	function t(key: UiKeys): string;
	function t(key: string): string;
	function t(key: string): string {
		return ui[lang][key as UiKeys] || ui[defaultLang][key as UiKeys] || key;
	}
	return t;
}
