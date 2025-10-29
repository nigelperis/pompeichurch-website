import type { Event } from "~/models/event";

const getEventTimestamp = (event: Event) => {
  const created = event?.createdAt
    ? new Date(event.createdAt).getTime()
    : Number.NaN;
  if (!Number.isNaN(created)) {
    return created;
  }

  const scheduled = event?.eventDate
    ? new Date(event.eventDate).getTime()
    : Number.NaN;

  if (!Number.isNaN(scheduled)) {
    return scheduled;
  }

  return 0;
};

// Sort by creation time so latest posts appear first.
export function getEventsByNewest(events: Event[]): Event[] {
  return [...events].sort(
  (a, b) => getEventTimestamp(b) - getEventTimestamp(a),
 );
}