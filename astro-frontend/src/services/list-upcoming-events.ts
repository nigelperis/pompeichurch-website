import { strapiFetch } from '~/helpers/strapi-fetch';
import type {
	UpcomingEvent,
	UpcomingEventsData,
} from '~/models/upcoming-events';

async function listUpcomingEvents(args?: {
	/** @defaultValue 1 */
	page?: number;
	/** @defaultValue 25 */
	pageSize?: number;
	/** @defaultValue 'eventEndDate:asc' */
	sortBy?: string;
}): Promise<UpcomingEvent[]> {
	const { page = 1, pageSize = 25, sortBy = 'eventEndDate:asc' } = args ?? {};
	const endpoint = '/upcoming-events';

	const queryParams = new URLSearchParams({
		'populate[0]': 'eventImage',
		'sort[0]': sortBy,
		'pagination[page]': String(page),
		'pagination[pageSize]': String(pageSize),
	});

	const data = await strapiFetch<UpcomingEventsData>({ endpoint, queryParams });

	return data?.data ?? [];
}

export { listUpcomingEvents };
