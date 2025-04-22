import "photoswipe/style.css";
import PhotoSwipeLightbox from "photoswipe/lightbox";

export const upcomingEventsLightbox = () => {
  const lightbox = new PhotoSwipeLightbox({
    mainClass: "pswp--custom-icon-colors",
    gallery: ".event-gallery",
    children: "a",
    pswpModule: () => import("photoswipe"),
  });

  lightbox.init();

  document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a[href="#upcoming-events"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();

        const anchorElement = e.currentTarget as HTMLAnchorElement;
        const href = anchorElement.getAttribute('href');
        if (!href) return;

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });


          history.pushState(null, '', `#${targetId}`);
        }
      });
    });

    if (window.location.hash === '#upcoming-events') {
      setTimeout(() => {
        const targetElement = document.getElementById('upcoming-events');
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  });
}