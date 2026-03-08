import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ExVicePresidentsAndSecretaries,
  ExVicePresidentsAndSecretariesData,
} from "~/models/ex-vice-president-and-secretary";

import { ExOfficeBearersRole } from "~/enums/ex-office-bearers-role";

/**
 * Fetches a paginated list of Ex Vice Presidents and Secretaries from Strapi.
 * @param {Object} [args] - Optional parameters for fetching the list of members.
 * @param {number} [args.page=1] - The page number to retrieve.
 * @param {number} [args.pageSize=25] - The number of members per page.
 * @param {string} [args.sortBy='createdAt:asc'] - The sorting order of the members.

 * @param {Record<string, any>} [args.filters] - Additional filters to apply to the query.
 * @returns {Promise<ExVicePresidentsAndSecretaries[]>} A promise that resolves to an array of ExVicePresidentsAndSecretaries objects.
 */
async function listExVicePresidentsAndSecretaries(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;

  filters?: Record<string, any>;
}): Promise<ExVicePresidentsAndSecretaries[]> {
  const batchSize = 100;
  let page = 1;
  let members: ExVicePresidentsAndSecretaries[] = [];
  let hasMore = true;

  const {
    pageSize = 25,
    sortBy = "createdAt:asc",

    filters = { role: { $eq: ExOfficeBearersRole.VICE_PRESIDENT } },
  } = args ?? {};

  while (hasMore) {
    const queryParams = new URLSearchParams({
      "populate[0]": "image",
      "populate[1]": "terms",
      "sort[0]": sortBy,
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
    });

    for (const field in filters) {
      const condition = filters[field];
      if (typeof condition === "object") {
        for (const operator in condition) {
          queryParams.append(
            `filters[${field}][${operator}]`,
            String(condition[operator]),
          );
        }
      } else {
        queryParams.append(`filters[${field}][$eq]`, String(condition));
      }
    }

    const data = await strapiFetch<ExVicePresidentsAndSecretariesData>({
      endpoint: ROUTES.EX_VICE_PRESIDENTS_AND_SECRETARIES,
      queryParams,
    });

    if (data?.data?.length) {
      members.push(...data?.data);
      page++;

      if (data?.data?.length < batchSize) {
        hasMore = false;
      }
    } else {
      hasMore = false;
    }
  }

  return members;
}

export { listExVicePresidentsAndSecretaries };
