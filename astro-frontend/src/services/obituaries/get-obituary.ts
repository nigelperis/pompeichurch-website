import { strapiFetch } from '~/helpers/strapi-fetch';
import type { Obituary, ObituaryData } from '~/models/obituary';

async function getObituary(): Promise<Obituary | undefined> {
	const endpoint = '/obituaries';

	const queryParams = new URLSearchParams({
		'populate[0]': 'image',
	});

	const data = await strapiFetch<ObituaryData>({
		endpoint,
		queryParams,
	});

	return data?.data[0];
}

export { getObituary };
