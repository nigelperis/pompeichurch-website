import { Locale } from '~/enums/locale';
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

interface Image {
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
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ParishPriests {
  id: number;
  documentId: string;
  name: string;
  sNo: number;
  servicePeriod: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: Locale;
  image?: Image;
}

interface ParishPriestsData {
  data: ParishPriests[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type { ParishPriests, ParishPriestsData };