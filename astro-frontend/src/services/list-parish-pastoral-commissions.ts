import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPastoralCommission,
  ParishPastoralCommissionData,
} from "~/models/parish-pastoral-commission";

/**
 * Fetches a list of all Parish Pastoral Commissions from Strapi.
 * @param {Object} [args] - Optional parameters for fetching the list of commissions.
 * @param {Locale} [args.locale=Locale.EN] - The locale of the content to retrieve.
 * @returns {Promise<ParishPastoralCommission[]>} A promise that resolves to an array of ParishPastoralCommission objects.
 */
async function listPastoralCommissionsData(args?: {
  locale?: Locale;
}): Promise<ParishPastoralCommission[]> {
  const { locale = Locale.EN } = args ?? {};

  const queryParams = new URLSearchParams({
    "populate[0]": "coordinatorName",
    "populate[1]": "coordinatorName.image",
    "populate[2]": "commissions.subCommissions",
    "populate[3]": "commissions.imageOfConvenor",
    locale: locale,
  });

  const data = await strapiFetch<ParishPastoralCommissionData>({
    endpoint: ROUTES.PARISH_PASTORAL_COMMISSION,
    queryParams,
  });

  return data?.data ?? [];
}

export { listPastoralCommissionsData };
