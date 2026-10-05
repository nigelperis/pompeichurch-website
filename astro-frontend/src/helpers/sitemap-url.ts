import { SITE_URL } from "~/constants/index";

export function sitemapUrl(path: string): string {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  return `${SITE_URL}/${normalizedPath}${normalizedPath ? "/" : ""}`;
}
