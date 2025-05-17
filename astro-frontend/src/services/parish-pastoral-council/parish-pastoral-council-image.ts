import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPastoralCouncilImage,
  ParishPastoralCouncilImageData,
} from "~/models/parish-pastoral-council";

/**
 * Fetches the Parish Pastoral Council image from Strapi.
 *
 * @returns {Promise<ParishPastoralCouncilImage | null>} A promise that resolves to a ParishPastoralCouncilImage object or `null` if not found.
 */
async function getPastoralCouncilImage(): Promise<ParishPastoralCouncilImage | null> {
  const queryParams = new URLSearchParams({
    "populate[0]": "pastoralCouncilImage",
  });

  const data = await strapiFetch<ParishPastoralCouncilImageData>({
    endpoint: ROUTES.PARISH_PASTORAL_COUNCIL_IMAGE,
    queryParams,
  });

  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { getPastoralCouncilImage };
