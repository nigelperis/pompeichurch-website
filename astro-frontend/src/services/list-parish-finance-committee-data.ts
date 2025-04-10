import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishFinanceCommittee,
  ParishFinanceCommitteeData,
} from "~/models/parish-finance-committee";

async function listParishFinanceCommitteeData(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  locale?: Locale;
}): Promise<ParishFinanceCommittee[]> {

  const { page = 1, pageSize = 25, sortBy = "sNo:asc", locale = Locale.EN } = args ?? {};

  const queryParams = new URLSearchParams({
    'populate[0]': 'image',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    'sort[0]': sortBy,
    'locale': locale,
  });

  const data = await strapiFetch<ParishFinanceCommitteeData>({
    endpoint: ROUTES.PARISH_FINANCE_COMMITTEE,
    queryParams,
  });

  return data?.data ?? [];
}

export { listParishFinanceCommitteeData };