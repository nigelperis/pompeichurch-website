import { sendEmail } from "../../../../utils/send-email";
import { UPCOMING_EVENTS } from "../../../../constants";
import { sendPushNotification } from "../../../../utils/send-push-notifications";

async function maybeSendUpcomingEventEmail(result: any) {
  if (!result.publishedAt) return;

  const { eventEndDate } = result;

  const publisher = result.updatedBy || result.createdBy || null;

  const publisherName = publisher
    ? `${publisher.firstname || publisher.firstName || ""} ${publisher.lastname || publisher.lastName || ""}`.trim()
    : "Unknown";

  const subject = `📢 New Upcoming Event Published`;
  const html = `
    <h2>New Upcoming Event</h2>
    <ul>
      <li><strong>Event End Date:</strong> ${eventEndDate}</li>
      <li><strong>View Upcoming Event:</strong> <a href="${UPCOMING_EVENTS}">${UPCOMING_EVENTS}</a></li>
    </ul>
    <p><strong>Published By:</strong> ${publisherName}</p>
  `;

  await sendEmail({ subject, html });

  await sendPushNotification(strapi, {
    title: "📢 New Upcoming Event Added",
    icon: "/temp-logo.webp",
    data: {
      url: UPCOMING_EVENTS,
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
