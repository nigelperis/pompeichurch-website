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
    }
  ],
};
