import { Locale } from "~/enums/locale";
import { listEvents } from "./list-events";

export async function searchEvents(query: string, locale: Locale) {
  if (!query || query.length < 2) {
    return [];
  }

  const filters =
    locale === Locale.KOK
      ? { konkaniTitle: { $containsi: query } }
      : { englishTitle: { $containsi: query } };

  const { events } = await listEvents({
    page: 1,
    pageSize: 10,
    filters,
  });

  return events;
}
