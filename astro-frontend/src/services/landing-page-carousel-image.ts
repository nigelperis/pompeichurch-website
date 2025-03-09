import { strapiFetch } from '~/helpers/strapi-fetch';
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

interface ImageAttributes {
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		large: ImageFormat;
		small: ImageFormat;
		medium: ImageFormat;
		thumbnail: ImageFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: any | null;
	createdAt: string;
	updatedAt: string;
}

interface ImageData {
	id: number;
	attributes: ImageAttributes;
}

interface CarouselImage {
	data: ImageData[];
}

interface Attributes {
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	carouselImage: CarouselImage;
}

interface Data {
	id: number;
	attributes: Attributes;
}

interface ApiResponse {
	data: Data;
	meta: Record<string, any>;
}

async function fetchLandingPageCarouselImages() {
	const data = await strapiFetch<ApiResponse['data']>({
		endpoint: '/landing-page-carousel',
		query: {
			populate: 'carouselImage',
		},
		wrappedByKey: 'data',
	});
	return data;
}

export { fetchLandingPageCarouselImages };
