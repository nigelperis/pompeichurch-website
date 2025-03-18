import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishPastoralCouncilImage,
  ParishPastoralCouncilImageData,
} from "~/models/parish-pastoral-council-image";


async function getPastoralCouncilImage(): Promise<ParishPastoralCouncilImage | undefined> {
	const endpoint = '/parish-pastoral-council-image';

	const queryParams = new URLSearchParams({
		'populate[0]': 'pastoralCouncilImage',
	});

	const data = await strapiFetch<ParishPastoralCouncilImageData>({
		endpoint,
		queryParams,
	});

	return data?.data;
}

export { getPastoralCouncilImage };
