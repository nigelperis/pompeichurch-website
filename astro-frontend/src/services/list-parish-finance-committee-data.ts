import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishFinanceCommittee,
  ParishFinanceCommitteeData,
} from "~/models/parish-finance-committee";

/**
 * Fetches a paginated list of members of the Parish Finance Committee from Strapi.
 * @param {Object} [args] - Optional parameters for fetching the list of members.
 * @param {number} [args.page=1] - The page number to retrieve.
 * @param {number} [args.pageSize=25] - The number of members per page.
 * @param {string} [args.sortBy='sNo:asc'] - The sorting order of the members.
 * @param {Locale} [args.locale=Locale.EN] - The locale of the content to retrieve.
 * @returns {Promise<ParishFinanceCommittee[]>} A promise that resolves to an array of ParishFinanceCommittee objects.
 */

async function listParishFinanceCommitteeData(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  locale?: Locale;
}): Promise<ParishFinanceCommittee[]> {
  const {
    page = 1,
    pageSize = 25,
    sortBy = "sNo:asc",
    locale = Locale.EN,
  } = args ?? {};

  const queryParams = new URLSearchParams({
    "populate[0]": "image",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    "sort[0]": sortBy,
    locale: locale,
  });

  const data = await strapiFetch<ParishFinanceCommitteeData>({
    endpoint: ROUTES.PARISH_FINANCE_COMMITTEE,
    queryParams,
  });

  return data?.data ?? [];
}

export { listParishFinanceCommitteeData };
