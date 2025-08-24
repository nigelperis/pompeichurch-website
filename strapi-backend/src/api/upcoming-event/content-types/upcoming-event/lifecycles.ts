import { sendEmail } from "../../../../utils/send-email";
import { SITE_URL } from "../../../../constants";
import { sendPushNotification } from "../../../../utils/send-push-notifications";

const STRAPI_URL = process.env.STRAPI_URL || "https://strapi.pompeichurch.in";

async function maybeSendUpcomingEventEmail(result: any) {
  if (!result.publishedAt) return;

  const { eventEndDate } = result;

  const upcomingEventImage = result.eventImage?.url
    ? new URL(result.eventImage.url, STRAPI_URL).toString()
    : null;

  const publisher = result.updatedBy || result.createdBy || null;

  const publisherName = publisher
    ? `${publisher.firstname || publisher.firstName || ""} ${publisher.lastname || publisher.lastName || ""}`.trim()
    : "Unknown";

  const subject = `📢 New Upcoming Event Published`;
  const html = `
    <h2>New Upcoming Event</h2>
    <ul>
      <li><strong>Event End Date:</strong> ${eventEndDate}</li>
      <li><strong>View Upcoming Event:</strong> <a href="${SITE_URL}?section=upcoming-events">${SITE_URL}?section=upcoming-events</a></li>
    </ul>
    <p><strong>Published By:</strong> ${publisherName}</p>
  `;

  await sendEmail({ subject, html });

  await sendPushNotification(strapi, {
    title: "📢 New Upcoming Event Added",
    icon: "/temp-logo.webp",
    image: upcomingEventImage,
    data: {
      url: `${SITE_URL}?section=upcoming-events`,
    },
  });
}

export default {
  async afterCreate(event: any) {
    await maybeSendUpcomingEventEmail(event.result);
  },
  async afterUpdate(event: any) {
    await maybeSendUpcomingEventEmail(event.result);
  },
};
