export default {
  '0 1 * * *': async ({ strapi }) => {
    const today = new Date().toISOString().split('T')[0];

    const events = await strapi.entityService.findMany('api::upcoming-event.upcoming-event', {
      filters: {
        eventDate: { $lt: today },
      },
      fields: ['id'],
    });

    for (const event of events) {
      await strapi.entityService.update('api::upcoming-event.upcoming-event', event.id, {
        data: { publishedAt: null },
      });
    }

    console.log(`✅ Unpublished ${events.length} past events`);
  },
};




