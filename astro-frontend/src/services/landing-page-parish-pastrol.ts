import { strapiFetch } from '~/helpers/strapi-fetch';
import { defaultLang } from '~/i18n/ui';
// Defining the image formats object, which contains variations of the image
interface ImageFormat {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string | null;
	size: number; // Size in KB
	width: number;
	height: number;
	sizeInBytes: number;
}

// Defining the attributes for each image
interface ImageAttributes {
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		large?: ImageFormat;
		medium?: ImageFormat;
		small?: ImageFormat;
		thumbnail?: ImageFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number; // Size in KB
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: string | null;
	createdAt: string; // Date-time string
	updatedAt: string; // Date-time string
}

// Defining the image data structure
interface ImageData {
	id: number;
	attributes: ImageAttributes;
}

// Defining the attributes for each individual in the data array
interface PersonAttributes {
	name: string;
	designation: string;
	showInLandingPage: boolean;
	createdAt: string; // Date-time string
	updatedAt: string; // Date-time string
	publishedAt: string; // Date-time string
	locale: string;
	image: {
		data: ImageData;
	};
}

// Defining the individual person object
interface PersonData {
	id: number;
	attributes: PersonAttributes;
}

// Defining the pagination metadata
interface PaginationMeta {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

// Defining the meta object that contains pagination information
interface Meta {
	pagination: PaginationMeta;
}

// Defining the full response schema
interface StrapiResponse {
	data: PersonData[];
	meta: Meta;
}

async function fetchLandingPagePastoralParishad(locale?: string) {
	const data = await strapiFetch<StrapiResponse['data']>({
		endpoint: '/parish-pastoral-parishads',
		query: {
			'populate[0]': 'image',
			'filters[showInLandingPage][$eq]': 'true',
			locale: locale ?? defaultLang,
		},
		wrappedByKey: 'data',
	});
	return data;
}

export { fetchLandingPagePastoralParishad };
