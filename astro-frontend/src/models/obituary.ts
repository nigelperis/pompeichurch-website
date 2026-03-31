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
  konkaniName: string | null;
  englishName: string | null;
  slug: string;
  age: number | null;
  relationType: RelationType | null;
  relationNameEn: string | null;
  relationNameKok: string | null;
  youtubeLink: string | null;
  ward: string | null;
  dateOfDeath: string | null;
  funeralDetailsUpdatedOn: Date | null;
  homeTime: string | null;
  massTime: string | null;
  funeralDate: string | null;
  startsFromChurch?: boolean;
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
