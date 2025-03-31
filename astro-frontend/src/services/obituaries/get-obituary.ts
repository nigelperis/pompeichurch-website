import { ROUTES } from '~/constants/strapi-endpoints';
import { strapiFetch } from '~/helpers/strapi-fetch';
import type { Obituary, ObituaryData } from '~/models/obituary';

/**
 * Fetches the latest obituary from Strapi.
 *
 * @returns {Promise<Obituary | undefined>} A promise that resolves to the latest obituary data or `undefined` if not found.
 */
async function getObituary(): Promise<Obituary | undefined> {
	const queryParams = new URLSearchParams({
		'populate[0]': 'image',
	});

	const data = await strapiFetch<ObituaryData>({
		endpoint: ROUTES.OBITUARIES,
		queryParams,
	});

	return data?.data[0];
}

export { getObituary };
