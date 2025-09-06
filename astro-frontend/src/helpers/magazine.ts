import type { PompeichemFalkem } from "~/models/pompeichem-falkem";
import { ui, defaultLang } from "~/i18n/ui";

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

export function isSpecialEdition(magazine: PompeichemFalkem): boolean {
  return Boolean(
    (magazine.specialEditionTitle && magazine.specialEditionTitle.trim()) ||
      (magazine.specialEditionTitleKok &&
        magazine.specialEditionTitleKok.trim()),
  );
}

function enumTitleToKey(value: string): string | null {
  const v = value.toLowerCase();
  if (!v) return null;
  if (v.includes("easter") && v.includes("issue"))
    return "magazine.issue.easter";
  if (v.includes("monti") && v.includes("issue")) return "magazine.issue.monti";
  if (v.includes("christmas") && v.includes("issue"))
    return "magazine.issue.christmas";
  return null;
}
