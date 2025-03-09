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

interface Media {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		large?: ImageFormat;
		small?: ImageFormat;
		medium?: ImageFormat;
		thumbnail?: ImageFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: unknown | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface UpcomingEvent {
	id: number;
	documentId: string;
	eventEndDate?: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	eventImage?: Media;
}

interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

interface Meta {
	pagination: Pagination;
}

interface UpcomingEventsData {
	data: UpcomingEvent[];
	meta: Meta;
}

export type { UpcomingEventsData };
