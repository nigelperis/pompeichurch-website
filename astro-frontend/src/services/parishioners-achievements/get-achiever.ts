import type { ParishionersAchievement, ParishionersAchievementsData } from "~/models/parishioners-achievement";
import { strapiFetch } from "~/helpers/strapi-fetch";
import { ROUTES } from "~/constants/strapi-endpoints";

/**
 * Fetches a parishioner's achievement by its slug from Strapi.
 *
 * @param {string} slug - The slug of the parishioner's achievement to fetch.
 * @returns {Promise<ParishionersAchievement | undefined>} A promise that resolves
 *   to an object containing the parishioner's achievement if found, or undefined
 *   if not found.
 */
async function getAchiever(slug: string): Promise<ParishionersAchievement | undefined> {
  const queryParams = new URLSearchParams({
    "populate[0]": "achieverImage",
    "populate[1]": "additionalImages",
    "filters[slug][$eq]": slug,
  });

  const data = await strapiFetch<ParishionersAchievementsData>({
    endpoint: ROUTES.PARISHIONERS_ACHIEVEMENTS,
    queryParams,
  });

  return data?.data?.[0];
}

export { getAchiever };
