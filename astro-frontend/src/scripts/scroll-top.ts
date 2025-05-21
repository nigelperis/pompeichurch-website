export default function initScrollToTop() {
  const btn = document.getElementById('scrollToTop');
  const ring = document.getElementById('progressRing') as SVGCircleElement | null;
  const circ = 2 * Math.PI * 28; // r=28

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - windowHeight);
    const offset = circ - scrollPercent * circ;
    if (ring) {
      ring.style.strokeDashoffset = `${offset}`;
    }
    if (btn) {
      if (scrollTop > 120) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
