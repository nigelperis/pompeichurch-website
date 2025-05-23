import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPriestsAndDeacons,
  ParishPriestsAndDeaconsData,
} from "~/models/parish-priest-and-deacon";
import { Locale } from "~/enums/locale";
import { ClergyRole } from "~/enums/clergy-role";

/**
 * Fetches a paginated list of priests and deacons from Strapi.
 *
 * @param {Object} [args] - Optional parameters for fetching the list of priests and deacons.
 * @param {number} [args.page=1] - The page number to retrieve.
 * @param {number} [args.pageSize=25] - The number of priests and deacons per page.
 * @param {string} [args.sortBy='sNo:asc'] - The sorting order of the priests and deacons.
 * @param {Locale} [args.locale=Locale.EN] - The locale of the content to retrieve.
 * @param {Record<string, Record<string, any>>} [args.filters] - Filters to apply when fetching the list of priests and deacons.
 * @returns {Promise<ParishPriestsAndDeacons[]>} A promise that resolves to an array of ParishPriestsAndDeacons objects.
 */
async function listParishPriestsAndDeacons(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  locale?: Locale;
  filters: Record<string, any>;
}): Promise<ParishPriestsAndDeacons[]> {
  const batchSize = 100;
  let page = 1;
  let priests: ParishPriestsAndDeacons[] = [];
  let hasMore = true;

  const {
    pageSize = 25,
    sortBy = "sNo:asc",
    locale = Locale.EN,
    filters = { role: { $eq: ClergyRole.PARISH_PRIEST } },
  } = args ?? {};

  while (hasMore) {
    const queryParams = new URLSearchParams({
      "populate[0]": "image",
      "sort[0]": sortBy,
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
      locale,
    });

    for (const field in filters) {
      const condition = filters[field];
      if (typeof condition === "object") {
        for (const operator in condition) {
          queryParams.append(`filters[${field}][${operator}]`, String(condition[operator]));
        }
      } else {
        queryParams.append(`filters[${field}][$eq]`, String(condition));
      }
    }

    const data = await strapiFetch<ParishPriestsAndDeaconsData>({
      endpoint: ROUTES.PARISH_PRIESTS_AND_DEACONS,
      queryParams,
    });

    if (data?.data?.length) {
      priests.push(...data?.data);
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
