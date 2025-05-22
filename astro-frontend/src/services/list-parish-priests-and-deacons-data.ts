import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPriestsAndDeacons,
  ParishPriestsAndDeaconsData,
} from "~/models/parish-priest-and-deacon";
import { Locale } from "~/enums/locale";

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
  filters: Record<string, Record<string, any>>;
}): Promise<ParishPriestsAndDeacons[]> {
  const batchSize = 100;
  let page = 1;
  let priests: ParishPriestsAndDeacons[] = [];
  let hasMore = true;

  const { pageSize = 25, sortBy = "sNo:asc", locale = Locale.EN } = args ?? {};

  while (hasMore) {
    const queryParams = new URLSearchParams({
      "populate[0]": "image",
      "sort[0]": sortBy,
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
      locale,
    });

    for (const [field, operatorObject] of Object.entries(
      args?.filters as Record<string, any>,
    )) {
      const operator = Object.keys(operatorObject)[0];
      const value = operatorObject[operator];

      if (typeof value === "string" || typeof value === "number") {
        queryParams.append(`filters[${field}][${operator}]`, String(value));
      } else if (Array.isArray(value) && typeof value[0] != "object") {
        value.forEach((val) => {
          queryParams.append(`filters[${field}][${operator}]`, String(val));
        });
      } else {
        operatorObject.map((val: Record<string, any>, i = 0) => {
          const fieldKey = Object.keys(val)[0];
          const op = Object.keys(val[fieldKey])[0];

          queryParams.append(
            `filters[${field}][${i}][${fieldKey}][${op}]`,
            val[fieldKey][op],
          );
        });
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
