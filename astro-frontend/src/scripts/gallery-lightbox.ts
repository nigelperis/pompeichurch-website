import Masonry from "masonry-layout";
import "photoswipe/style.css";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import imagesLoaded from "imagesloaded";

const masonryGrid = document.querySelector<HTMLDivElement>(".masonry-grid")!;

let masonryInstance: Masonry;

export const masonry = () => {
  masonryInstance = new Masonry(masonryGrid, {
    itemSelector: ".masonry-grid-item",
    resize: true,
    percentPosition: true,
    transitionDuration: 300,
  });

  (window as any).masonryInstance = masonryInstance;

  imagesLoaded(masonryGrid).on("progress", () => {
    masonryInstance?.layout?.();
  });

  const lightbox = new PhotoSwipeLightbox({
    mainClass: "pswp--custom-icon-colors",
    gallery: ".masonry-grid",
    children: "a",
    pswpModule: () => import("photoswipe"),
  });

  lightbox.init();
};
