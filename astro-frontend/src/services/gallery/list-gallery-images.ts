import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  GalleryImageResponse,
  GalleryMediaItem,
  Media,
} from "~/models/gallery-image";

const MAX_GALLERY_ITEMS = 30;

async function listGalleryImages(): Promise<GalleryMediaItem[]> {
  const queryParams = new URLSearchParams({
    "populate[0]": "image",
    "sort[0]": "createdAt:desc",
    "pagination[page]": "1",
    "pagination[pageSize]": "30",
  });

  const data = await strapiFetch<GalleryImageResponse>({
    endpoint: ROUTES.GALLERY_IMAGES,
    queryParams,
  });

  const galleryEntries = data?.data ?? [];
  const galleryItems: GalleryMediaItem[] = [];

  outer: for (const entry of galleryEntries) {
    const mediaItems = Array.isArray(entry.image)
      ? entry.image
      : entry.image
        ? [entry.image as Media]
        : [];

    if (mediaItems.length === 0) {
      continue;
    }

    for (const media of mediaItems) {
      if (!media?.url) {
        continue;
      }

      galleryItems.push({
        parentId: entry.id,
        parentDocumentId: entry.documentId,
        parentTitle: entry.title,
        mediaId: media.id,
        url: media.url,
        width: media.width,
        height: media.height,
        alternativeText: media.alternativeText,
        name: media.name,
      });

      if (galleryItems.length >= MAX_GALLERY_ITEMS) {
        break outer;
      }
    }
  }

  return galleryItems;
}

export { listGalleryImages };
