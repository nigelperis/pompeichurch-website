import { Resend } from "resend";
import { ADMIN_EMAIL, RECEPIENT_EMAILS } from "~/constants/constants";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendEmail({
  subject,
  html,
  to = RECEPIENT_EMAILS,
  attachments = [],
}: {
  subject: string;
  html: string;
  to: string[];
  attachments?: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[];
}) {
  try {
    if (import.meta.env.PUBLIC_ENVIRONMENT === "development") {
      console.info("[DEV MODE] Skipped sending email");
      return;
    }

    const res = await resend.emails.send({
      from: `Pompei Church <${ADMIN_EMAIL}>`,
      to,
      subject,
      html,
      attachments: attachments.map((file) => ({
        filename: file.filename,
        content: file.content.toString("base64"),
        type: file.contentType,
        disposition: "attachment",
      })),
    });

    if (res.error) {
      console.error("Resend Email Error:", res.error);
    } else {
      console.log("Email sent successfully:", res.data);
    }
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}
