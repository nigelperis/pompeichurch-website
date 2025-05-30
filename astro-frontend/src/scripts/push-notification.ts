import { registerPush } from "./service-worker";

export const pushNotification = () => {
  const prompt = document.getElementById("notification-prompt");
  const enableBtn = document.getElementById("enable-notifications");
  const dismissBtn = document.getElementById("dismiss-notifications");
  const eventsSection = document.getElementById("events");

  if (!prompt || !enableBtn || !dismissBtn || !eventsSection) return;

  const deferredUntil = parseInt(localStorage.getItem("notificationPromptDeferredUntil") || "0", 10);
  const now = Date.now();
  let promptShown = false;

  // Function to show prompt with animation
  const showPrompt = () => {
    prompt.classList.remove("hidden");
    // Trigger reflow to ensure the element is rendered
    prompt.offsetHeight;
    prompt.classList.add("slide-in");
  };

  // Function to hide prompt with animation
  const hidePrompt = () => {
    prompt.classList.add("slide-out");
    // Wait for animation to complete before hiding
    setTimeout(() => {
      prompt.classList.add("hidden");
      prompt.classList.remove("slide-in", "slide-out");
    }, 500);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        entry.intersectionRatio >= 0.3 &&
        !promptShown &&
        now >= deferredUntil
      ) {
        console.log("Events section visible – showing notification prompt");
        showPrompt();
        promptShown = true;
        observer.disconnect();
      }
    });
  }, {
    threshold: [0.3],
    rootMargin: '-20% 0px -20% 0px'
  });

  observer.observe(eventsSection);

  enableBtn.addEventListener("click", async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      registerPush();
      alert("Thanks for enabling notifications!");
      hidePrompt();
    } else {
      alert("Notifications permission denied.");
    }
  });

  dismissBtn.addEventListener("click", () => {
    const nextPromptTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // 2 days
    localStorage.setItem("notificationPromptDeferredUntil", nextPromptTime.toString());
    hidePrompt();
  });
}