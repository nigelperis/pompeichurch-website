import { POMPEICHEM_FALKEM } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { PompeichemFalkem, PompeichemFalkemData } from "~/models/pompeichem-falkem";


/**
 * Fetches a paginated list of "Pompeichem Falkem" magazines from the Strapi CMS.
 *
 * @param {Object} [args] - Optional parameters for fetching magazines.
 * @param {number} [args.page=1] - The page number to fetch (default: 1).
 * @param {number} [args.pageSize=25] - The number of magazines per page (default: 25).
 * @param {string} [args.sortBy='dateOfPublish:desc'] - The sorting order for magazines (default: 'dateOfPublish:desc').
 * @returns {Promise<PompeichemFalkem[]>} A promise resolving to an array of magazines.
 */
async function listMagazines(args?: {
	page?: number;
	pageSize?: number;
	sortBy?: string;
}): Promise<PompeichemFalkem[]> {
	const { page = 1, pageSize = 25, sortBy = 'dateOfPublish:desc' } = args ?? {};

	const queryParams = new URLSearchParams({
		'populate[0]': 'coverImage',
		'sort[0]': sortBy,
		'pagination[page]': String(page),
		'pagination[pageSize]': String(pageSize),
	});

	const data = await strapiFetch<PompeichemFalkemData>({ endpoint: POMPEICHEM_FALKEM, queryParams });

	return data?.data ?? [];
}

export { listMagazines };