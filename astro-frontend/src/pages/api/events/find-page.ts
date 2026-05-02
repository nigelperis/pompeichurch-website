import type { APIRoute } from "astro";
import { strapiFetch } from "~/helpers/strapi-fetch";
import { ROUTES } from "~/constants/strapi-endpoints";
import { ITEMS_PER_PAGE, EVENT_DEFAULT_SORT } from "~/constants/index.ts";
import type { EventData } from "~/models/event";

/**
 * GET /api/events/find-page?id=<eventId>[&association=<slug>]
 *
 * Fetches all event IDs from Strapi in the same sort order as the events list
 * page, then computes which page the given event falls on based on ITEMS_PER_PAGE.
 *
 * When `association` is provided the lookup is scoped to that association's
 * events, so the returned page number is correct for /associations/[slug]/events.
 *
 * Step 1: Fetch one record with `pagination[withCount]=true` to get the real total.
 * Step 2: Fetch all IDs using that total as pageSize (fields[0]=id only, no populate).
 *
 * @returns JSON `{ page: number, slug: string }` — the 1-based page number and event slug.
 */
export const GET: APIRoute = async ({ url }) => {
  const rawId = url.searchParams.get("id");
  const associationSlug = url.searchParams.get("association") ?? undefined;

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

  // Build shared query params (sort + optional association filter)
  function buildQueryParams(extra: Record<string, string>) {
    const params = new URLSearchParams(extra);
    EVENT_DEFAULT_SORT.forEach((s, i) => params.append(`sort[${i}]`, s));
    if (associationSlug) {
      params.append("filters[association][slug][$eq]", associationSlug);
    }
    return params;
  }

  // Step 1: get the real total count without fetching all records
  const countData = await strapiFetch<EventData>({
    endpoint: ROUTES.EVENTS,
    queryParams: buildQueryParams({
      "fields[0]": "id",
      "pagination[page]": "1",
      "pagination[pageSize]": "1",
      "pagination[withCount]": "true",
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
    queryParams: buildQueryParams({
      "fields[0]": "id",
      "fields[1]": "slug",
      "pagination[page]": "1",
      "pagination[pageSize]": String(total),
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
