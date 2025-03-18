interface ObituaryImage {
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

export interface Obituary {
	id: number;
	documentId: string;
	konkaniName: string;
	englishName: string;
	slug: string;
	description: string;
	age: number;
	ward: string;
	dateOfDeath: Date;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	image: ObituaryImage;
}

interface ObituaryData {
	data: Obituary[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export type { ObituaryData };
