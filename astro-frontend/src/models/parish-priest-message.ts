import type { BlocksContent } from "@strapi/blocks-react-renderer";
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

interface ParishPriestImage {
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

export interface ParishPriestMessage {
  id: number;
  documentId: string;
  parishPriestName: string;
  message: BlocksContent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: Locale;
  parishPriestImage: ParishPriestImage;
}

interface ParishPriestMessageData {
  data: ParishPriestMessage;
  meta: Record<string, unknown>;
}

export type { ParishPriestMessageData }