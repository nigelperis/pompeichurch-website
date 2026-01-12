import type { BlocksContent } from "@strapi/blocks-react-renderer";

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
  width: number | null;
  height: number | null;
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
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface PrayerForTheYear {
  id: number;
  documentId: string;
  kokTitle: string;
  enTitle: string;
  kokLogo?: Media;
  enLogo?: Media;
  kokPrayer?: BlocksContent;
  enPrayer?: BlocksContent;
  additionalMedia?: Media[];
  youtubeLink?: string;
  moreInfoLink?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface PrayerForTheYearData {
  data: PrayerForTheYear;
  meta: Record<string, any>;
}

export type { PrayerForTheYear, PrayerForTheYearData };
