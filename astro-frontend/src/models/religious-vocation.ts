import { ReligiousVocationRole } from "~/enums/religious-vocation-role";

interface ReligiousVocationImageFormat {
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

interface ReligiousVocationImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ReligiousVocationImageFormat;
    small: ReligiousVocationImageFormat;
    medium: ReligiousVocationImageFormat;
    large: ReligiousVocationImageFormat;
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

export interface ReligiousVocation {
  id: number;
  documentId: string;
  englishName: string;
  konkaniName: string;
  role: ReligiousVocationRole;
  ward: string;
  englishCongregationName?: string | null;
  konkaniCongregationName?: string | null;
  englishParentsName?: string | null;
  konkaniParentsName?: string | null;
  dateOfBirth?: string | null;
  dateOfDeath?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ReligiousVocationImage | null;
}

interface ReligiousVocationData {
  data: ReligiousVocation[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type { ReligiousVocationData };
