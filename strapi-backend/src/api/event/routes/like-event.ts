// path: src/api/event/routes/custom-event.ts

export default {
  routes: [
    {
      method: 'POST',
      path: '/events/:slug/like',
      handler: 'event.likeEvent',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};