import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import { parseDateOnly } from "~/helpers/get-funeral-details";
import type {
  ReligiousVocationData,
  ReligiousVocation,
  ReligiousVocationItem,
} from "~/models/religious-vocation";
import { Locale } from "~/enums/locale";
import { ReligiousVocationRole } from "~/enums/religious-vocation-role";
import { ui } from "~/i18n/ui";

function toWardI18nKey(ward: string): string {
  return `ward.${ward.toLowerCase().replace(/ /g, "-")}-ward`;
}

function getWardLabel(ward: string | undefined, locale: Locale): string {
  if (!ward) return "";
  if (locale === Locale.EN) return ward;
  const key = toWardI18nKey(ward);
  const value = (ui[locale] as Record<string, unknown>)[key];
  return typeof value === "string" ? value : ward;
}

function formatDate(
  isoDate: string | null | undefined,
): string | undefined {
  const dateObj = parseDateOnly(isoDate);
  if (!dateObj) return undefined;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(dateObj)
    .replace(/\//g, "-");
}

function pickLocaleValue(
  locale: Locale,
  enValue: string | null | undefined,
  kokValue: string | null | undefined,
): string {
  if (locale === Locale.KOK) return kokValue ?? enValue ?? "";
  return enValue ?? "";
}

/**
 * Fetches religious vocations from the Strapi backend and transforms them for display.
 *
 * @param {Locale} locale - The locale to use for fetching localized content (Locale.EN or Locale.KOK)
 * @param {ReligiousVocationRole} [role] - Optional role filter to fetch only priests or nuns
 * @returns {Promise<ReligiousVocationItem[]>} A promise that resolves to an array of religious vocation items
 *
 * @example
 * const priests = await getReligiousVocations(Locale.EN, ReligiousVocationRole.PRIEST);
 * const nuns = await getReligiousVocations(Locale.EN, ReligiousVocationRole.NUN);
 */
export async function getReligiousVocations(
  locale: Locale,
  role?: ReligiousVocationRole,
): Promise<ReligiousVocationItem[]> {
  const allVocations: ReligiousVocation[] = [];
  let currentPage = 1;
  let totalPages = 1;

  do {
    const queryParams = new URLSearchParams();
    queryParams.append("populate[0]", "image");
    queryParams.append("pagination[page]", String(currentPage));
    queryParams.append("pagination[pageSize]", "100");
    queryParams.append("sort[0]", "englishName:asc");

    if (role) {
      queryParams.append("filters[role][$eq]", role);
    }

    const response = await strapiFetch<ReligiousVocationData>({
      endpoint: ROUTES.RELIGIOUS_VOCATIONS,
      queryParams,
    });

    if (response?.data) {
      allVocations.push(...response.data);
      totalPages = response.meta?.pagination?.pageCount ?? 1;
    }

    currentPage++;
  } while (currentPage <= totalPages);

  return allVocations.map((item: ReligiousVocation) => {
    const name = pickLocaleValue(locale, item.englishName, item.konkaniName);
    const congregation =
      pickLocaleValue(
        locale,
        item.englishCongregationName,
        item.konkaniCongregationName,
      ) || undefined;
    const parents =
      pickLocaleValue(
        locale,
        item.englishParentsName,
        item.konkaniParentsName,
      ) || undefined;

    return {
      name,
      role: item.role,
      ward: getWardLabel(item.ward, locale),
      congregation,
      parents,
      dob: formatDate(item.dateOfBirth),
      dod: formatDate(item.dateOfDeath),
      imageUrl: item.image?.url,
      imageWidth: item.image?.width,
      imageHeight: item.image?.height,
    };
  });
}
