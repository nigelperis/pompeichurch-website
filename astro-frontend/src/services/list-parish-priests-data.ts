import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { ParishPriests, ParishPriestsData  } from "~/models/parish-priests";
import { Locale } from "~/enums/locale";

/**
 * Fetches a paginated list of parish priests from Strapi.
 * @param {Object} [args] - Optional parameters for fetching the list of parish priests.
 * @param {number} [args.page=1] - The page number to retrieve.
 * @param {number} [args.pageSize=25] - The number of parish priests per page.
 * @param {string} [args.sortBy='sNo:asc'] - The sorting order of the parish priests.
 * @param {Locale} [args.locale=Locale.EN] - The locale of the content to retrieve.
 * @returns {Promise<ParishPriests[]>} A promise that resolves to an array of ParishPriests objects.
 */

async function listParishPriests(args?: {
	page?: number;
	pageSize?: number;
	sortBy?: string;
	locale?: Locale;
}): Promise<ParishPriests[]> {
	const { page = 1, pageSize = 25, sortBy = 'sNo:asc', locale = Locale.EN } = args ?? {};

	const queryParams = new URLSearchParams({
		'populate[0]': 'image',
		'sort[0]': sortBy,
		'pagination[page]': String(page),
		'pagination[pageSize]': String(pageSize),
		'locale': locale
	});

	const data = await strapiFetch<ParishPriestsData>({ endpoint: ROUTES.PARISH_PRIESTS, queryParams });

	return data?.data ?? [];
}

export { listParishPriests };