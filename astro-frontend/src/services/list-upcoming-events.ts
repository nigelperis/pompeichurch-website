import { UPCOMING_EVENTS } from '~/constants/strapi-endpoints';
import { strapiFetch } from '~/helpers/strapi-fetch';
import type {
	UpcomingEvent,
	UpcomingEventsData,
} from '~/models/upcoming-event';

/**
 * Fetches a paginated list of upcoming events from the Strapi CMS.
 *
 * @param {Object} [args] - Optional parameters for fetching upcoming events.
 * @param {number} [args.page=1] - The page number to fetch (default: 1).
 * @param {number} [args.pageSize=25] - The number of events per page (default: 25).
 * @param {string} [args.sortBy='eventEndDate:asc'] - The sorting order for events (default: 'eventEndDate:asc').
 * @returns {Promise<UpcomingEvent[]>} A promise resolving to an array of upcoming events.
 */
async function listUpcomingEvents(args?: {
	page?: number;
	pageSize?: number;
	sortBy?: string;
}): Promise<UpcomingEvent[]> {
	const { page = 1, pageSize = 25, sortBy = 'eventEndDate:asc' } = args ?? {};

	const queryParams = new URLSearchParams({
		'populate[0]': 'eventImage',
		'sort[0]': sortBy,
		'pagination[page]': String(page),
		'pagination[pageSize]': String(pageSize),
	});

	const data = await strapiFetch<UpcomingEventsData>({ endpoint: UPCOMING_EVENTS, queryParams });

	return data?.data ?? [];
}

export { listUpcomingEvents };
