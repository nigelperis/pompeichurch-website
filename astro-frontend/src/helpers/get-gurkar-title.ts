import { Locale } from "~/enums/locale";

export function getGurkarTitle(sex: string, lang: Locale): string {
  if (lang === Locale.KOK) {
    return sex === "Male" ? "ಗುರ್ಕಾರ್" : "ಗುರ್ಕಾರ್ನ್";
  } else {
    return sex === "Male" ? "Gurkar" : "Gurkaarn";
  }
}
