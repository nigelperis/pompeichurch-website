import type { PompeichemFalkem } from "~/models/pompeichem-falkem";
import { ui, defaultLang } from "~/i18n/ui";

const MAGAZINE_TITLE_KEYS: Record<string, string> = {
  "Easter Edition": "magazine.edition.easter",
  "Monti Feast Edition": "magazine.edition.monti",
  "Christmas Edition": "magazine.edition.christmas",
};

/**
 * Logic:
 * - If special edition, prefer Kok title when lang is 'kok', else English title
 * - Otherwise fall back to `magazineTitle` (Enumeration string)
 */
export function getMagazineDisplayTitle(
  magazine: PompeichemFalkem,
  lang: "en" | "kok" = "en",
): string {
  const isSpecial = isSpecialEdition(magazine);
  if (isSpecial) {
    if (lang === "kok") {
      const kok = (magazine.specialEditionTitleKok ?? "").trim();
      if (kok) return kok;
    }
    const en = (magazine.specialEditionTitle ?? "").trim();
    if (en) return en;
  }
  const raw = (magazine.magazineTitle ?? "").trim();
  const key = enumTitleToKey(raw);
  if (key) {
    const l = (lang in ui ? lang : defaultLang) as keyof typeof ui;
    const localized = (ui as any)[l]?.[key] ?? (ui as any)[defaultLang]?.[key];
    if (typeof localized === "string" && localized.trim()) return localized;
  }
  return raw;
}

export function getMagazineSlug(magazine: PompeichemFalkem): string {
  return magazine.slug;
}

export function getMagazinePagePath(
  magazine: PompeichemFalkem,
  lang: "en" | "kok" = "en",
): string {
  const prefix = lang === "kok" ? "/kok" : "";
  return `${prefix}/pompeichem-falkem/${getMagazineSlug(magazine)}`;
}

export function isSpecialEdition(magazine: PompeichemFalkem): boolean {
  return Boolean(
    (magazine.specialEditionTitle && magazine.specialEditionTitle.trim()) ||
    (magazine.specialEditionTitleKok && magazine.specialEditionTitleKok.trim()),
  );
}

export function isCentenaryEdition(magazine: PompeichemFalkem): boolean {
  const en = (magazine.specialEditionTitle || "").toLowerCase();
  const kok = (magazine.specialEditionTitleKok || "").toLowerCase();
  // Prioritize explicit English naming; fallback checks for common root "centenary"
  return (
    (!!en && en.includes("centenary")) || (!!kok && kok.includes("centenary"))
  );
}

export function compareByPublishDateAsc(
  a: PompeichemFalkem,
  b: PompeichemFalkem,
): number {
  const da = a.dateOfPublish ? new Date(a.dateOfPublish).getTime() : 0;
  const db = b.dateOfPublish ? new Date(b.dateOfPublish).getTime() : 0;
  return da - db;
}

function enumTitleToKey(value: string): string | null {
  return MAGAZINE_TITLE_KEYS[value] ?? null;
}
