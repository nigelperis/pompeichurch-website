import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  CarouselItem,
  LandingCarouselResponse,
} from "~/models/landing-page-carousel";

/**
 * Get carousel images from Strapi.
 *
 * @returns Array of carousel items.
 */
async function fetchCarouselImages(): Promise<CarouselItem[] | null> {
  const queryParams = new URLSearchParams({
    "populate[0]": "carouselImage",
  });

  const data = await strapiFetch<LandingCarouselResponse>({
    endpoint: ROUTES.LANDING_PAGE_CAROUSEL,
    queryParams,
  });

  if (!data?.data) {
    return null;
  }

  return data.data;
}

export { fetchCarouselImages };
