import { ROUTES } from "~/constants/strapi-endpoints";
import { Locale } from "~/enums/locale";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPastoralCouncil,
  ParishPastoralCouncilData,
  ParishPastoralCouncilImage,
  ParishPastoralCouncilImageData,
} from "~/models/parish-pastoral-council";

async function listPastoralCouncilData(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  locale?: Locale;
}): Promise<ParishPastoralCouncil[]> {
  const { page = 1, pageSize = 25, sortBy = "sNo:asc", locale = Locale.EN } = args ?? {};

  const queryParams = new URLSearchParams({
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    'sort[0]': sortBy,
    'locale': locale,
  });

  const data = await strapiFetch<ParishPastoralCouncilData>({
    endpoint: ROUTES.PARISH_PASTORAL_COUNCIL,
    queryParams,
  });

  return data?.data ?? [];
}

async function getPastoralCouncilImage(): Promise<ParishPastoralCouncilImage | null> {
	const queryParams = new URLSearchParams({
		'populate[0]': 'pastoralCouncilImage',
	});

	const data = await strapiFetch<ParishPastoralCouncilImageData>({
		endpoint: ROUTES.PARISH_PASTORAL_COUNCIL_IMAGE,
		queryParams,
	});


  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { listPastoralCouncilData, getPastoralCouncilImage};