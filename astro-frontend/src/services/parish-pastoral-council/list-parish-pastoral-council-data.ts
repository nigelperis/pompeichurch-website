import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPastoralCouncil,
  ParishPastoralCouncilData,
} from "~/models/parish-pastoral-council";

async function listPastoralCouncilData(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  locale?: string;
}): Promise<ParishPastoralCouncil[]> {
  const { page = 1, pageSize = 25, sortBy = "sNo:asc", locale = "en" } = args ?? {};
  const endpoint = "/parish-pastoral-councils";

  const queryParams = new URLSearchParams({
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
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