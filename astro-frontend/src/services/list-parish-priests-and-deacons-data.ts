import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPriestsAndDeacons,
  ParishPriestsAndDeaconsData,
} from "~/models/parish-priest-and-deacon";
import { Locale } from "~/enums/locale";
import { Role } from "~/enums/role";

/**
 * Fetches a paginated list of parish priests and deacons from Strapi.
 *
 * @param {Object} [args] - Optional parameters for fetching the list.
 * @param {number} [args.page=1] - The initial page number to retrieve.
 * @param {number} [args.pageSize=25] - The number of items per page.
 * @param {string} [args.sortBy='sNo:asc'] - The sorting order of the items.
 * @param {Locale} [args.locale=Locale.EN] - The locale of the content to retrieve.
 * @param {Object} [args.filters] - Filters for the query, including field and value.
 * @param {string} args.filters.field - The field to filter by.
 * @param {Role} args.filters.value - The role value to filter.
 * @returns {Promise<ParishPriestsAndDeacons[]>} A promise that resolves to an array of ParishPriestsAndDeacons objects.
 */

async function listParishPriestsAndDeacons(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  locale?: Locale;
  filters: { field: string; value: Role };
}): Promise<ParishPriestsAndDeacons[]> {
  const batchSize = 100;
  let page = 1;
  let priests: ParishPriestsAndDeacons[] = [];
  let hasMore = true;

  const {
    pageSize = 25,
    sortBy = "sNo:asc",
    locale = Locale.EN,
    filters = {
      field: "role",
      value: Role.PARISH_PRIEST,
    },
  } = args ?? {};

  while (hasMore) {
    const queryParams = new URLSearchParams({
      "populate[0]": "image",
      "sort[0]": sortBy,
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
      locale,
    });

    queryParams.append(`filters[${filters.field}][$eq]`, filters.value);

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
