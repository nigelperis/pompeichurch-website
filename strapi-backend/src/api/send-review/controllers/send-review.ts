import { Resend } from 'resend';
import fs from 'fs/promises';
import { ADMIN_EMAIL, RECEPIENT_EMAILS } from '../../../constants';

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  async send(ctx) {
    const {
      englishName,
      konkaniName,
      age,
      ward,
      dateOfDeath,
      relationType,
      relNameEn,
      relNameKok,
      senderName,
    } = ctx.request.body;
    try {
      const file = ctx.request.files?.imageFile;

      if (!file) {
        console.error('No file found in the request');
      }

      const fileBuffer = await fs.readFile(file.filepath);

      const res = await resend.emails.send({
        from: `Submission <${ADMIN_EMAIL}>`,
        to: RECEPIENT_EMAILS,
        subject: 'New Obituary Form Submitted',
        html: `
          <h3>New Obituary Submission</h3>
          <ul>
            <li><strong>Full Name (English):</strong> ${englishName}</li>
            <li><strong>Full Name (ಕೊಂಕ್ಣಿ):</strong> ${konkaniName}</li>
            <li><strong>Age:</strong> ${age}</li>
            <li><strong>Ward:</strong> ${ward}</li>
            <li><strong>Date of Death:</strong> ${dateOfDeath}</li>
            <li><strong>Relation Name (English):</strong> ${relationType}: ${relNameEn}</li>
            <li><strong>Relation Name (ಕೊಂಕ್ಣಿ):</strong> ${relationType}: ${relNameKok}</li>
            <li><strong>Submitted by:</strong> ${senderName}</li>
          </ul>`,
        attachments: [
          {
            filename: file.originalFilename,
            content: fileBuffer.toString('base64'),
            contentType: file.mimeType,
          },
        ],
      });

      if (res.error) {
        console.error('Email sending failed:', res.error);
        return ctx.send(
          {
            success: false,
            error: res.error,
          },
          500
        );
      }

      console.log('Email sent successfully:', res.data);

      ctx.send({ success: true });
    } catch (error) {
      console.error('Email sending failed:', error);
      ctx.send({ error: 'Mail failed', details: error }, 500);
    }
  }
};
