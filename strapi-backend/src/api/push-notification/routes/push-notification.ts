module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/push-notifications',
      handler: 'push-notification.create',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/push-notifications/check',
      handler: 'push-notification.check',
      config: {
        policies: [],
        auth: false,
      },
    }
  ],
};
