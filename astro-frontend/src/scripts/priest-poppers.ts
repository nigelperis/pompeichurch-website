// import { confetti } from "@tsparticles/confetti";

// export const message = () => {
//   const section = document.getElementById("parish-priest-speaks");
//   const lang = section?.getAttribute("data-lang");

//   setTimeout(() => {
//     const message = document.getElementById('message-section');
//     if (!message) return;

//     message.innerText = lang == 'kok' ? "ಭಾಂಗ್ರಾಳ್ಯಾ ಜಲ್ಮಾ ದಿಸಾಚೆ ಆನಿ 21 ವ್ಯಾ ಯಾಜಕೀ ದೀಕ್ಷೆಚೆ ರಾಸ್ ರಾಸ್ ಉಲ್ಲಾಸ್, ತುಮ್ಕಾಂ ವಿಗಾರ್ ಬಾಪಾನೊ 🎉🎂" : "Happy 50th Birthday and 21st Priestly Ordination, Dear Father! 🎉🎂";
//     message.className = "bg-[#e74141] font-noto-sans-kannada rounded-xl my-3 text-center text-[#ffd700] p-3 text-2xl md:text-4xl font-bold scale-95 opacity-100 transform transition-all duration-900 ease-out";

//     setTimeout(() => {
//       message.className = "bg-[#e74141] font-noto-sans-kannada rounded-xl my-3 text-center text-[#ffd700] p-3 text-2xl md:text-3xl font-bold scale-100 opacity-100 transform transition-all duration-900 ease-out";
//     }, 50);

//     setTimeout(() => {
//       message.className = "bg-[#e74141] font-noto-sans-kannada rounded-xl my-3 text-center text-[#ffd700] p-3 text-2xl md:text-3xl font-bold opacity-0 scale-95 transform transition-all duration-900 ease-out";

//       setTimeout(() => {
//         message.style.display = "none";
//         message.innerText = "";
//       }, 700);
//     }, 8000);

//   }, 1000);
// }

// export const triggerPoppers = () => {
//   const section = document.getElementById("parish-priest-speaks");
//   if (!section) return;

//   const duration = 5 * 1000;
//   const animationEnd = Date.now() + duration;
//   const defaults = {
//     startVelocity: 20,
//     spread: 120,
//     ticks: 60,
//     zIndex: 1000,
//   };

//   const interval = setInterval(() => {
//     const timeLeft = animationEnd - Date.now();

//     if (timeLeft <= 0) {
//       clearInterval(interval);

//       setTimeout(() => {
//         document.querySelectorAll("canvas").forEach((canvas) => {
//           if (canvas.style.zIndex === "1000") {
//             canvas.remove();
//           }
//         });
//       }, 500);

//       return;
//     }

//     const bounds = section.getBoundingClientRect();
//     if (bounds.top < window.innerHeight && bounds.bottom > 0) {
//       confetti({
//         ...defaults,
//         particleCount: 3,
//         angle: 60,
//         origin: {
//           x: 0.2,
//           y: Math.random() * 0.4 + 0.3,
//         },
//         colors: ["#e74141", "#ffd700"],
//       });

//       confetti({
//         ...defaults,
//         particleCount: 3,
//         angle: 120,
//         origin: {
//           x: 0.8,
//           y: Math.random() * 0.4 + 0.3,
//         },
//         colors: ["#e74141", "#ffd700"],
//       });

//       document.querySelectorAll("canvas").forEach((canvas) => {
//         if (canvas.style.zIndex === "1000") {
//           canvas.style.pointerEvents = "none";
//         }
//       });
//     } else {
//       clearInterval(interval);
//     }
//   }, 300);
// };

// window.addEventListener("DOMContentLoaded", () => {
//   const section = document.getElementById("parish-priest-speaks");
//   if (!section) return;

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           triggerPoppers();
//           message();
//         }
//       });
//     },
//     { threshold: 0.6 }
//   );

//   observer.observe(section);
// });