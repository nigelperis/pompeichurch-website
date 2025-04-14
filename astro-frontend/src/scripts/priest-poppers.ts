import { confetti } from "@tsparticles/confetti";

export const message = (lang: string) => {
  setTimeout(() => {
    const message = document.getElementById('message-section');
    if (!message) return;

    message.innerText = lang == 'kok' ? "ಭಾಂಗ್ರಾಳ್ಯಾ ಜಲ್ಮಾ ದಿಸಾಚೆ ರಾಸ್ ರಾಸ್ ಉಲ್ಲಾಸ್, ತುಮ್ಕಾಂ ವಿಗಾರ್ ಬಾಪಾನೊ 🎉🎂" : "Happy 50th Birthday, Dear Father! 🎉🎂";
    message.style.fontFamily = lang == 'kok' ? "noto-sans-kannada" : "monospace";
    message.className = "bg-[#e74141] rounded-xl my-3 text-center text-[#ffd700] p-3 text-2xl md:text-4xl font-bold scale-95 opacity-100 transform transition-all duration-900 ease-out";

    setTimeout(() => {
      message.style.fontFamily = lang == 'kok' ? "noto-sans-kannada" : "monospace";
      message.className = "bg-[#e74141] rounded-xl my-3 text-center text-[#ffd700] p-3 text-2xl md:text-4xl font-bold scale-100 opacity-100 transform transition-all duration-900 ease-out";
    }, 50);

    setTimeout(() => {
      message.style.fontFamily = lang == 'kok' ? "noto-sans-kannada" : "monospace";
      message.className = "bg-[#e74141] rounded-xl my-3 text-center text-[#ffd700] p-3 text-2xl md:text-4xl font-bold opacity-0 scale-95 transform transition-all duration-900 ease-out";

      setTimeout(() => {
        message.style.display = "none";
        message.innerText = "";
      }, 700);
    }, 8000);

  }, 1000);
}

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
      clearInterval(interval);

      setTimeout(() => {
        document.querySelectorAll("canvas").forEach((canvas) => {
          if (canvas.style.zIndex === "1000") {
            canvas.remove();
          }
        });
      }, 500);

      return;
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
        colors: ["#e74141", "#ffd700"],
      });

      confetti({
        ...defaults,
        particleCount: 3,
        angle: 120,
        origin: {
          x: 0.8,
          y: Math.random() * 0.4 + 0.3,
        },
        colors: ["#e74141", "#ffd700"],
      });

      document.querySelectorAll("canvas").forEach((canvas) => {
        if (canvas.style.zIndex === "1000") {
          canvas.style.pointerEvents = "none";
        }
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
          message(lang);
        }
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(section);
});