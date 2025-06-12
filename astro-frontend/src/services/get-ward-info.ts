import { ROUTES } from "~/constants/strapi-endpoints";
import { wards } from "~/constants/wards";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { WardDetailsData, MergedWardDetails } from "~/models/ward-details";

async function fetchWardDetails(
  locale: Locale = Locale.EN,
): Promise<MergedWardDetails[] | null> {
  const queryParams = new URLSearchParams({
    "populate[0]": "wardLeaderImage",
    locale: locale,
  });

  const data = await strapiFetch<WardDetailsData>({
    endpoint: ROUTES.WARDS,
    queryParams,
  });

  if (!data?.data) {
    return null;
  }

  const merged: MergedWardDetails[] = data.data.map((ward) => {
    const staticData = wards.find((w) => w.wardName === ward.wardName);
    if (!staticData) {
      throw new Error(`No static data for ward: ${ward.wardName}`);
    }

    return {
      ...ward,
      patronName: staticData.patronName,
      patronImage: staticData.patronImage,
      sNo: staticData.sNo,
    };
  });

  merged.sort((a, b) => a.sNo - b.sNo);

  return merged;
}

export { fetchWardDetails };
