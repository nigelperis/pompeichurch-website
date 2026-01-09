import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { PrayerForTheYear, PrayerForTheYearData } from "~/models/prayer-for-the-year";


async function getPrayerForTheYear(): Promise<PrayerForTheYear | null> {
  const queryParams = new URLSearchParams({
    "populate[0]": "kokLogo",
    "populate[1]": "enLogo",
    "populate[2]": "additionalMedia",
});

  const data = await strapiFetch<PrayerForTheYearData>({
    endpoint: ROUTES.PRAYER_FOR_THE_YEAR,
    queryParams,
  });

  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { getPrayerForTheYear };
