import { SITE_URL } from "../../../../constants";
import { sendEmail } from "../../../../utils/send-email";
import { sendPushNotification } from "../../../../utils/send-push-notifications";

const STRAPI_URL = process.env.STRAPI_URL || "https://strapi.pompeichurch.in";

async function maybeSendPompeichemFalkemEmail(result: any) {
  if (!result?.publishedAt) return;

  const link = `${SITE_URL}/pompeichem-falkem`;

  const coverImage = result.coverImage?.url
    ? new URL(result.coverImage.url, STRAPI_URL).toString()
    : null;

  const { title, dateOfPublish } = result;

  const publisher = result.updatedBy || result.createdBy || null;
  const publisherName = publisher
    ? `${publisher.firstname || publisher.firstName || ""} ${
        publisher.lastname || publisher.lastName || ""
      }`.trim()
    : "Unknown";

  const subject = `New Pompeichem Falkem Published: ${title || "Untitled"}`;
  const html = `
    <h2>New Pompeichem Falkem</h2>
    <ul>
      <li><strong>Title:</strong> ${title}</li>
      <li><strong>Date of Publish:</strong> ${dateOfPublish}</li>
      <li><strong>View:</strong> <a href="${link}">${link}</a></li>
    </ul>
    <p><strong>Published By:</strong> ${publisherName}</p>
  `;

  await sendEmail({ subject, html });

  await sendPushNotification(strapi, {
    title: "New Pompeichem Falkem Added",
    body: title,
    icon: "/temp-logo.webp",
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
