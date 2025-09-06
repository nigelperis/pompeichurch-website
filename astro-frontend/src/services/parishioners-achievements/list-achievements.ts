import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  ParishionersAchievementsData,
  ParishionersAchievementsPagination,
} from "~/models/parishioners-achievement";

/**
 * Fetches a paginated list of Parishioners' Achievements from Strapi.
 *
 * @param {Object} [args] - Optional parameters for fetching the list of achievements.
 * @param {number} [args.page=1] - The page number to retrieve.
 * @param {number} [args.pageSize=25] - The number of achievements per page.
 * @returns {Promise<ParishionersAchievementsPagination>} A promise that resolves to an object containing
 * the list of achievements and pagination metadata.
 */
async function listParishionersAchievements(args?: {
  page?: number;
  pageSize?: number;
}): Promise<ParishionersAchievementsPagination> {
  const { page = 1, pageSize = 25 } = args ?? {};

  const queryParams = new URLSearchParams({
    "populate[0]": "achieverImage",
    "sort[0]": "createdAt:desc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });

  const data = await strapiFetch<ParishionersAchievementsData>({
    endpoint: ROUTES.PARISHIONERS_ACHIEVEMENTS,
    queryParams,
  });

  return {
    parishionersAchievements: data?.data ?? [],
    pagination: data?.meta?.pagination ?? {
      total: 0,
      page,
      pageSize,
      pageCount: 0,
    },
  };
}

export { listParishionersAchievements };
