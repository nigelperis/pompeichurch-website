import { defaultLang, ui } from "./ui";
import { Locale } from "~/enums/locale";

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (lang === Locale.KOK) return Locale.KOK;
  return Locale.EN;
}

type UiKeys = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Locale) {
  function t(key: UiKeys): string;
  function t(key: string): string;
  function t(key: string): string {
    return ui[lang][key as UiKeys] || ui[defaultLang][key as UiKeys] || key;
  }
  return t;
}
