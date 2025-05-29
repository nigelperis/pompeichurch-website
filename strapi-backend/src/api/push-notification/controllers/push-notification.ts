module.exports = {
  async create(ctx) {
    const { endpoint, keys } = ctx.request.body;

    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return ctx.badRequest("Missing subscription data");
    }

    const entry = await strapi.entityService.create('api::push-notification.push-notification', {
      data: {
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
    });

    ctx.send(entry);
  }
};