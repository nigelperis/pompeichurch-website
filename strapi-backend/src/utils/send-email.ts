import { Resend } from "resend";
import { ADMIN_EMAIL, RECIPIENT_EMAILS } from "../constants";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend
 * @param options.subject - Email subject
 * @param options.html - HTML body content
 * @param options.to - Array of recipients (optional)
 */
export async function sendEmail({
  subject,
  html,
  to = RECIPIENT_EMAILS,
}: {
  subject: string;
  html: string;
  to?: string[];
}) {
  try {
    if (process.env.NODE_ENV === "development") {
      console.info("[DEV MODE] Skipped sending email");
      return;
    }

    const res = await resend.emails.send({
      from: `Pompei Church <${ADMIN_EMAIL}>`,
      to,
      subject,
      html,
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
