export default (config: any, { strapi }: { strapi: any }) => {
  return async (ctx: any, next: () => Promise<any>) => {
    let website = "";
    if (ctx.is("multipart")) {
      website = ctx.request.body.fields?.website || "";
    } else {
      website = ctx.request.body.website || "";
    }

    if (website && website.trim() !== "") {
      ctx.throw(400, "Spam detected.");
    }

    await next();
  };
};
