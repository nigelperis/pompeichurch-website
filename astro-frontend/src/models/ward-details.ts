import type { Locale } from "~/enums/locale";

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

interface WardLeaderImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    thumbnail?: MediaFormat;
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

export interface WardDetails {
  id: number;
  documentId: string;
  wardName: string;
  wardLeader: string;
  wardRepresentative1: string;
  wardRepresentative2: string;
  wardLeaderSex: string;
  familyCount: number;
  updatedAt: string;
  publishedAt: string;
  locale: Locale;
  wardLeaderImage: WardLeaderImage;
}

interface WardDetailsData {
  data: WardDetails[];
  meta: Record<string, unknown>;
}
export interface MergedWardDetails extends WardDetails {
  sNo: number;
  patronName: string;
  patronImage: ImageMetadata;
}

export type { WardDetailsData };
