import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  Association,
  AssociationSingleResponse,
} from "~/models/association";
import { Locale } from "~/enums/locale";

async function getAssociation(args: {
  slug: string;
  locale?: Locale;
}): Promise<Association | null> {
  const { slug, locale } = args;
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    ...(locale ? { locale } : {}),
  } as any);

  // populate selected fields
  params.append("populate[0]", "groupImage");
  params.append("populate[1]", "logo");
  params.append("populate[2]", "socialLinks");
  params.append("populate[3]", "officeBearers");

  const res = await strapiFetch<AssociationSingleResponse>({
    endpoint: ROUTES.ASSOCIATIONS,
    queryParams: params,
  });

  const item = res?.data?.[0] ?? null;
  return item ?? null;
}

export { getAssociation };
