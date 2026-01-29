import { Locale } from "~/enums/locale";

export function getNoResultsMessage(query: string, locale: Locale) {
  if (locale === Locale.KOK) {
    return (
      <>
        <strong className="font-bold"> "{query}" </strong> ಸೊದ್ಣೆಕ್ ಕಾಂಯ್
        ಫಲಿತಾಂಶ್ ನಾ.
      </>
    );
  }

  return (
    <>
      No results found for <strong className="font-bold"> "{query}"</strong>.
    </>
  );
}
