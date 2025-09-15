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

interface MediaImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
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

interface GalleryEventRef {
  id: number;
  documentId: string;
  slug: string;
  englishTitle?: string;
  konkaniTitle?: string;
  eventDate?: string;
}

interface GalleryAlbum {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  type: 'general' | 'event';
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images: MediaImage[];
  event?: GalleryEventRef | null;
}

interface GalleryAlbumsData {
  data: GalleryAlbum[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface GalleryAlbumsPagination {
  albums: GalleryAlbum[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export type { MediaImage, ImageFormat, GalleryAlbum, GalleryAlbumsData, GalleryEventRef, GalleryAlbumsPagination };
