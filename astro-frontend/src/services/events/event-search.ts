import type { Event } from "~/models/event";
import { createFuzzySearch } from "~/services/search/fuzzy-search";
import { listEvents } from "./list-events";

const fuzzyEventSearch = createFuzzySearch<Event>({
  keys: ["englishTitle", "konkaniTitle"],
  loadPage: async (page, pageSize, associationSlug) => {
    const result = await listEvents({
      page,
      pageSize,
      filters: associationSlug
        ? { "association.slug": { $eq: associationSlug } }
        : undefined,
    });
    return {
      items: result.events,
      pageCount: result.pagination.pageCount,
    };
  },
});

/**
 * Searches published event titles approximately, including minor typos.
 */
export function searchEvents(query: string, associationSlug?: string) {
  return fuzzyEventSearch(query, associationSlug);
}
