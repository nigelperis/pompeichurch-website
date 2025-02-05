import type { Event, EventData } from '~/models/events';

import { strapiFetch } from '~/helpers/strapi-fetch';

async function getEvent(slug: string): Promise<Event | undefined> {
	const endpoint = '/events';

	const queryParams = new URLSearchParams({
    'populate[0]': 'eventImage',
    'filters[slug][$eq]': slug
	});

	const data = await strapiFetch<EventData>({
		endpoint,
		queryParams,
	});

	return data?.data[0];
}

export { getEvent };
