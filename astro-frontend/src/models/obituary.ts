export type StrapiImage = {
  url: string;
  width?: number;
  height?: number;
  formats?: any;
} | null;

export interface Obituary {
  id: number;
  lang?: string;
  documentId: string;
  konkaniName: string;
  englishName: string;
  slug: string;
  age: number;
  relationType?: string;
  relationNameEn?: string;
  relationNameKok?: string;
  ward: string;
  dateOfDeath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: StrapiImage;
  funeralDetails?: string;
  youtubeLink?: string;
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
