const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
  async likeEvent(ctx) {
    const { slug } = ctx.params;

    try {
      const event = await strapi.db.query('api::event.event').findOne({
        where: { slug },
      });

      if (!event) {
        return ctx.notFound('Event not found');
      }

      const updatedEvent = await strapi.entityService.update('api::event.event', event.id, {
        data: {
          likes: (event.likes || 0) + 1
        }
      });

      return updatedEvent;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));
