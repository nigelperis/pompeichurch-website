import type { PompeichemFalkem } from "~/models/pompeichem-falkem";
import { ui, defaultLang } from "~/i18n/ui";
import { Locale } from "~/enums/locale";

const MAGAZINE_TITLE_KEYS: Record<string, string> = {
  "Easter Edition": "magazine.edition.easter",
  "Monti Feast Edition": "magazine.edition.monti",
  "Christmas Edition": "magazine.edition.christmas",
};

export function getMagazineDisplayTitle(
  magazine: PompeichemFalkem,
  lang: Locale = Locale.EN,
): string {
  if (isSpecialEdition(magazine)) {
    if (lang === Locale.KOK) {
      const kok = (magazine.specialEditionTitleKok ?? "").trim();
      if (kok) return kok;
    }
    const en = (magazine.specialEditionTitle ?? "").trim();
    if (en) return en;
  }

  const raw = (magazine.magazineTitle ?? "").trim();
  const key = MAGAZINE_TITLE_KEYS[raw];
  if (key) {
    const l = (lang in ui ? lang : defaultLang) as keyof typeof ui;
    const localized = (ui as any)[l]?.[key] ?? (ui as any)[defaultLang]?.[key];
    if (typeof localized === "string" && localized.trim()) return localized;
  }
  return raw;
}

export function getMagazinePagePath(
  magazine: PompeichemFalkem,
  lang: Locale = Locale.EN,
): string {
  const prefix = lang === Locale.KOK ? "/kok" : "";
  return `${prefix}/pompeichem-falkem/${magazine.slug}`;
}

export function getMagazineCoverImage(magazine: PompeichemFalkem) {
  return magazine.coverImage.formats?.medium ?? magazine.coverImage;
}

export function isSpecialEdition(magazine: PompeichemFalkem): boolean {
  return Boolean(
    magazine.specialEditionTitle?.trim() ||
    magazine.specialEditionTitleKok?.trim(),
  );
}

function isSingleCentenaryEdition(magazine: PompeichemFalkem): boolean {
  const en = (magazine.specialEditionTitle || "").toLowerCase();
  const kok = (magazine.specialEditionTitleKok || "").toLowerCase();
  return en.includes("centenary") || kok.includes("centenary");
}

export function isCentenaryEdition(magazine: PompeichemFalkem): boolean;
export function isCentenaryEdition(
  magazines: PompeichemFalkem[],
): PompeichemFalkem[];
export function isCentenaryEdition(
  input: PompeichemFalkem | PompeichemFalkem[],
): boolean | PompeichemFalkem[] {
  if (!Array.isArray(input)) return isSingleCentenaryEdition(input);

  const [latest, ...rest] = input;
  if (!latest) return [];

  const centenary = rest.find(isSingleCentenaryEdition);
  if (!centenary) return input;

  return [latest, centenary, ...rest.filter((m) => m.id !== centenary.id)];
}
