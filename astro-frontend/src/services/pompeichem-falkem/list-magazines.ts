import { strapiFetch } from '~/helpers/strapi-fetch';
import type { PompeichemFalkem, PompeichemFalkemData } from '~/models/pompeichem-falkem';

async function listMagazines(args?: {
	page?: number;
	pageSize?: number;
	sortBy?: string;  
}): Promise<PompeichemFalkem[]> {
	const { page = 1, pageSize = 25, sortBy = 'dateOfPublish:desc' } = args ?? {};
	const endpoint = '/pompeichem-falkems';

	const queryParams = new URLSearchParams({
		'populate[0]': 'coverImage',
		'sort[0]': sortBy,
		'pagination[page]': String(page),
		'pagination[pageSize]': String(pageSize),
	});

	const data = await strapiFetch<PompeichemFalkemData>({ endpoint, queryParams });

	return data?.data ?? [];
}

export { listMagazines };