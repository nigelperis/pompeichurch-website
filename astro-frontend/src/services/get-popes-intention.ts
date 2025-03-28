import { POPES_INTENTION } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { PopesIntention, PopesIntentionsResponse } from "~/models/popes-intention";

async function fetchPopesIntention(locale: Locale = Locale.EN): Promise<PopesIntention | null> {
  const queryParams = new URLSearchParams({
    'locale': locale
  });

  const data = await strapiFetch<PopesIntentionsResponse>({ endpoint: POPES_INTENTION, queryParams });

  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { fetchPopesIntention };