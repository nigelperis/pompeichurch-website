interface MediaFormat {
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

interface CoverImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: MediaFormat;
    small: MediaFormat;
    medium: MediaFormat;
    thumbnail: MediaFormat;
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

export interface PompeichemFalkem {
  id: number;
  documentId: string;
  googleDriveLink: string;
  dateOfPublish: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImage: CoverImage;
  title: string;
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

interface PompeichemFalkemData {
  data: PompeichemFalkem[];
  meta: Meta;
}

export type { PompeichemFalkemData };