import type { BlocksContent } from '@strapi/blocks-react-renderer';

interface EventImage {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		thumbnail: ImageFormat;
		small: ImageFormat;
		medium: ImageFormat;
		large: ImageFormat;
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
	publishedAt: string;
}

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

export interface Event {
	id: number;
	documentId: string;
	konkaniTitle: string;
	englishTitle: string;
	eventDate: string;
	shortDescription: string;
	description: BlocksContent;
	facebookLink: string;
	instagramLink: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	eventImage: EventImage;
}

interface EventData {
	data: Event[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export type { EventData };
