import { strapiFetch } from '~/helpers/strapi-fetch';
import type { Obituary, ObituaryData } from '~/models/obituary';

interface ObituaryPagination {
	obituaries: Obituary[];
	pagination: {
		total: number;
		page: number;
		pageSize: number;
		pageCount: number;
	};
}

async function listObituaries(args?: {
	/**@defaultValue 1 */
	page?: number;
	/**@defaultValue 25 */
	pageSize?: number;
	/**@defaultValue 'dateOfDeath:desc' */
	sortBy?: string;
}): Promise<ObituaryPagination> {
	const { page = 1, pageSize = 25, sortBy = 'dateOfDeath:desc' } = args ?? {};
	const endpoint = '/obituaries';

	const queryParams = new URLSearchParams({
		'populate[0]': 'image',
		'sort[0]': sortBy,
		'pagination[page]': String(page),
		'pagination[pageSize]': String(pageSize),
	});

	const data = await strapiFetch<ObituaryData>({ endpoint, queryParams });

	return {
		obituaries: data?.data ?? [],
		pagination: data?.meta?.pagination ?? {
			total: 0,
			page,
			pageSize,
			pageCount: 0,
		},
	};
}

export { listObituaries };
