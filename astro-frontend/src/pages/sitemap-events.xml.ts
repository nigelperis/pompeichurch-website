import type { APIRoute } from "astro";
import type { Event } from "~/models/event";
import { Locale } from "~/enums/locale";
import { SITE_URL } from "~/constants/constants";
import { listEvents } from "~/services/events/list-events";

export const GET: APIRoute = async () => {
  const baseURL = import.meta.env.PUBLIC_STRAPI_URL;

  const entry: string[] = [];
  const allEvents: Event[] = [];
  
  let currentPage = 1;
  let totalPages;

  do {
    const events = await listEvents({ page: currentPage });
    allEvents.push(...events.events);
    currentPage++;
    totalPages = events.pagination.pageCount;
  } while (currentPage <= totalPages);

  allEvents.forEach((event: Event) => {
    entry.push(
      `<url>
            <loc>${SITE_URL}/events/${event.slug}</loc>
            <lastmod>${event.updatedAt}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
        `,
    );

    entry.push(
      `<url>
            <loc>${SITE_URL}/${Locale.KOK}/events/${event.slug}</loc>
            <lastmod>${event.updatedAt}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
        `,
    );
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${entry.join("\n")}
    </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
};
