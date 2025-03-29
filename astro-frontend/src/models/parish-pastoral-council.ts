export interface ParishPastoralCouncil {
  id: number;
  documentId: string;
  sNo: number;
  name: string;
  association: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
}

interface ParishPastoralCouncilData {
  data: ParishPastoralCouncil[];
  meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
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

interface Media {
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
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ParishPastoralCouncilImage {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pastoralCouncilImage: Media;
}

interface ParishPastoralCouncilImageData {
  data: ParishPastoralCouncilImage;
  meta: Record<string, unknown>;
}

export type { ParishPastoralCouncilData, ParishPastoralCouncilImage, ParishPastoralCouncilImageData };
