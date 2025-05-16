import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPastoral21Commission,
  ParishPastoral21CommissionData,
} from "~/models/parish-pastoral-21-commission";

/**
 * Fetches a list of all Parish Pastoral 21 Commissions from Strapi, optionally filtered by locale.
 * @param {Object} [args] - Optional parameters for fetching the list of commissions.
 * @param {Locale} [args.locale=Locale.EN] - The locale of the content to retrieve.
 * @returns {Promise<ParishPastoral21Commission[]>} A promise that resolves to an array of ParishPastoral21Commission objects.
 */

async function listPastoral21CommissionsData(
  args?: { locale?: Locale; }): Promise<ParishPastoral21Commission[]> {
  const { locale = Locale.EN } = args ?? {};

  const queryParams = new URLSearchParams({
    "populate[0]": "coordinatorName",
    "populate[1]": "commissions.subCommissions",
    "locale": locale,
  });

  const data = await strapiFetch<ParishPastoral21CommissionData>({
    endpoint: ROUTES.PARISH_PASTORAL_21_COMMISSION,
    queryParams,
  });

  return data?.data ?? [];
}

export { listPastoral21CommissionsData };