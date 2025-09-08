import type { BlocksContent } from "@strapi/blocks-react-renderer";

export interface ImageFormat {
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

export interface MediaItem {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats?: {
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
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SocialLink {
  id?: number;
  platform: "facebook" | "instagram" | "whatsapp" | "website" | "other";
  label?: string;
  url: string;
}

export interface OfficeBearer {
  id?: number;
  roleTitle: string;
  personName: string;
  picture?: MediaItem | null;
  gender?: "male" | "female" | "mixed" | "other";
  order?: number | null;
}

export interface Association {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  summary?: string;
  about?: BlocksContent;
  groupImage?: MediaItem | null;
  logo?: MediaItem | null;
  socialLinks?: SocialLink[];
  officeBearers?: OfficeBearer[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AssociationListResponse {
  data: Association[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface AssociationSingleResponse {
  data: Association[];
  meta: Record<string, unknown>;
}

