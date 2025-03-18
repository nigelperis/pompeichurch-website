import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPastoralCouncil,
  ParishPastoralCouncilData,
} from "~/models/parish-pastoral-council";

async function listPastoralCouncilData(args?: {
  sortBy?: string;
  locale?: string;
}): Promise<ParishPastoralCouncil[]> {
  const { sortBy = "sNo:asc", locale = "en" } = args ?? {};
  const endpoint = "/parish-pastoral-councils";

  const queryParams = new URLSearchParams({
    "sort[0]": sortBy,
    locale: locale,
  });

  const data = await strapiFetch<ParishPastoralCouncilData>({
    endpoint,
    queryParams,
  });

  return data?.data ?? [];
}

export { listPastoralCouncilData };