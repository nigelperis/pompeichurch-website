import type { APIRoute } from "astro";
import type { Obituary } from "~/models/obituary";
import { Locale } from "~/enums/locale";
import { SITE_URL } from "~/constants/constants";
import { listObituaries } from "~/services/obituaries/list-obituaries";

export const GET: APIRoute = async () => {
  const baseURL = import.meta.env.PUBLIC_STRAPI_URL;

  const entry: string[] = [];
  const allObituaries: Obituary[] = [];

  let currentPage = 1;
  let totalPages;

  do {
    const obituaries = await listObituaries({ page: currentPage });
    allObituaries.push(...obituaries.obituaries);
    currentPage++;
    totalPages = obituaries.pagination.pageCount;
  } while (currentPage <= totalPages);

  allObituaries.forEach((obituary: Obituary) => {
    entry.push(
      `<url>
            <loc>${SITE_URL}/obituary/${obituary.slug}</loc>
            <lastmod>${obituary.updatedAt}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
        `,
    );

    entry.push(
      `<url>
                <loc>${SITE_URL}/${Locale.KOK}/obituary/${obituary.slug}</loc>
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
