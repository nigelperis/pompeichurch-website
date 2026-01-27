import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type { ObituaryData, ObituaryPagination } from "~/models/obituary";

/**
 * Fetches a paginated list of obituaries from Strapi.
 *
 * @param {Object} [args] - Optional parameters for fetching obituaries.
 * @param {number} [args.page=1] - The page number to retrieve.
 * @param {number} [args.pageSize=25] - The number of obituaries per page.
 * @param {string} [args.sortBy='dateOfDeath:desc'] - The sorting order of the obituaries.
 * @returns {Promise<ObituaryPagination>} A promise that resolves to an object containing obituaries and pagination details.
 */
async function listObituaries(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  ward?: string;
  filters?: Record<string, any>;
}): Promise<ObituaryPagination> {
  const {
    page = 1,
    pageSize = 25,
    sortBy = "dateOfDeath:desc",
    ward,
    filters,
  } = args ?? {};

  const queryParams = new URLSearchParams({
    "populate[0]": "image",
    "sort[0]": sortBy,
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });

  if (ward) {
    queryParams.append("filters[ward][$eqi]", ward); // case-insensitive
  }

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      const keyPath = key.includes(".") ? key.replaceAll(".", "][") : key;
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([op, val]) => {
          queryParams.append(`filters[${keyPath}][${op}]`, String(val));
        });
      } else {
        queryParams.append(`filters[${keyPath}]`, String(value));
      }
    });
  }

  const data = await strapiFetch<ObituaryData>({
    endpoint: ROUTES.OBITUARIES,
    queryParams,
  });

  return {
    obituaries: data?.data ?? [],
    pagination: data?.meta?.pagination ?? {
      total: 0,
      page,
      pageSize,
      pageCount: 0,
    },
  };
}

export { listObituaries };
