import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  PopesIntention,
  PopesIntentionsResponse,
} from "~/models/popes-intention";

/**
 * Fetches the Pope's monthly intention from Strapi.
 *
 * @param {Locale} [locale=Locale.EN] - The locale in which to fetch the Pope's intention (default is English).
 * @returns {Promise<PopesIntention | null>} A promise that resolves to the Pope's intention or `null` if not found.
 */
async function fetchPopesIntention(
  locale: Locale = Locale.EN,
): Promise<PopesIntention | null> {
  const queryParams = new URLSearchParams({
    locale: locale,
  });

  const data = await strapiFetch<PopesIntentionsResponse>({
    endpoint: ROUTES.POPES_INTENTION,
    queryParams,
  });

  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { fetchPopesIntention };
