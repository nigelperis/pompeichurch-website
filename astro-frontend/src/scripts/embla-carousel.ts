import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import EmblaCarousel from "embla-carousel";

function numberWithinRange(number: number, min: number, max: number): number {
  return Math.min(Math.max(number, min), max);
}

function setTweenFactor(emblaApi: EmblaCarouselType, base: number): number {
  return base * emblaApi.scrollSnapList().length;
}

function tweenOpacity(
  emblaApi: EmblaCarouselType,
  tweenFactor: number,
  eventName?: EmblaEventType,
): void {
  const engine = emblaApi.internalEngine();
  const scrollProgress = emblaApi.scrollProgress();
  const slidesInView = emblaApi.slidesInView();
  const isScrollEvent = eventName === "scroll";

  emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
    let diffToTarget = scrollSnap - scrollProgress;
    const slidesInSnap = engine.slideRegistry[snapIndex];

    slidesInSnap.forEach((slideIndex) => {
      if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();

          if (slideIndex === loopItem.index && target !== 0) {
            const sign = Math.sign(target);

            if (sign === -1) {
              diffToTarget = scrollSnap - (1 + scrollProgress);
            }
            if (sign === 1) {
              diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          }
        });
      }

      const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor);
      const opacity = numberWithinRange(tweenValue, 0.4, 1).toString();

      emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
    });
  });
}

export const setupTweenOpacity = (
  emblaApi: EmblaCarouselType,
): (() => void) => {
  const TWEEN_FACTOR_BASE = 0.84;
  const slideNodes = emblaApi.slideNodes();
  const tweenFactor = setTweenFactor(emblaApi, TWEEN_FACTOR_BASE);

  tweenOpacity(emblaApi, tweenFactor);

  emblaApi
    .on("reInit", () => tweenOpacity(emblaApi, tweenFactor))
    .on("scroll", () => tweenOpacity(emblaApi, tweenFactor, "scroll"))
    .on("slideFocus", () => tweenOpacity(emblaApi, tweenFactor, "slideFocus"));
  return (): void => {
    slideNodes.forEach((slide) => slide.removeAttribute("style"));
  };
};

export const emblaCarousel = async () => {
  const emblaNodes = document.querySelectorAll<HTMLDivElement>(".embla");

  for (const node of emblaNodes) {
    const carouselType = node.getAttribute("data-carousel-type");
    const shouldLoop = node.getAttribute("data-should-loop") === "true";
    const shouldDragFreely = node.getAttribute("data-drag-freely") === "true";
    const autoScroll = node.getAttribute("data-auto-scroll") === "true";

    const carouselOptions: EmblaOptionsType = {
      loop: shouldLoop,
      dragFree: shouldDragFreely,
    };

    const plugins = [];

    if (carouselType === "opacityTransition") {
      if (autoScroll) {
        const AutoPlay = await import("embla-carousel-autoplay");
        plugins.push(
          AutoPlay.default({
            delay: 3000,
            stopOnInteraction: false,
            jump: false,
          }),
        );
      }

      const WheelGesturesPlugin = await import("embla-carousel-wheel-gestures");
      plugins.push(WheelGesturesPlugin.WheelGesturesPlugin({}));

      const emblaApi = EmblaCarousel(node, carouselOptions, plugins);

      const prevButton = node.querySelector(".embla__prev");
      const nextButton = node.querySelector(".embla__next");

      if (prevButton) {
        prevButton.addEventListener("click", () => emblaApi.scrollPrev());
      }
      if (nextButton) {
        nextButton.addEventListener("click", () => emblaApi.scrollNext());
      }

      const removeTweenOpacity = setupTweenOpacity(emblaApi);
      emblaApi.on("destroy", removeTweenOpacity);
    } else {
      const WheelGesturesPlugin = await import("embla-carousel-wheel-gestures");
      const emblaApi = EmblaCarousel(node, carouselOptions, [
        WheelGesturesPlugin.WheelGesturesPlugin({}),
      ]);

      const prevButton = node.querySelector(".embla__prev");
      const nextButton = node.querySelector(".embla__next");

      if (prevButton) {
        prevButton.addEventListener("click", () => emblaApi.scrollPrev());
      }
      if (nextButton) {
        nextButton.addEventListener("click", () => emblaApi.scrollNext());
      }
    }
  }
};
