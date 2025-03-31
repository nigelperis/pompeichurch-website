import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { AssociationOfficeBearers, AssociationOfficeBearersData } from "~/models/association-bearers";

/**
 * Fetches the association office bearers' details from Strapi.
 *
 * @param {Locale} [locale=Locale.EN] - The locale in which to fetch the office bearers' data (default is English).
 * @returns {Promise<AssociationOfficeBearers | null>} A promise that resolves to the office bearers' data or `null` if not found.
 */
async function fetchAssociationBearers(locale: Locale = Locale.EN): Promise<AssociationOfficeBearers | null> {
  const queryParams = new URLSearchParams({
    'populate[0]': 'svpGroupPicture',
    'populate[1]': 'pycGroupPicture',
    'populate[2]': 'altarServersGroupPicture',
    'populate[3]': 'catholicSabhaGroupPicture',
    'populate[4]': 'ycsGroupPicture',
    'populate[5]': 'secularFransiscanGroupPicture',
    'populate[6]': 'catechismGroupPicture',
    'populate[7]': 'smallChristianCommunityGroupPicture',
    'populate[8]': 'choirGroupPicture',
    'populate[9]': 'womensForumGroupPicture',
    'populate[10]': 'clcGroupPicture',
    'locale': locale
  });

  const data = await strapiFetch<AssociationOfficeBearersData>({ endpoint: ROUTES.ASSCIATION_OFFICE_BEARERS, queryParams });

  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { fetchAssociationBearers }