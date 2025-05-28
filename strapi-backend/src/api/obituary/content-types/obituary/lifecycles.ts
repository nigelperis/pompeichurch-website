import { sendEmail } from "../../../../utils/send-email";

async function maybeSendObituaryEmail(result: any) {
  if (!result.publishedAt) return;

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
