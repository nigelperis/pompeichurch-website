import type { APIRoute } from "astro";
import { navLinks } from "../constants/nav-links";
import { listAssociations } from "../services/associations/list-associations";
import { Locale } from "../enums/locale";
import { sitemapUrl } from "~/helpers/sitemap-url";
import { lastmod } from "../constants/last-modified-date";

export const GET: APIRoute = async () => {
  const entry: string[] = [];

  navLinks.forEach((navItem) => {
    if (navItem.type === "expandable") {
      navItem.expandedLinks.forEach((link) => {
        entry.push(
          `<url>
              <loc>${sitemapUrl(`${link.href}`)}</loc>
              <lastmod>${lastmod}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
          </url>
      `,
        );

        entry.push(
          `<url>
              <loc>${sitemapUrl(`/${Locale.KOK}${link.href}`)}</loc>
              <lastmod>${lastmod}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
          </url>
      `,
        );
      });
    } else {
      entry.push(
        `<url>
            <loc>${sitemapUrl(`${navItem.href}`)}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
        </url>
    `,
      );

      entry.push(
        `<url>
            <loc>${sitemapUrl(`/${Locale.KOK}${navItem.href}`)}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
        </url>
        `,
      );
    }
  });

  // Dynamic associations routes
  const assocs = await listAssociations();
  assocs.forEach((a) => {
    entry.push(
      `<url>
          <loc>${sitemapUrl(`/associations/${a.slug}`)}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.9</priority>
      </url>
    `,
    );
    entry.push(
      `<url>
          <loc>${sitemapUrl(`/${Locale.KOK}/associations/${a.slug}`)}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.9</priority>
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
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600, public, stale-while-revalidate=1800",
    },
  });
};
