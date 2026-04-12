import type { APIRoute } from "astro";
import { strapiFetch } from "~/helpers/strapi-fetch";
import { ROUTES } from "~/constants/strapi-endpoints";
import { ITEMS_PER_PAGE } from "~/constants/index.ts";
import type { EventData } from "~/models/event";

/**
 * GET /api/events/find-page?id=<eventId>
 *
 * Fetches all event IDs from Strapi in the same sort order as the events list
 * page, then computes which page the given event falls on based on ITEMS_PER_PAGE.
 *
 * Uses a single Strapi request fetching only the `id` field (no populate) for
 * maximum efficiency.
 *
 * @returns JSON `{ page: number }` — the 1-based page number the event appears on.
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

  const queryParams = new URLSearchParams({
    "fields[0]": "id",
    "pagination[page]": "1",
    "pagination[pageSize]": "1000",
    "sort[0]": "eventDate:desc",
    "sort[1]": "createdAt:desc",
  });

  const data = await strapiFetch<EventData>({
    endpoint: ROUTES.EVENTS,
    queryParams,
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

  return new Response(JSON.stringify({ page }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
