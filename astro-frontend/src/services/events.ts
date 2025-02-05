import { strapiFetch } from "~/helpers/strapi-fetch";

async function fetchEvents() {
  const data = await strapiFetch<ApiResponse['data']>({
    endpoint: '/events',
    query: {
      populate: 'carouselImage',
    },
    wrappedByKey: 'data',
  });
  return data;
}

export { fetchEvents };