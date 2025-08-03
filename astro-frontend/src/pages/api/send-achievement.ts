import type { APIRoute } from "astro";
import { sendEmail } from "~/helpers/send-email";
import { RECEPIENT_EMAILS } from "~/constants/constants";

/**
 * Handles the POST request to submit achievement data.
 * Extracts form data including personal and achievement details,
 * performs server-side spam checks, and processes file attachments.
 * Sends an email with the achievement details and attachments.
 *
 * @param {Object} request - The incoming HTTP request containing form data.
 *
 * @returns {Response} - The HTTP response indicating success or failure.
 *
 * Form Data Fields:
 * - full-name: The name of the achiever or team.
 * - achievement: Description of the achievement.
 * - issue-date: Date when the achievement was issued.
 * - parents-names: Names of the parents if applicable.
 * - team-members-names: Names of team members if applicable.
 * - ward-input: Ward information, optional for teams.
 * - submitted-by: Name of the person submitting the achievement.
 * - achiever-image: File representing the achiever's image.
 * - proof-of-achievement: File as proof of the achievement.
 * - additional-images: Any additional images related to the achievement.
 * - honeypot: A hidden field used for spam detection.
 */

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    const name = data.get("full-name")?.toString().trim();
    const achievement = data.get("achievement")?.toString().trim();
    const issueDate = data.get("issue-date")?.toString().trim();
    const parentsNames = data.get("parents-names")?.toString().trim();
    const teamMembersNames = data.get("team-members-names")?.toString().trim();
    const ward = data.get("ward-input")?.toString().trim();
    const submittedBy = data.get("submitted-by")?.toString().trim();
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
      console.error("Bots spammed the form.");
      return new Response("Server Side spam triggered. Submission Failed", { status: 400 });
    }

    // Required fields Validation
    if (
      !name ||
      !achievement ||
      !achieverImage ||
      !issueDate ||
      !submittedBy ||
      !proofOfAchievement
    ) {
      console.error("Missing required fields.");
      return new Response("Missing required fields. Submission Failed", {
        status: 400,
      });
    }

    if (!parentsNames && !teamMembersNames) {
      console.error("Either parents or team members name is required.");
      return new Response(
        "Please provide either Parents' or Team Members' name.",
        {
          status: 400,
        },
      );
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

    const subject = `🏅New Achievement Submitted: ${name}`;
    const html = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Parents' Names:</strong> ${parentsNames}</p>
      <p><strong>Team Members' Names:</strong> ${teamMembersNames}</p>
      <p><strong>Ward:</strong> ${ward}</p>
      <p><strong>Achievement:</strong> ${achievement}</p>
      <p><strong>Issue Date (dd/mm/yyyy):</strong> ${issueDate}</p>
      <p><strong>Submitted By:</strong> ${submittedBy}</p>
    `;
    const to = RECEPIENT_EMAILS;

    await sendEmail({
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
    console.error("Error sending achievement data:", error);
  }
};
