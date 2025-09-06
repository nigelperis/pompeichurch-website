import type { BlocksContent } from "@strapi/blocks-react-renderer";

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

export interface Media {
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

interface ParishionersAchievement {
  id: number;
  documentId: string;
  englishName: string;
  konkaniName: string;
  enAchievement: string;
  kokAchievement: string;
  enDescription: BlocksContent;
  kokDescription: BlocksContent;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  achieverImage: Media | null;
}

interface ParishionersAchievementsData {
  data: ParishionersAchievement[];
  meta: {
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      pageCount: number;
    };
  };
}

interface ParishionersAchievementsPagination {
  parishionersAchievements: ParishionersAchievement[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export type {
  ParishionersAchievement,
  ParishionersAchievementsData,
  ParishionersAchievementsPagination,
};
