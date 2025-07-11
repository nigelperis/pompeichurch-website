import type { APIRoute } from "astro";
import type { Obituary } from "../models/obituary";
import { Locale } from "../enums/locale";
import { SITE_URL } from "../constants/constants";

export const GET: APIRoute = async () => {
  const baseURL = import.meta.env.PUBLIC_STRAPI_URL;

  const entry: string[] = [];
  const obituaries = await fetch(`${baseURL}/api/obituaries`);
  const obituariesData = await obituaries.json();

  obituariesData.data.forEach((obituary: Obituary) => {
    entry.push(
      `<url>
            <loc>${SITE_URL}/obituary?id=${obituary.slug}</loc>
            <lastmod>${obituary.updatedAt}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
        `,
    );

    entry.push(
      `<url>
                <loc>${SITE_URL}/${Locale.KOK}/obituary?id=${obituary.slug}</loc>
                <lastmod>${obituary.updatedAt}</lastmod>
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
