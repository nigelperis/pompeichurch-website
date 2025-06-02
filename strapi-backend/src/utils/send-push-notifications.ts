import webPush from 'web-push';

webPush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendPushNotification(strapi: any, payload: any) {
  if (process.env.NOTIFY_PUSH !== 'true') {
    return;
  }

  const subs = await strapi.entityService.findMany('api::push-notification.push-notification');

  const sendAll = subs.map((sub: any) => {
    const subscription = {
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.p256dh,
        auth: sub.auth,
      },
    };

    return webPush.sendNotification(subscription, JSON.stringify(payload)).catch((err) => {
      console.error('Error sending push notification:', err.message);

      if (err.statusCode === 410 || err.statusCode === 404) {
        return strapi.entityService.delete('api::push-notification.push-notification', sub.id);
      }

      return Promise.resolve();
    });
  });

  await Promise.all(sendAll);
}
