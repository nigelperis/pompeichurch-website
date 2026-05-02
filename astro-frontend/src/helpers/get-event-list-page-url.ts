import { Locale } from "~/enums/locale";

/**
 * Calls the `/api/events/find-page` endpoint to determine which paginated
 * events list page contains the given event, then returns the navigable URL.
 *
 * @param {number} eventId        - The numeric `id` of the event.
 * @param {Locale} locale         - The current locale, used to add the `/kok` prefix when needed.
 * @param {string} [associationSlug] - When provided, scopes the lookup to that association's
 *                                    event list and returns `/associations/[slug]/events?p=N`.
 * @returns {Promise<string>} A URL like `/events?p=2`, `/associations/slug/events?p=1`,
 *          or `/kok/events?p=2`. Falls back to the list root if the lookup fails.
 */
async function getEventListPageUrl(
  eventId: number,
  locale: Locale,
  associationSlug?: string,
): Promise<string> {
  const base = locale === Locale.KOK ? "/kok" : "";

  const fallback = associationSlug
    ? `${base}/associations/${associationSlug}/events`
    : `${base}/events`;

  try {
    const apiUrl = associationSlug
      ? `/api/events/find-page?id=${eventId}&association=${associationSlug}`
      : `/api/events/find-page?id=${eventId}`;

    const res = await fetch(apiUrl);

    if (!res.ok) return fallback;

    const json = (await res.json()) as { page?: number; slug?: string };

    if (!json.page || json.page < 1) return fallback;

    const hash = json.slug ? `#${json.slug}` : "";

    return `${fallback}?p=${json.page}${hash}`;
  } catch {
    return fallback;
  }
}

export { getEventListPageUrl };
