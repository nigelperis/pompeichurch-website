import type { Event, EventData } from '~/models/event';
import { strapiFetch } from '~/helpers/strapi-fetch';
import { ROUTES } from '~/constants/strapi-endpoints';

/**
 * Fetches a specific event from the Strapi CMS based on the provided slug.
 *
 * @param {string} slug - The unique slug of the event to fetch.
 * @returns {Promise<Event | undefined>} A promise resolving to the event object if found, or `undefined` if not.
 */
async function getEvent(slug: string): Promise<Event | undefined> {
	const queryParams = new URLSearchParams({
		'populate[0]': 'eventImage',
		'filters[slug][$eq]': slug,
	});

	const data = await strapiFetch<EventData>({
		endpoint: ROUTES.EVENTS,
		queryParams,
	});

	return data?.data?.[0];
}

export { getEvent };
