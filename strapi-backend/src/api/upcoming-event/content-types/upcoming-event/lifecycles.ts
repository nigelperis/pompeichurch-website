import { sendEmail } from '../../../../utils/send-email';
import { SITE_URL } from '../../../../constants';
import { sendPushNotification } from '../../../../utils/send-push-notifications';

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi.pompeichurch.in';

function setEventDateToEndOfDay(data: any) {
  if (data.eventDate) {
    const eventDate = new Date(data.eventDate);

    // Set the time to 18:29:59 UTC, which is 23:59:59 IST
    eventDate.setUTCHours(18, 29, 59, 999);

    data.eventDate = eventDate.toISOString();
  }
}

async function maybeSendUpcomingEventEmail(result: any) {
  if (!result.publishedAt) return;

  const { eventDate } = result;

  const upcomingEventImage = result.eventImage?.url
    ? new URL(result.eventImage.url, STRAPI_URL).toString()
    : null;

  const publisher = result.updatedBy || result.createdBy || null;

  const publisherName = publisher
    ? `${publisher.firstname || publisher.firstName || ''} ${publisher.lastname || publisher.lastName || ''}`.trim()
    : 'Unknown';

  const subject = `📢 New Upcoming Event Published`;
  const html = `
    <h2>New Upcoming Event</h2>
    <ul>
      <li><strong>Event Date:</strong> ${new Date(eventDate).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })}</li>
      <li><strong>View Upcoming Event:</strong> <a href="${SITE_URL}?section=upcoming-events">${SITE_URL}?section=upcoming-events</a></li>
    </ul>
    <p><strong>Published By:</strong> ${publisherName}</p>
  `;

  await sendEmail({ subject, html });

  await sendPushNotification(strapi, {
    title: '📢 New Upcoming Event Added',
    icon: '/church-logo.webp',
    image: upcomingEventImage,
    data: {
      url: `${SITE_URL}?section=upcoming-events`,
    },
  });
}

export default {
  beforeCreate(event: any) {
    setEventDateToEndOfDay(event.params.data);
  },
  beforeUpdate(event: any) {
    setEventDateToEndOfDay(event.params.data);
  },
  async afterCreate(event: any) {
    await maybeSendUpcomingEventEmail(event.result);
  },
  async afterUpdate(event: any) {
    await maybeSendUpcomingEventEmail(event.result);
  },
};
