import type { APIRoute } from "astro";
import { strapiFetch } from "~/helpers/strapi-fetch";
import { ROUTES } from "~/constants/strapi-endpoints";
import { ITEMS_PER_PAGE } from "~/constants/index.ts";
import type { EventData } from "~/models/event";

const SORT_PARAMS = {
  "sort[0]": "eventDate:desc",
  "sort[1]": "createdAt:desc",
};

/**
 * GET /api/events/find-page?id=<eventId>
 *
 * Fetches all event IDs from Strapi in the same sort order as the events list
 * page, then computes which page the given event falls on based on ITEMS_PER_PAGE.
 *
 * Step 1: Fetch one record with `pagination[withCount]=true` to get the real total.
 * Step 2: Fetch all IDs using that total as pageSize (fields[0]=id only, no populate).
 *
 * @returns JSON `{ page: number, slug: string }` — the 1-based page number and event slug.
 */
export const GET: APIRoute = async ({ url }) => {
  const rawId = url.searchParams.get("id");

  if (!rawId) {
    return new Response(JSON.stringify({ error: "Missing required param: id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const eventId = Number(rawId);

  if (!Number.isInteger(eventId) || eventId <= 0) {
    return new Response(JSON.stringify({ error: "Invalid id: must be a positive integer" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Step 1: get the real total count without fetching all records
  const countData = await strapiFetch<EventData>({
    endpoint: ROUTES.EVENTS,
    queryParams: new URLSearchParams({
      "fields[0]": "id",
      "pagination[page]": "1",
      "pagination[pageSize]": "1",
      "pagination[withCount]": "true",
      ...SORT_PARAMS,
    }),
  });

  const total = countData?.meta?.pagination?.total ?? 0;

  if (total === 0) {
    return new Response(JSON.stringify({ error: "Event not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Step 2: fetch all IDs in sort order using the real total as the page size
  const data = await strapiFetch<EventData>({
    endpoint: ROUTES.EVENTS,
    queryParams: new URLSearchParams({
      "fields[0]": "id",
      "fields[1]": "slug",
      "pagination[page]": "1",
      "pagination[pageSize]": String(total),
      ...SORT_PARAMS,
    }),
  });

  const ids = data?.data?.map((e) => e.id) ?? [];

  const index = ids.indexOf(eventId);

  if (index === -1) {
    return new Response(JSON.stringify({ error: "Event not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const page = Math.floor(index / ITEMS_PER_PAGE) + 1;
  const slug = data?.data?.[index]?.slug ?? "";

  return new Response(JSON.stringify({ page, slug }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
