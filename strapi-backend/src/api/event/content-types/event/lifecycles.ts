import { SITE_URL } from "../../../../constants";
import { sendEmail } from "../../../../utils/send-email";
import { sendPushNotification } from "../../../../utils/send-push-notifications";

const STRAPI_URL = process.env.STRAPI_URL || "https://strapi.pompeichurch.in";

/**
 * Lifecycle hooks for the Event content type
 * Handles sending an email notification when an event is created or updated
 */
async function maybeSendEventEmail(result: any) {
  if (!result.publishedAt) return;

  const eventLink = `${SITE_URL}/events/${result.slug}`;

  const eventImage = result.eventImage?.url
    ? new URL(result.eventImage.url, STRAPI_URL).toString()
    : null;

  const {
    englishTitle,
    konkaniTitle,
    eventDate,
    shortDescriptionEn,
    shortDescriptionKok,
    facebookLink,
    instagramLink,
  } = result;

  const publisher = result.updatedBy || result.createdBy || null;

  const publisherName = publisher
    ? `${publisher.firstname || publisher.firstName || ""} ${
        publisher.lastname || publisher.lastName || ""
      }`.trim()
    : "Unknown";

  const subject = `📅 New Event Published: ${englishTitle}`;
  const html = `
    <h2>New Event Published</h2>
    <ul>
      <li><strong>English Title:</strong> ${englishTitle}</li>
      <li><strong>Konkani Title:</strong> ${konkaniTitle}</li>
      <li><strong>Event Date:</strong> ${eventDate}</li>
      <li><strong>English Short Description:</strong> ${
        shortDescriptionEn || "N/A"
      }</li>
       <li><strong>Konkani Short Description:</strong> ${
         shortDescriptionKok || "N/A"
       }</li>
      ${
        facebookLink
          ? `<li><strong>Facebook Link:</strong> <a href="${facebookLink}">${facebookLink}</a></li>`
          : ""
      }
      ${
        instagramLink
          ? `<li><strong>Instagram Link:</strong> <a href="${instagramLink}">${instagramLink}</a></li>`
          : ""
      }
      <li><strong>View Event:</strong> <a href="${eventLink}">${eventLink}</a></li>
    </ul>
    <p><strong>Published By:</strong> ${publisherName}</p>
  `;

  await sendEmail({ subject, html });

  await sendPushNotification(strapi, {
    title: "📅New Event Added",
    body: konkaniTitle,
    icon: "/church-logo.webp",
    image: eventImage,
    data: {
      url: eventLink,
    },
  });
}

export default {
  async afterCreate(event: any) {
    await maybeSendEventEmail(event.result);
  },
  async afterUpdate(event: any) {
    await maybeSendEventEmail(event.result);
  },
};
