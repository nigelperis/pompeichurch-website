import { confetti } from "@tsparticles/confetti";

export const triggerPoppers = () => {
  const section = document.getElementById("parish-priest-speaks");
  if (!section) return;

  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 20,
    spread: 120,
    ticks: 60,
    zIndex: 1000,
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const bounds = section.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      confetti({
        ...defaults,
        particleCount: 3,
        angle: 60,
        origin: {
          x: 0.2,
          y: Math.random() * 0.4 + 0.3,
        },
      });

      confetti({
        ...defaults,
        particleCount: 3,
        angle: 120,
        origin: {
          x: 0.8,
          y: Math.random() * 0.4 + 0.3,
        },
      });
    } else {
      clearInterval(interval);
    }
  }, 300);
};

window.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("parish-priest-speaks");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerPoppers();
        }
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(section);
});