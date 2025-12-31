import type { RelationType } from "~/enums/obituary";

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
  age: number;
  relationType?: RelationType;
  relationNameEn?: string;
  relationNameKok?: string;
  youtubeLink?: string;
  ward: string;
  dateOfDeath: string;
  funeralDetailsUpdatedOn?: Date;
  homeTime: string;
  massTime: string;
  funeralDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ObituaryImage;
}

interface ObituaryPagination {
  obituaries: Obituary[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
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

export type { ObituaryData, ObituaryPagination };
