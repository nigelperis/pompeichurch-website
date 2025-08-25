import type { APIRoute } from "astro";
import { sendEmail } from "~/helpers/send-email";
import { RECIPIENT_EMAILS } from "~/constants/index";
import { getAchievementEmailHtml } from "~/helpers/get-achievement-email-html";
import { useTranslations } from "~/i18n/utils";
import { Locale } from "~/enums/locale";

/**
 * API route to handle submissions of achievements.
 * @remarks
 * This route accepts the following form data:
 * - `lang`: The language of the achievement submission.
 * - `full-name`: The name of the individual achiever.
 * - `team-name`: The name of the team.
 * - `achievement`: A short description of the achievement.
 * - `issue-date`: The date the achievement was issued in the format `dd/mm/yyyy`.
 * - `parents-names`: The names of the parents of the individual achiever.
 * - `team-members-names`: The names of the team members.
 * - `ward`: The ward of the achiever.
 * - `submitted-by`: The name of the person submitting the achievement.
 * - `proof-of-achievement`: A file containing proof of the achievement (required).
 * - `achiever-image`: A file containing a photo of the individual achiever (required).
 * - `additional-images`: Files containing additional photos of the achievement.
 * - `fax`: A hidden field to detect server-side spam.
 * @returns {Response} A response with a status code of 200 if the submission is successful, otherwise 400, 500, or 503.
 */

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    const lang = data.get("lang") as Locale;
    const t = useTranslations(lang);

    const fullName = data.get("full-name")?.toString().trim();
    const teamName = data.get("team-name")?.toString().trim();
    const achievement = data.get("achievement")?.toString().trim();
    const issueDate = data.get("issue-date")?.toString().trim();
    const parentsNames = data.get("parents-names")?.toString().trim();
    const teamMembersNames = data.get("team-members-names")?.toString().trim();
    const ward = data.get("ward-input")?.toString().trim();
    const submittedBy = data.get("submitted-by")?.toString().trim();
    const proofOfAchievement = data.get("proof-of-achievement") as File;
    const achieverImage = data.get("achiever-image") as File;
    const additionalImages = data.getAll("additional-images");

    const fax = data.get("fax");

    const attachments: {
      filename: string;
      content: Buffer;
      contentType: string;
    }[] = [];

    const name = fullName || teamName;
    const category = fullName ? "Individual Achievement" : "Team Achievement";

    // Server-side spam check
    if (fax && typeof fax === "string" && fax.trim() !== "") {
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
      return new Response("Missing required fields. Submission Failed", {
        status: 400,
      });
    }

    if (!parentsNames && !teamMembersNames) {
      return new Response(
        "Please provide either Parents' or Team Members' name.",
        {
          status: 400,
        },
      );
    }

    // Push files to attachments
    const attachAchieverImage = async () => {
      if (achieverImage) {
        const arrayBuffer = await achieverImage.arrayBuffer();
        attachments.push({
          filename: `achiever_image_${achieverImage.name}`,
          content: Buffer.from(arrayBuffer),
          contentType: achieverImage.type,
        });
      }
    };

    // Push proof of achievement file to attachment
    const attachProofOfAchievement = async () => {
      if (proofOfAchievement) {
        const arrayBuffer = await proofOfAchievement.arrayBuffer();
        attachments.push({
          filename: `proof_of_achievement_${proofOfAchievement.name}`,
          content: Buffer.from(arrayBuffer),
          contentType: proofOfAchievement.type,
        });
      }
    };

    // Push additional images to attachments
    const attachAdditionalImages = async () => {
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
    };

    // Parallelize file attachments
    try{
      await Promise.all([
        attachAchieverImage(),
        attachProofOfAchievement(),
        attachAdditionalImages(),
      ]);
    } catch(error){
      console.error("Attachment error:", error);
      return new Response("Failed to attach files", {
        status: 500,
      });
    }

    const body = getAchievementEmailHtml({
      lang,
      category,
      fullName,
      teamName,
      ward,
      parentsNames,
      teamMembersNames,
      issueDate,
      achievement,
      submittedBy,
    });

    const subject = `🏅${t("achievement.title")}: ${name}`;
    const html = body;
    const to = RECIPIENT_EMAILS;

    const res = await sendEmail({
      subject: subject,
      html: html,
      to: to,
      attachments: attachments,
    });

    if(res?.ok){
      return new Response("Achievement data sent successfully", {
        status: 200,
      });
    } else {
      return new Response("Failed to send achievement data", {
        status: 503,
      });
    }
  } catch (error) {
    console.error("Error sending achievement data:", error);
    return new Response("Failed to send achievement data", {
      status: 500,
    });
  }
};
