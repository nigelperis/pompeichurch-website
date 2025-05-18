import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPriestsAndDeacons,
  ParishPriestsAndDeaconsData,
} from "~/models/parish-priest-and-deacon";
import { Locale } from "~/enums/locale";

/**
 * Fetches a paginated list of priests and deacons from the Strapi CMS.
 *
 * @param {Object} [args] - Optional parameters for fetching priests and deacons.
 * @param {number} [args.page=1] - The page number to fetch.
 * @param {number} [args.pageSize=25] - The number of priests and deacons per page.
 * @param {string} [args.sortBy='sNo:asc'] - The sorting order for priests and deacons.
 * @param {Locale} [args.locale=Locale.EN] - The locale in which to fetch the priests and deacons.
 * @param {string} [args.filters='Parish Priest'] - The filters to apply when fetching priests and deacons.
 * @returns {Promise<ParishPriestsAndDeacons[]>} A promise resolving to an array of ParishPriestsAndDeacons objects.
 */

async function listParishPriestsAndDeacons(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  locale?: Locale;
  filters?: string;
}): Promise<ParishPriestsAndDeacons[]> {
  const batchSize = 100;
  let page = 1;
  let priests: ParishPriestsAndDeacons[] = [];
  let hasMore = true;

  while (hasMore) {
    const {
      pageSize = 25,
      sortBy = "sNo:asc",
      locale = Locale.EN,
      filters = "Parish Priest",
    } = args ?? {};

    const queryParams = new URLSearchParams({
      "populate[0]": "image",
      "sort[0]": sortBy,
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
      locale: locale,
      "filters[role][$eq]": filters,
    });

    const data = await strapiFetch<ParishPriestsAndDeaconsData>({
      endpoint: ROUTES.PARISH_PRIESTS_AND_DEACONS,
      queryParams,
    });

    if (data?.data?.length) {
      priests = [...priests, ...data?.data];
      page++;

      if (data?.data?.length < batchSize) {
        hasMore = false;
      }
    } else {
      hasMore = false;
    }
  }

  return priests;
}

export { listParishPriestsAndDeacons };
