import { strapiPost } from "~/helpers/strapi-post";
import { registerPush } from "./service-worker";
import { ROUTES } from "~/constants/strapi-endpoints";

interface SubscriptionCheckResponse {
  exists: boolean;
}

const checkBackendSubscription = async (): Promise<boolean> => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (!subscription) return false;

    const response = await strapiPost<SubscriptionCheckResponse>({
      endpoint: ROUTES.PUSH_NOTIFICATIONS_CHECK,
      body: { endpoint: subscription.endpoint },
    });

    return response?.exists ?? false;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
};

export const pushNotification = async (): Promise<void> => {
  const prompt = document.getElementById("notification-prompt");
  const enableBtn = document.getElementById("enable-notifications");
  const dismissBtn = document.getElementById("dismiss-notifications");
  if (!prompt || !enableBtn || !dismissBtn) {
    return;
  }

  setTimeout(async () => {
    if (Notification.permission === "granted") {
      const hasActiveSubscription = await checkBackendSubscription();
      if (hasActiveSubscription) {
        return;
      }
      console.log(
        "Permission granted but no backend subscription found - showing prompt",
      );
    }

    const deferredUntil = parseInt(
      localStorage.getItem("notificationPromptDeferredUntil") || "0",
      10,
    );
    const now = Date.now();
    if (now < deferredUntil) {
      return;
    }

    const showPrompt = () => {
      prompt.classList.remove("hidden");
      void prompt.offsetHeight;
      prompt.classList.add("slide-in");
    };

    const hidePrompt = () => {
      prompt.classList.add("slide-out");
      setTimeout(() => {
        prompt.classList.add("hidden");
        prompt.classList.remove("slide-in", "slide-out");
      }, 500);
    };

    showPrompt();
    enableBtn.addEventListener("click", async () => {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification.");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        await registerPush();
        alert("Thanks for enabling notifications!");
        hidePrompt();
      } else {
        alert("Notifications permission denied.");
      }
    });

    dismissBtn.addEventListener("click", () => {
      const nextPromptTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // 2 days
      localStorage.setItem(
        "notificationPromptDeferredUntil",
        nextPromptTime.toString(),
      );
      hidePrompt();
    });
  }, 3000);
};
