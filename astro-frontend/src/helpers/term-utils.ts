import { Locale } from "~/enums/locale";

export function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}

export function renderEndDate(endDate: string | null, lang: string): string {
  if (!endDate) {
    return lang === Locale.KOK ? "ಪ್ರಸ್ತುತ" : "Present";
  }
  return formatDate(endDate);
}
