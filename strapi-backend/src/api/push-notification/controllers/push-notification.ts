export default {
  async create(ctx) {
    const { endpoint, keys } = ctx.request.body;

    const existing = await strapi.entityService.findMany('api::push-notification.push-notification', {
      filters: { endpoint },
    });

    if (existing.length === 0) {
      return await strapi.entityService.create('api::push-notification.push-notification', {
        data: {
          endpoint,
          p256dh: keys.p256dh,
          auth: keys.auth,
        },
      });
    }

    return { message: 'Subscription already exists' };
  },

  async check(ctx) {
    const { endpoint } = ctx.request.body;

    const existing = await strapi.entityService.findMany('api::push-notification.push-notification', {
      filters: { endpoint },
    });

    return { exists: existing.length > 0 };
  },
};