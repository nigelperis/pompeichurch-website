import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import { ui } from "~/i18n/ui";
import type {
  ReligiousVocationData,
  ReligiousVocation,
} from "~/models/religious-vocation";
import { ReligiousVocationRole } from "~/enums/religious-vocation-role";

export interface ReligiousVocationItem {
  name: string;
  role: ReligiousVocationRole;
  ward?: string;
  congregation?: string;
  parents?: string;
  dob?: string;
  dod?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
}

type Locale = "en" | "kok";

const WARD_I18N_KEY: Record<string, string> = {
  Addoor: "ward.addoor-ward",
  Church: "ward.church-ward",
  Gurpur: "ward.gurpur-ward",
  Monel: "ward.monel-ward",
  "Pompei A": "ward.pompei-a-ward",
  "Pompei B": "ward.pompei-b-ward",
  "Kandar A": "ward.kandar-a-ward",
  "Kandar B": "ward.kandar-b-ward",
  "Kowdoor A": "ward.kowdoor-a-ward",
  "Kowdoor B": "ward.kowdoor-b-ward",
};

function getWardLabel(ward: string | undefined, locale: Locale): string {
  if (!ward) return "";
  if (locale === "en") return ward;
  const key = WARD_I18N_KEY[ward];
  if (!key) return ward;
  const value = (ui[locale] as Record<string, unknown>)[key];
  return typeof value === "string" ? value : ward;
}

function normalizeImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${import.meta.env.PUBLIC_STRAPI_URL}${url}`;
}

function pickLocaleValue(
  locale: Locale,
  enValue: string | null | undefined,
  kokValue: string | null | undefined,
): string {
  if (locale === "kok") return kokValue ?? enValue ?? "";
  return enValue ?? "";
}

export async function getReligiousVocations(
  locale: Locale,
): Promise<ReligiousVocationItem[]> {
  const queryParams = new URLSearchParams();
  queryParams.append("populate[0]", "image");
  queryParams.append("pagination[pageSize]", "200");
  queryParams.append("sort[0]", "englishName:asc");

  const response = await strapiFetch<ReligiousVocationData>({
    endpoint: ROUTES.RELIGIOUS_VOCATIONS,
    queryParams,
  });

  const list = response?.data ?? [];

  return list.map((item: ReligiousVocation) => {
    const name = pickLocaleValue(locale, item.englishName, item.konkaniName);
    const congregation = pickLocaleValue(
      locale,
      item.englishCongregationName,
      item.konkaniCongregationName,
    );
    const parents =
      pickLocaleValue(
        locale,
        item.englishParentsName,
        item.konkaniParentsName,
      ) || undefined;

    const url = item.image?.url;
    const width = item.image?.width;
    const height = item.image?.height;

    return {
      name,
      role: item.role,
      ward: getWardLabel(item.ward, locale),
      congregation,
      parents,
      dob: item.dateOfBirth ?? undefined,
      dod: item.dateOfDeath ?? undefined,
      imageUrl: normalizeImageUrl(url),
      imageWidth: width,
      imageHeight: height,
    };
  });
}
