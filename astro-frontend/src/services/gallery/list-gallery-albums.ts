import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { GalleryAlbumsData, GalleryAlbumsPagination } from "~/models/gallery";

async function listGalleryAlbums(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string[];
}): Promise<GalleryAlbumsPagination> {
  const { page = 1, pageSize = 12, sortBy = ["createdAt:desc"] } = args ?? {};

  const queryParams = new URLSearchParams({
    "populate[0]": "images",
    "populate[1]": "event",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });

  sortBy.forEach((s, i) => queryParams.append(`sort[${i}]`, s));

  const data = await strapiFetch<GalleryAlbumsData>({
    endpoint: ROUTES.GALLERY_ALBUMS,
    queryParams,
  });

  return {
    albums: data?.data ?? [],
    pagination: data?.meta?.pagination ?? {
      total: 0,
      page,
      pageSize,
      pageCount: 0,
    },
  };
}

export { listGalleryAlbums };
