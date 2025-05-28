import { sendEmail } from "../../../../utils/send-email";

async function maybeSendUpcomingEventEmail(result: any) {
  if (!result.publishedAt) return;

  const {
    eventEndDate,
  } = result;

  const subject = `📢 New Upcoming Event Published`;
  const html = `
    <h2>New Upcoming Event</h2>
    <ul>
      <li><strong>Event End Date:</strong> ${eventEndDate}</li>
    </ul>
  `;

  await sendEmail({ subject, html });
}

export default {
  async afterCreate(event: any) {
    await maybeSendUpcomingEventEmail(event.result);
  },
  async afterUpdate(event: any) {
    await maybeSendUpcomingEventEmail(event.result);
  },
};
