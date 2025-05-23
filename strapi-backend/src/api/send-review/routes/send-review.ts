export default {
  routes: [
    {
      method: 'POST',
      path: '/send-review',
      handler: 'send-review.send',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
