import { strapiFetch } from '~/helpers/strapi-fetch';
import { defaultLang } from '~/i18n/ui';

// Basic Types
interface ImageFormat {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string | null;
	size: number;
	width: number;
	height: number;
	sizeInBytes: number;
}

interface ImageFormats {
	large?: ImageFormat;
	small?: ImageFormat;
	medium?: ImageFormat;
	thumbnail: ImageFormat;
}

interface ImageAttributes {
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: ImageFormats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: string | null;
}

// Larger Units
interface Signature {
	data: SignatureData;
}

interface SignatureData {
	id: number;
	attributes: ImageAttributes;
}

interface CoverImage {
	data: CoverImageData;
}

interface CoverImageData {
	id: number;
	attributes: ImageAttributes;
}

// ParishPriest Structure
interface ParishPriest {
	data: ParishPriestData;
}

interface ParishPriestData {
	id: number;
	attributes: PriestAttributes;
}

interface PriestAttributes {
	name: string;
	servicePeriodStart: string;
	servicePeriodEnd: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
}

//  Main Attributes
interface Attributes {
	message: any; // message field remains untyped
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	signature: Signature;
	coverImage: CoverImage;
	parish_priest: ParishPriest;
}

// Data and Meta
interface Data {
	id: number;
	attributes: Attributes;
}

interface Meta {
	[key: string]: any;
}

//  Root Schema
interface Schema {
	data: Data;
	meta: Meta;
}

async function fetchLandingPagePreistMessage(locale?: string) {
	const data = await strapiFetch<Schema['data']>({
		endpoint: '/landing-page-priest-message',
		query: {
			'populate[0]': 'signature',
			'populate[1]': 'coverImage',
			'populate[2]': 'parish_priest',
			locale: locale ?? defaultLang,
		},
		wrappedByKey: 'data',
	});
	return data;
}

export { fetchLandingPagePreistMessage };
