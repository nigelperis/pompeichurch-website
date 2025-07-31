import type { APIRoute } from "astro";
import { sendAchievementEmail } from "~/scripts/send-achievement-email";
import { RECEPIENT_EMAILS } from "~/constants/constants";

/**
 * Handles POST requests to send achievement data via email.
 *
 * The function retrieves form data from the request, including details about
 * the achiever, achievement, and additional images. It constructs an email
 * with this information and sends it to a predefined list of recipients.
 *
 * Form fields processed:
 * - full-name: Name of the achiever or team
 * - achievement: Description of the achievement
 * - issue-date: Date of the achievement
 * - parents-name: Names of parents or team members
 * - ward-input: Ward information
 * - submitted-by: Name of the person submitting the form
 * - proof-of-achievement: File containing proof of achievement
 * - achiever-image: Image of the achiever
 * - additional-images: Additional images related to the achievement
 *
 * A honeypot field is used to detect spam submissions.
 *
 * Attachments are prepared and converted to base64 before sending.
 *
 * If any error occurs during the process, a 500 response is returned.
 * Otherwise, a 200 response is returned upon successful email dispatch.
 */

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    const name = data.get("full-name");
    const achievement = data.get("achievement");
    const issueDate = data.get("issue-date");
    const parentsName = data.get("parents-name");
    const ward = data.get("ward-input");
    const submittedBy = data.get("submitted-by");
    const proofOfAchievement = data.get("proof-of-achievement") as File;
    const achieverImage = data.get("achiever-image") as File;
    const additionalImages = data.getAll("additional-images");

    const honeypot = data.get("honeypot");

    const attachments: {
      filename: string;
      content: Buffer;
      contentType: string;
    }[] = [];

    // Server-side spam check
    if (honeypot && typeof honeypot === "string" && honeypot.trim() !== "") {
      return new Response("Server Side Spam Triggered", { status: 400 });
    }

    // Push files to attachments
    if (achieverImage) {
      const arrayBuffer = await achieverImage.arrayBuffer();
      attachments.push({
        filename: achieverImage.name,
        content: Buffer.from(arrayBuffer),
        contentType: achieverImage.type,
      });
    }

    // Push proof of achievement file to attachment
    if (proofOfAchievement) {
      const arrayBuffer = await proofOfAchievement.arrayBuffer();
      attachments.push({
        filename: proofOfAchievement.name,
        content: Buffer.from(arrayBuffer),
        contentType: proofOfAchievement.type,
      });
    }

    // Push additional images to attachments
      for (const entry of additionalImages) {
        if (entry instanceof File && entry.size > 0) {
          const arrayBuffer = await entry.arrayBuffer();
          attachments.push({
            filename: entry.name,
            content: Buffer.from(arrayBuffer),
            contentType: entry.type,
          });
        }
      }

    const subject = `🏅New Parishioners Achievement Submitted: ${name}`;
    const html = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Achievement:</strong> ${achievement}</p>
      <p><strong>Issue Date:</strong> ${issueDate}</p>
      <p><strong>Parents' / Team Members Names:</strong> ${parentsName}</p>
      <p><strong>Ward:</strong> ${ward}</p>
      <p><strong>Submitted By:</strong> ${submittedBy}</p>
    `;
    const to = RECEPIENT_EMAILS;

    await sendAchievementEmail({
      subject: subject,
      html: html,
      to: to,
      attachments: attachments,
    });

    return new Response("Achievement data sent successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to send achievement data", {
      status: 500,
    });
  }
};
