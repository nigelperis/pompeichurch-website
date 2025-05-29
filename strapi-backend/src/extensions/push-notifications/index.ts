import webPush from 'web-push';

export default ({ strapi }) => {
  const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
  };

  webPush.setVapidDetails(
    process.env.VAPID_EMAIL,
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  return {
    async sendNotification(payload) {
      const subscriptions = await strapi.entityService.findMany(
        'api::push-subscription.push-subscription'
      );

      const sendToAll = subscriptions.map(async (sub) => {
        const pushConfig = {
          endpoint: sub.endpoint,
          keys: {
            auth: sub.keys.auth,
            p256dh: sub.keys.p256dh,
          },
        };
        try {
          await webPush.sendNotification(pushConfig, JSON.stringify(payload));
        } catch (err) {
          console.error('Push failed:', err);
        }
      });

      await Promise.all(sendToAll);
    },
  };
};
