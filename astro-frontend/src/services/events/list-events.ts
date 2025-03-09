import { strapiFetch } from '~/helpers/strapi-fetch';
import type { Event, EventData } from '~/models/events';

async function listEvents(args?: {
	/**@defaultValue 1 */
	page?: number;
	/**@defaultValue 25 */
	pageSize?: number;
	/**@defaultValue 'eventDate:asc' */
	sortBy?: string;
}): Promise<Event[]> {
	const { page = 1, pageSize = 25, sortBy = 'eventDate:desc' } = args ?? {};
	const endpoint = '/events';

	const queryParams = new URLSearchParams({
		'populate[0]': 'eventImage',
		'sort[0]': sortBy,
		'pagination[page]': String(page),
		'pagination[pageSize]': String(pageSize),
	});

	const data = await strapiFetch<EventData>({ endpoint, queryParams });

	return data?.data ?? [];
}

export { listEvents };
