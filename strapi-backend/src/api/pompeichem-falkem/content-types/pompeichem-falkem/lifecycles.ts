import { SITE_URL } from "../../../../constants";
import { sendEmail } from "../../../../utils/send-email";
import { sendPushNotification } from "../../../../utils/send-push-notifications";
import { assignPompeichemFalkemSlug } from "./slug";

const STRAPI_URL = process.env.STRAPI_URL || "https://strapi.pompeichurch.in";
const CONTENT_TYPE_UID = "api::pompeichem-falkem.pompeichem-falkem";

function getDisplayTitleFromEntry(entry: any): string {
  const specialEn = (entry?.specialEditionTitle ?? "").trim();
  if (specialEn) return specialEn;

  const mag = (entry?.magazineTitle ?? "").trim();
  return mag || "Pompeichem Falkem";
}

async function maybeSendPompeichemFalkemEmail(result: any) {
  if (!result?.publishedAt || !result?.slug) return;

  const link = `${SITE_URL}/pompeichem-falkem/${result.slug}`;

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
  async beforeCreate(event: any) {
    assignPompeichemFalkemSlug(event.params?.data);
  },
  async beforeUpdate(event: any) {
    const data = event.params?.data ?? {};
    const current = await strapi.db.query(CONTENT_TYPE_UID).findOne({
      where: event.params?.where,
      select: [
        "id",
        "documentId",
        "dateOfPublish",
        "magazineTitle",
        "specialEditionTitle",
      ],
    });

    const next = { ...current, ...data };
    const slug = assignPompeichemFalkemSlug(next);

    data.slug = slug;
  },
  async afterCreate(event: any) {
    await maybeSendPompeichemFalkemEmail(event.result);
  },
  async afterUpdate(event: any) {
    await maybeSendPompeichemFalkemEmail(event.result);
  },
};
