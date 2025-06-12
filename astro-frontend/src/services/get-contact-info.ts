import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { ContactDetails, ContactInfo } from "~/models/contact-info";

/**
 * Fetches the contact details.
 *
 * @param {Locale} [locale=Locale.EN] - The locale/language to fetch the message in (default: English).
 * @returns {Promise<ParishPriestMessage | null>}
 */
async function fetchContactInfo(
  locale: Locale = Locale.EN,
): Promise<ContactInfo | null> {
  const queryParams = new URLSearchParams({
    locale: locale,
  });

  const data = await strapiFetch<ContactDetails>({
    endpoint: ROUTES.CONTACT,
    queryParams,
  });

  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { fetchContactInfo };
