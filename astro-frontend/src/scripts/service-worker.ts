import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiPost } from "~/helpers/strapi-post";

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function registerPush() {
  if (!('serviceWorker' in navigator)) return;

  const sw = await navigator.serviceWorker.register('/sw.js');

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      import.meta.env.PUBLIC_VAPID_PUBLIC_KEY
    ),
  });

  console.log('Push subscription:', subscription);

  await strapiPost({
    endpoint: ROUTES.PUSH_NOTIFICATIONS,
    body: subscription,
  });
}
