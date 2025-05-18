import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { EventData, EventsPagination } from "~/models/event";

/**
 * Fetches a paginated list of events from the Strapi CMS.
 *
 * @param {Object} [args] - Optional parameters for fetching events.
 * @param {number} [args.page=1] - The page number to fetch.
 * @param {number} [args.pageSize=25] - The number of events per page.
 * @param {string[]} [args.sortBy=['eventDate:desc']] - Sorting order for events.
 * @param {Record<string, any>} [args.filters] - Filters to apply when fetching events.
 * @returns {Promise<EventsPagination>} A promise resolving to an object containing the events and pagination metadata.
 */
async function listEvents(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string[];
  filters?: Record<string, any>;
}): Promise<EventsPagination> {
  const {
    page = 1,
    pageSize = 25,
    sortBy = ["eventDate:desc"],
    filters,
  } = args ?? {};

  const queryParams = new URLSearchParams({
    "populate[0]": "eventImage",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });

  sortBy.forEach((s, i) => queryParams.append(`sort[${i}]`, s));

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === "object") {
        Object.entries(value).forEach(([op, val]) => {
          queryParams.append(`filters[${key}][${op}]`, String(val));
        });
      } else {
        queryParams.append(`filters[${key}]`, String(value));
      }
    });
  }

  const data = await strapiFetch<EventData>({
    endpoint: ROUTES.EVENTS,
    queryParams,
  });

  return {
    events: data?.data ?? [],
    pagination: data?.meta?.pagination ?? {
      total: 0,
      page,
      pageSize,
      pageCount: 0,
    },
  };
}

export { listEvents };
