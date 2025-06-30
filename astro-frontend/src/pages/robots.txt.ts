import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`.trim();

export const GET: APIRoute = ({ site }) => {
  if (import.meta.env.PUBLIC_ENVIRONMENT === 'production') {
    const sitemapURL = new URL("sitemap-index.xml", site);
    return new Response(getRobotsTxt(sitemapURL), {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  return new Response(`User-agent: *\nDisallow: /`, {
    headers: { 'Content-Type': 'text/plain' },
  });
};