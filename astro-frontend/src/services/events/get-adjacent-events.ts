import type { Event } from "~/models/event";
import { listEvents } from "~/services/events/list-events";
import { EVENT_DEFAULT_SORT } from "~/constants/index";

export async function getAdjacentEvents(currentEvent: Event) {
  const { eventDate, createdAt, id } = currentEvent;

  const [prevResult, nextResult] = await Promise.all([
    // Previous: closest newer event
    listEvents({
      pageSize: 1,
      sortBy: ["eventDate:asc", "createdAt:asc", "id:asc"],
      filters: {
        $or: [
          { eventDate: { $gt: eventDate } },
          {
            eventDate: { $eq: eventDate },
            createdAt: { $gt: createdAt },
          },
          {
            eventDate: { $eq: eventDate },
            createdAt: { $eq: createdAt },
            id: { $gt: id },
          },
        ],
      },
    }),

    // Next: closest older event
    listEvents({
      pageSize: 1,
      sortBy: EVENT_DEFAULT_SORT,
      filters: {
        $or: [
          { eventDate: { $lt: eventDate } },
          {
            eventDate: { $eq: eventDate },
            createdAt: { $lt: createdAt },
          },
          {
            eventDate: { $eq: eventDate },
            createdAt: { $eq: createdAt },
            id: { $lt: id },
          },
        ],
      },
    }),
  ]);

  return {
    prevEvent: prevResult.events[0],
    nextEvent: nextResult.events[0],
  };
}
