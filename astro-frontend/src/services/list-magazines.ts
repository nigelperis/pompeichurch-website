import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  PompeichemFalkem,
  PompeichemFalkemData,
} from "~/models/pompeichem-falkem";

/**
 * Fetches a paginated list of "Pompeichem Falkem" magazines from the Strapi CMS.
 *
 * @param {Object} [args] - Optional parameters for fetching magazines.
 * @param {number} [args.page=1] - The page number to fetch (default: 1).
 * @param {number} [args.pageSize=25] - The number of magazines per page (default: 25).
 * @param {string} [args.sortBy='dateOfPublish:desc'] - The sorting order for magazines (default: 'dateOfPublish:desc').
 * @returns {Promise<{ magazines: PompeichemFalkem[]; pagination: { total: number; page: number; pageSize: number; pageCount: number } }>} A promise resolving to magazines and pagination meta.
 */
async function listMagazines(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
}): Promise<{
  magazines: PompeichemFalkem[];
  pagination: { total: number; page: number; pageSize: number; pageCount: number };
}> {
  const { page = 1, pageSize = 25, sortBy = "dateOfPublish:desc" } = args ?? {};

  const queryParams = new URLSearchParams({
    "populate[0]": "coverImage",
    "populate[1]": "pdfFile",
    "sort[0]": sortBy,
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });

  const data = await strapiFetch<PompeichemFalkemData>({
    endpoint: ROUTES.POMPEICHEM_FALKEM,
    queryParams,
  });

  return {
    magazines: data?.data ?? [],
    pagination:
      data?.meta?.pagination ?? ({ total: 0, page, pageSize, pageCount: 0 } as const),
  };
}

export { listMagazines };
