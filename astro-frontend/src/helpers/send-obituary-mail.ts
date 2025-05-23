import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiPost } from "~/helpers/strapi-post.ts";

export async function sendReviewWithAttachment(formData: FormData | undefined) {
  if (!formData) throw new Error("Form data is required");
  return await strapiPost({
    endpoint: ROUTES.SEND_REVIEW,
    body: formData,
  });
}