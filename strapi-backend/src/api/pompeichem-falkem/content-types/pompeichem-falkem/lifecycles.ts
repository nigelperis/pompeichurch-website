import { SITE_URL } from "../../../../constants";
import { sendEmail } from "../../../../utils/send-email";
import { sendPushNotification } from "../../../../utils/send-push-notifications";

const STRAPI_URL = process.env.STRAPI_URL || "https://strapi.pompeichurch.in";

function getDisplayTitleFromEntry(entry: any): string {
  const specialEn = (entry?.specialEditionTitle ?? "").trim();
  if (specialEn) return specialEn;

  const mag = (entry?.magazineTitle ?? "").trim();
  return mag || "Pompeichem Falkem";
}

async function maybeSendPompeichemFalkemEmail(result: any) {
  if (!result?.publishedAt) return;

  const link = (() => {
    const pdfUrl: string | undefined = result?.pdfFile?.url;
    if (!pdfUrl) return `${SITE_URL}/pompeichem-falkem`;
    try {
      const fileName =
        new URL(pdfUrl, STRAPI_URL).pathname.split("/").pop() || "";
      const base = fileName.replace(/\.pdf$/i, "");
      const parts = base.split("_");
      const slug = parts.length > 1 ? parts.slice(0, -1).join("_") : base;
      if (!slug) return `${SITE_URL}/pompeichem-falkem`;
      return `${SITE_URL}/pompeichem-falkem/${slug}`;
    } catch {
      return `${SITE_URL}/pompeichem-falkem`;
    }
  })();

  const coverImage = result.coverImage?.url
    ? new URL(result.coverImage.url, STRAPI_URL).toString()
    : null;

  const title = getDisplayTitleFromEntry(result);
  const { dateOfPublish } = result;

  const formattedDateOfPublish = (() => {
    if (!dateOfPublish) return "";
    const d = new Date(dateOfPublish);
    if (isNaN(d.getTime())) return String(dateOfPublish);
    return d
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
  })();

  const publisher = result.updatedBy || result.createdBy || null;
  const publisherName = publisher
    ? `${publisher.firstname || publisher.firstName || ""} ${
        publisher.lastname || publisher.lastName || ""
      }`.trim()
    : "Unknown";

  const subject = `📖 New Pompeichem Falkem Published: ${title || "Untitled"}`;
  const html = `
    <h2>New Pompeichem Falkem</h2>
    <ul>
      <li><strong>Title:</strong> ${title}</li>
      <li><strong>Date of Publish:</strong> ${formattedDateOfPublish}</li>
      <li><strong>View:</strong> <a href="${link}">${link}</a></li>
    </ul>
    <p><strong>Published By:</strong> ${publisherName}</p>
  `;

  await sendEmail({ subject, html });

  await sendPushNotification(strapi, {
    title: "New Pompeichem Falkem Added",
    body: title,
    icon: "/church-logo.webp",
    image: coverImage,
    data: {
      url: link,
    },
  });
}

export default {
  async afterCreate(event: any) {
    await maybeSendPompeichemFalkemEmail(event.result);
  },
  async afterUpdate(event: any) {
    await maybeSendPompeichemFalkemEmail(event.result);
  },
};
