import { SITE_URL } from "../../../../constants";
import { sendEmail } from "../../../../utils/send-email";

/**
 * Lifecycle hooks for the Event content type
 * Handles sending an email notification when an event is created or updated
 */
async function maybeSendObituaryEmail(result: any) {
  if (!result.publishedAt) return;

  const obituaryLink = `${SITE_URL}/obituary?${result.slug}`;

  const {
    englishName,
    konkaniName,
    age,
    dateOfDeath,
    relationType,
    relationNameEn,
    relationNameKok,
    ward,
  } = result;

  const subject = `🕊️ New Obituary: ${englishName}`;

  const html = `
    <h2>New Obituary Published</h2>
    <ul>
      <li><strong>English Name:</strong> ${englishName}</li>
      <li><strong>Konkani Name:</strong> ${konkaniName}</li>
      <li><strong>Age:</strong> ${age}</li>
      <li><strong>Date of Death:</strong> ${dateOfDeath}</li>
      <li><strong>Relation:</strong> ${relationType} ${relationNameEn} / ${relationNameKok}</li>
      <li><strong>Ward:</strong> ${ward}</li>
      <li><strong>View Obituary:</strong> <a href="${obituaryLink}">${obituaryLink}</a></li>
    </ul>
  `;

  await sendEmail({ subject, html });
}

export default {
  async afterCreate(event: any) {
    await maybeSendObituaryEmail(event.result);
  },
  async afterUpdate(event: any) {
    await maybeSendObituaryEmail(event.result);
  },
};
