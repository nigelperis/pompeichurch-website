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
  const endpoint = "/parish-pastoral-councils";

  const queryParams = new URLSearchParams({
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    'sort[0]': sortBy,
    'locale': locale,
  });

  const data = await strapiFetch<ParishPastoralCouncilData>({
    endpoint,
    queryParams,
  });

  return data?.data ?? [];
}

async function getPastoralCouncilImage(): Promise<ParishPastoralCouncilImage | null> {
	const endpoint = '/parish-pastoral-council-image';

	const queryParams = new URLSearchParams({
		'populate[0]': 'pastoralCouncilImage',
	});

	const data = await strapiFetch<ParishPastoralCouncilImageData>({
		endpoint,
		queryParams,
	});


  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { listPastoralCouncilData, getPastoralCouncilImage};