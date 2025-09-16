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

interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: Record<string, MediaFormat> | null;
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

interface GalleryImage {
  id: number;
  documentId: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: Media[] | Media | null;
}

interface GalleryMediaItem {
  parentId: number;
  parentDocumentId: string;
  parentTitle: string | null;
  mediaId: number;
  url: string;
  width: number | null | undefined;
  height: number | null | undefined;
  alternativeText: string | null;
  name: string;
}

interface GalleryImageResponse {
  data: GalleryImage[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type { MediaFormat, Media, GalleryImage, GalleryImageResponse, GalleryMediaItem };