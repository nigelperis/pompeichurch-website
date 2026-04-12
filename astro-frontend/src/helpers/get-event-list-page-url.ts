import { Locale } from "~/enums/locale";

/**
 * Calls the `/api/events/find-page` endpoint to determine which paginated
 * events list page contains the given event, then returns the navigable URL.
 *
 * @param {number} eventId - The numeric `id` of the event.
 * @param {Locale} locale  - The current locale, used to add the `/kok` prefix when needed.
 * @returns {Promise<string>} A URL string like `/events?p=2` or `/kok/events?p=2`.
 *          Falls back to `/events` (or `/kok/events`) if the lookup fails.
 */
async function getEventListPageUrl(
  eventId: number,
  locale: Locale,
): Promise<string> {
  const base = locale === Locale.KOK ? "/kok" : "";
  const fallback = `${base}/events`;

  try {
    const res = await fetch(`/api/events/find-page?id=${eventId}`);

    if (!res.ok) return fallback;

    const json = (await res.json()) as { page?: number; slug?: string };

    if (!json.page || json.page < 1) return fallback;

    const hash = json.slug ? `#${json.slug}` : "";
    return `${base}/events?p=${json.page}${hash}`;
  } catch {
    return fallback;
  }
}

export { getEventListPageUrl };
