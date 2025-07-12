import type { APIRoute } from "astro";
import { SITE_URL } from "../constants/constants";

export const GET: APIRoute = async () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
            <loc>${SITE_URL}/sitemap.xml</loc>
        </sitemap>
        <sitemap>
            <loc>${SITE_URL}/sitemap-events.xml</loc>
        </sitemap>
        <sitemap>
            <loc>${SITE_URL}/sitemap-obituary.xml</loc>
        </sitemap>
    </sitemapindex>
  `;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
