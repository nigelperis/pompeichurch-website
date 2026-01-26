import { listEvents } from "./list-events";

export async function searchEvents(query: string) {
  if (!query || query.length < 2) {
    return [];
  }

  const { events } = await listEvents({
    page: 1,
    pageSize: 5,
    filters: {
      englishTitle: { $containsi: query },
    },
    sortBy: ["eventDate:desc"],
  });

  return events;
}
