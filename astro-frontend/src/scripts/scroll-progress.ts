export const scrollProgress = () => {
  function calculateScrollProgress() {
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const scrollPercent = (scrollTop / (docHeight - windowHeight)) * 100;
      const scrollProgress = Math.min(scrollPercent, 100);

      const progressBar = document.querySelector(
        ".scroll-progress-indicator",
      ) as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${scrollProgress}%`;
      }
    });
  }

  document.addEventListener("scroll", calculateScrollProgress);
  window.addEventListener("resize", calculateScrollProgress);

  calculateScrollProgress();
};
