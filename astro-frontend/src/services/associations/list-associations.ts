import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { Association, AssociationListResponse } from "~/models/association";
import { Locale } from "~/enums/locale";

async function listAssociations(args?: { locale?: Locale }): Promise<
  Pick<Association, "slug" | "name">[]
> {
  const { locale } = args || {};
  const params = new URLSearchParams({
    "fields[0]": "slug",
    "fields[1]": "name",
    "pagination[page]": "1",
    "pagination[pageSize]": "100",
    "sort[0]": "name:asc",
  });
  if (locale) params.append("locale", locale);

  const res = await strapiFetch<AssociationListResponse>({
    endpoint: ROUTES.ASSOCIATIONS,
    queryParams: params,
  });

  return (res?.data ?? []).map((a) => ({ slug: a.slug, name: a.name }));
}

export { listAssociations };
