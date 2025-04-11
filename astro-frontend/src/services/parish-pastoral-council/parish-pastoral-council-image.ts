import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPastoralCouncilImage,
  ParishPastoralCouncilImageData,
} from "~/models/parish-pastoral-council";

/**
 * Fetches a paginated list of members of the Parish Pastoral Council from Strapi.
 * @param {Object} [args] - Optional parameters for fetching the list of members.
 * @param {number} [args.page=1] - The page number to retrieve.
 * @param {number} [args.pageSize=25] - The number of members per page.
 * @param {string} [args.sortBy='sNo:asc'] - The sorting order of the members.
 * @param {Locale} [args.locale=Locale.EN] - The locale of the content to retrieve.
 * @returns {Promise<ParishPastoralCouncil[]>} A promise that resolves to an array of ParishPastoralCouncil objects.
 */

async function getPastoralCouncilImage(): Promise<ParishPastoralCouncilImage | null> {
  const queryParams = new URLSearchParams({
    "populate[0]": "pastoralCouncilImage",
  });

  const data = await strapiFetch<ParishPastoralCouncilImageData>({
    endpoint: ROUTES.PARISH_PASTORAL_COUNCIL_IMAGE,
    queryParams,
  });

  return data?.data ?? [];

}

export { getPastoralCouncilImage };