/**
 * obituary controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::obituary.obituary",
  ({ strapi }) => ({
    async create(ctx) {
      let website = "";
      if (ctx.is("multipart")) {
        website = ctx.request.body.fields?.website || "";
      } else {
        website = ctx.request.body.website || "";
      }

      // Honeypot logic
      if (website && website.trim() !== "") {
        return ctx.badRequest("Spam detected.");
      }
      return await super.create(ctx);
    },
  })
);
