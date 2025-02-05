import type { Event, EventData } from '~/models/events';

import { strapiFetch } from '~/helpers/strapi-fetch';

async function listEvents(args?: {
	/**@defaultValue 1 */
	page?: number;
	/**@defaultValue 25 */
	pageSize?: number;
}): Promise<Event[] | undefined> {
	const { page = 1, pageSize = 25 } = args ?? {};
	const endpoint = '/events';

	const queryParams = new URLSearchParams({
		'populate[0]': 'eventImage',
		'sort[0]': 'updatedAt:desc',
		'pagination[page]': String(page),
		'pagination[pageSize]': String(pageSize),
	});

	const data = await strapiFetch<EventData>({
		endpoint,
    queryParams
	});

	return data?.data;
}

export { listEvents };
