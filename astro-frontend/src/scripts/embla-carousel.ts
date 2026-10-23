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

function setupNavigation(emblaApi: EmblaCarouselType, node: HTMLDivElement) {
  const prevButton = node.querySelector<HTMLButtonElement>(".embla__prev");
  const nextButton = node.querySelector<HTMLButtonElement>(".embla__next");

  const updateNavigation = () => {
    const canScrollPrev = emblaApi.canScrollPrev();
    const canScrollNext = emblaApi.canScrollNext();

    if (prevButton) prevButton.hidden = !canScrollPrev;
    if (nextButton) nextButton.hidden = !canScrollNext;

    if (node.dataset.centerWhenFits === "true") {
      emblaApi.containerNode().style.justifyContent =
        canScrollPrev || canScrollNext ? "" : "safe center";
    }
  };

  prevButton?.addEventListener("click", () => emblaApi.scrollPrev());
  nextButton?.addEventListener("click", () => emblaApi.scrollNext());
  emblaApi.on("select", updateNavigation).on("reInit", updateNavigation);
  updateNavigation();
}

export const emblaCarousel = async () => {
  const emblaNodes = document.querySelectorAll<HTMLDivElement>(".embla");

  for (const node of emblaNodes) {
    const align = node.getAttribute("data-align");
    const carouselType = node.getAttribute("data-carousel-type");
    const shouldLoop = node.getAttribute("data-should-loop") === "true";
    const shouldDragFreely = node.getAttribute("data-drag-freely") === "true";
    const autoScroll = node.getAttribute("data-auto-scroll") === "true";

    const carouselOptions: EmblaOptionsType = {
      align: align === "start" || align === "end" ? align : "center",
      loop: shouldLoop,
      dragFree: shouldDragFreely,
      watchDrag: (emblaApi) =>
        emblaApi.canScrollPrev() || emblaApi.canScrollNext(),
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

      setupNavigation(emblaApi, node);

      const removeTweenOpacity = setupTweenOpacity(emblaApi);
      emblaApi.on("destroy", removeTweenOpacity);
    } else {
      const WheelGesturesPlugin = await import("embla-carousel-wheel-gestures");
      const emblaApi = EmblaCarousel(node, carouselOptions, [
        WheelGesturesPlugin.WheelGesturesPlugin({}),
      ]);

      setupNavigation(emblaApi, node);
    }
  }
};
