import type { APIRoute } from "astro";
import { listMagazines } from "~/services/list-magazines";

function extractSlug(fileUrl: string): string | null {
  const fileName = new URL(fileUrl).pathname.split("/").pop();
  if (!fileName) return null;
  return fileName.split("_").slice(0, -1).join("_").replace(".pdf", "");
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  const magazines = await listMagazines();

  for (const magazine of magazines) {
    const pdfPath = magazine.pdfFile?.url;
    if (!pdfPath) continue;

    const fileUrl = new URL(pdfPath, import.meta.env.PUBLIC_STRAPI_URL).toString();
    const computedSlug = extractSlug(fileUrl);

    if (computedSlug === slug) {
      return Response.redirect(fileUrl, 302);
    }
  }

  return new Response("Invalid or missing slug", { status: 404 });
};
