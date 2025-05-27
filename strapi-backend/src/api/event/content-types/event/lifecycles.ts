import { SITE_URL } from "../../../../constants";
import { sendEmail } from "../../../../utils/send-email";

/**
 * Lifecycle hooks for the Event content type
 * Handles sending an email notification when an event is created or updated
 */
async function maybeSendEventEmail(result: any) {
  if (!result.publishedAt) return;

  const eventLink = `${SITE_URL}/events/${result.slug}`;

  const {
    englishTitle,
    konkaniTitle,
    eventDate,
    shortDescription,
    facebookLink,
    instagramLink,
  } = result;

  const subject = `📅 New Event Published: ${englishTitle}`;
  const html = `
    <h2>New Event Published</h2>
    <ul>
      <li><strong>English Title:</strong> ${englishTitle}</li>
      <li><strong>Konkani Title:</strong> ${konkaniTitle}</li>
      <li><strong>Event Date:</strong> ${eventDate}</li>
      <li><strong>Short Description:</strong> ${shortDescription || 'N/A'}</li>
      ${facebookLink ? `<li><strong>Facebook Link:</strong> <a href="${facebookLink}">${facebookLink}</a></li>` : ''}
      ${instagramLink ? `<li><strong>Instagram Link:</strong> <a href="${instagramLink}">${instagramLink}</a></li>` : ''}
      <li><strong>View Event:</strong> <a href="${eventLink}">${eventLink}</a></li>
    </ul>
  `;

  await sendEmail({ subject, html });
}

export default {
  async afterCreate(event: any) {
    await maybeSendEventEmail(event.result);
  },
  async afterUpdate(event: any) {
    await maybeSendEventEmail(event.result);
  },
};
