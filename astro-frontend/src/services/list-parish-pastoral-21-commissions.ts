import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPastoral21Commission,
  ParishPastoral21CommissionData,
} from "~/models/parish-pastoral-21-commission";

/**
 * Fetches a paginated list of 21 commissions from Strapi.
 *
 * @param {Object} [args] - Optional parameters for fetching the list of 21 commissions.
 * @param {number} [args.page=1] - The page number to retrieve.
 * @param {number} [args.pageSize=25] - The number of 21 commissions per page.
 * @param {Locale} [args.locale=Locale.EN] - The locale of the content to retrieve.
 * @param {Locale} [KOK] - The locale to retrieve the KOK version of the content.
 * @returns {Promise<ParishPastoral21Commission[]>} A promise that resolves to an array of ParishPastoral21Commission objects.
 */

async function listPastoral21CommissionsData(
  args?: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    locale?: Locale;
  }): Promise<ParishPastoral21Commission[]> {
  const { page = 1, pageSize = 25, sortBy="sNo:asc", locale = Locale.EN } = args ?? {};

  const queryParams = new URLSearchParams({
    "populate[0]": "subCommissions",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    "sort[0]": sortBy,
    "locale": locale,
  });

  const data = await strapiFetch<ParishPastoral21CommissionData>({
    endpoint: ROUTES.PARISH_PASTORAL_21_COMMISSION,
    queryParams,
  });

  return data?.data ?? [];
}

export { listPastoral21CommissionsData };