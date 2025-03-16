import { strapiFetch } from "~/helpers/strapi-fetch";
import { Locale, type ParishPriestMessage, type ParishPriestMessageData } from "~/models/parish-priest-message";

async function fetchParishPriestMessage(locale: Locale = Locale.EN): Promise<ParishPriestMessage | null> {
  const endpoint = '/parish-priest-message';

  const queryParams = new URLSearchParams({
    'populate[0]': 'parishPriestImage',
    'locale': locale
  });

  const data = await strapiFetch<ParishPriestMessageData>({ endpoint, queryParams });


  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { fetchParishPriestMessage };