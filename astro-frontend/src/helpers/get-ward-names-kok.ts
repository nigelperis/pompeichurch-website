import { WardNamesKok } from "../enums/ward-names-kok";
import { Locale } from "../enums/locale";

export function getWardNameKok(ward: string | null, lang: Locale): string {
  if (!ward) return "Ward";
  return lang === Locale.KOK
    ? WardNamesKok[ward as keyof typeof WardNamesKok]!
    : ward;
}
