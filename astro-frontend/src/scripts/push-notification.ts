import { strapiPost } from "~/helpers/strapi-post";
import { registerPush } from "./service-worker";
import { ROUTES } from "~/constants/strapi-endpoints";

interface SubscriptionCheckResponse {
  exists: boolean;
}

type Options = {
  targetId: string;
};

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

/**
 * Wait until the element with `targetId` is ≥30% visible, then run the same
 * permission/deferred/backend checks & show/hide the prompt.
 */
export const pushNotification = async (opts: Options): Promise<void> => {
  const { targetId } = opts;
  const prompt = document.getElementById("notification-prompt");
  const enableBtn = document.getElementById("enable-notifications");
  const dismissBtn = document.getElementById("dismiss-notifications");
  if (!prompt || !enableBtn || !dismissBtn) {
    return; // no prompt or buttons on this page
  }

  // 1. Early exit if Notification already granted + backend subscription exists
  if (Notification.permission === "granted") {
    const hasActiveSub = await checkBackendSubscription();
    if (hasActiveSub) {
      return; // nothing to do—fully set up
    }
    console.log(
      "Notification granted but backend subscription missing → will show prompt when target appears",
    );
  }

  // 2. Check if user deferred less than 2 days ago
  const deferredUntil = parseInt(
    localStorage.getItem("notificationPromptDeferredUntil") || "0",
    10,
  );
  const now = Date.now();
  if (now < deferredUntil) {
    return; // too soon to re-show
  }

  // 3. Find the target element
  const targetEl = document.getElementById(targetId);
  if (!targetEl) {
    console.warn(`pushNotification: no element with id="${targetId}"`);
    return;
  }

  // 4. Set up IntersectionObserver
  let promptShown = false;
  const observer = new IntersectionObserver(
    async (entries) => {
      for (const entry of entries) {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.3 &&
          !promptShown
        ) {
          // Show the prompt (same animation logic)
          prompt.classList.remove("hidden");
          void prompt.offsetHeight; // force reflow
          prompt.classList.add("slide-in");
          promptShown = true;
          observer.disconnect();

          // Now attach click handlers:
          enableBtn.addEventListener("click", async () => {
            if (!("Notification" in window)) {
              alert("This browser does not support desktop notifications.");
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
        }
      }
    },
    {
      threshold: [0.3],
      rootMargin: "-20% 0px -20% 0px",
    },
  );

  observer.observe(targetEl);

  const hidePrompt = () => {
    prompt.classList.add("slide-out");
    setTimeout(() => {
      prompt.classList.add("hidden");
      prompt.classList.remove("slide-in", "slide-out");
    }, 500);
  };
};
