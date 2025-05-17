import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import {
  type ParishPriestMessage,
  type ParishPriestMessageData,
} from "~/models/parish-priest-message";

/**
 * Fetches the parish priest's message from the Strapi CMS.
 *
 * @param {Locale} [locale=Locale.EN] - The locale/language to fetch the message in (default: English).
 * @returns {Promise<ParishPriestMessage | null>} A promise resolving to the parish priest's message or `null` if not found.
 */
async function fetchParishPriestMessage(
  locale: Locale = Locale.EN,
): Promise<ParishPriestMessage | null> {
  const queryParams = new URLSearchParams({
    "populate[0]": "parishPriestImage",
    locale: locale,
  });

  const data = await strapiFetch<ParishPriestMessageData>({
    endpoint: ROUTES.PARISH_PRIEST_MESSAGE,
    queryParams,
  });

  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { fetchParishPriestMessage };
