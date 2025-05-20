export const scrollToTop = () => {
  document.querySelector("#scrollToTop")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const ring = document.querySelector(".progress-ring") as SVGElement | null;
  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  if (ring) {
    ring.style.strokeDasharray = `${circumference}`;
    ring.style.strokeDashoffset = `${circumference}`;

    window.addEventListener("scroll", () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = scrollTop / scrollHeight;
      const offset = circumference - progress * circumference;
      ring.style.strokeDashoffset = `${offset}`;
    });
  }
};
