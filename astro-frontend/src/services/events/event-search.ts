import { listEvents } from "./list-events";

/**
 * Searches for events with a matching title or Konkani title.
 *
 * @param {string} query - The search query.
 * @param {string} [associationSlug] - The slug of the association to filter by.
 * @returns {Promise<Event[]>} A promise resolving to an array of matching events.
 */
export async function searchEvents(query: string, associationSlug?: string) {
  if (!query || query.length < 2) return [];

  const titleConditions = [
    { englishTitle: { $containsi: query } },
    { konkaniTitle: { $containsi: query } },
  ];

  let filters: Record<string, any>;

  if (associationSlug) {
    filters = {
      $or: titleConditions.map((condition) => ({
        ...condition,
        "association.slug": { $eq: associationSlug },
      })),
    };
  } else {
    filters = {
      $or: titleConditions,
    };
  }

  const { events } = await listEvents({
    page: 1,
    pageSize: 10,
    filters,
  });

  return events;
}
