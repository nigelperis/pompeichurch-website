import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  UpcomingEvent,
  UpcomingEventsData,
} from "~/models/upcoming-event";

/**
 * Fetches a paginated list of upcoming events from the Strapi CMS.
 *
 * @param {Object} [args] - Optional parameters for fetching upcoming events.
 * @param {number} [args.page=1] - The page number to fetch (default: 1).
 * @param {number} [args.pageSize=25] - The number of events per page (default: 25).
 * @param {string} [args.sortBy='eventDate:asc'] - The sorting order for events (default: 'eventDate:asc').
 * @returns {Promise<UpcomingEvent[]>} A promise resolving to an array of upcoming events.
 */
async function listUpcomingEvents(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
}): Promise<UpcomingEvent[]> {
  const { page = 1, pageSize = 25, sortBy = "eventDate:asc" } = args ?? {};

  const queryParams = new URLSearchParams({
    "populate[0]": "eventImage",
    "sort[0]": sortBy,
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });

  const data = await strapiFetch<UpcomingEventsData>({
    endpoint: ROUTES.UPCOMING_EVENTS,
    queryParams,
  });

  return data?.data ?? [];
}

export { listUpcomingEvents };
