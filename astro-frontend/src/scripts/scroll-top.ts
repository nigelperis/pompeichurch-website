export function scrollToTopInit() {
  const btn = document.getElementById("scrollToTopBtn");
  const ring = document.querySelector(".progress-ring") as SVGCircleElement | null;
  const r = 26;
  const circumference = 2 * Math.PI * r;

  function updateProgress() {
    if (!ring || !btn) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    ring.style.strokeDashoffset = `${circumference - progress * circumference}`;


    if (scrollTop > 120) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", updateProgress);
  window.addEventListener("resize", updateProgress);

  if (btn) {
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  updateProgress();
}
