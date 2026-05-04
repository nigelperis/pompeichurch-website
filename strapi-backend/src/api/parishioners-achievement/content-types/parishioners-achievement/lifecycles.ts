import { SITE_URL } from "../../../../constants";
import { sendEmail } from "../../../../utils/send-email";
import { sendPushNotification } from "../../../../utils/send-push-notifications";

const STRAPI_URL = process.env.STRAPI_URL || "https://strapi.pompeichurch.in";

async function maybeSendAchievementNotification(result: any) {
  if (!result.publishedAt) return;

  const achievementLink = `${SITE_URL}/parishioners-achievements/${result.slug}`;

  const achievementImage = result.achieverImage?.url
    ? new URL(result.achieverImage.url, STRAPI_URL).toString()
    : null;

  const { englishName, konkaniName, enAchievement, kokAchievement } = result;

  const publisher = result.updatedBy || result.createdBy || null;
  const publisherName = publisher
    ? `${publisher.firstname || publisher.firstName || ""} ${
        publisher.lastname || publisher.lastName || ""
      }`.trim()
    : "Unknown";

  const subject = `🏆 New Achievement Published: ${englishName}`;
  const html = `
    <h2>New Parishioner Achievement Published</h2>
    <ul>
      <li><strong>English Name:</strong> ${englishName}</li>
      <li><strong>Konkani Name:</strong> ${konkaniName}</li>
      <li><strong>English Achievement:</strong> ${enAchievement || "N/A"}</li>
      <li><strong> Konkani Achievement:</strong> ${kokAchievement || "N/A"}</li>
      <li><strong>View Achievement:</strong> <a href="${achievementLink}">${achievementLink}</a></li>
    </ul>
    <p><strong>Published By:</strong> ${publisherName}</p>
  `;

  await sendEmail({ subject, html });

  await sendPushNotification(strapi, {
    title: "🏆 New Achievement Added",
    body: konkaniName,
    icon: "/church-logo.webp",
    image: achievementImage,
    data: {
      url: achievementLink,
    },
  });
}

export default {
  async afterCreate(event: any) {
    await maybeSendAchievementNotification(event.result);
  },
  async afterUpdate(event: any) {
    await maybeSendAchievementNotification(event.result);
  },
};
