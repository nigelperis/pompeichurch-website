import type { Locale } from "~/enums/locale";

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
  locale?: Locale;
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

export interface ParishPastoralCouncilImage {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pastoralCouncilImage: Media | null;
}

interface ParishPastoralCouncilImageData {
  data: ParishPastoralCouncilImage;
  meta: Record<string, unknown>;
}

export interface PastoralCoreCommittee {
  id: number;
  documentId: string;
  sNo: number;
  image: Media;
  name: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: Locale;
}

interface PastoralCoreCommitteeData {
  data: PastoralCoreCommittee[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type {
  ParishPastoralCouncilData,
  ParishPastoralCouncilImageData,
  PastoralCoreCommitteeData,
};
