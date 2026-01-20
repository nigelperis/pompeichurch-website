import "photoswipe/style.css";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { cn } from "~/helpers/cn";

interface CarouselSlide {
  id: number;
  title: string;
  image: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface HomepageCarouselProps {
  slides: CarouselSlide[];
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

export const HomepageCarousel: React.FC<HomepageCarouselProps> = ({
  slides,
  autoplay = false,
  autoplayDelay = 4000,
  className,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
    },
    [WheelGesturesPlugin()],
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    setIsReady(true);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !autoplay) return;
    const interval = setInterval(() => emblaApi.scrollNext(), autoplayDelay);
    return () => clearInterval(interval);
  }, [emblaApi, autoplay, autoplayDelay]);

  useEffect(() => {
    let lightbox: any;

    const init = async () => {
      const PhotoSwipeLightbox = (await import("photoswipe/lightbox")).default;

      lightbox = new PhotoSwipeLightbox({
        gallery: ".homepage-carousel-lightbox",
        children: "a",
        mainClass: "pswp--custom-icon-colors",
        pswpModule: () => import("photoswipe"),
      });

      lightbox.init();
    };

    init();

    return () => lightbox && lightbox.destroy();
  }, []);

  if (!slides.length) return null;

  return (
    <div
      className={cn(
        "relative w-full mx-auto homepage-carousel-lightbox",
        className,
      )}
    >
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* 👇 THIS LINE FIXES THE LEFT OFFSET */}
        <div className="flex pl-[10%] md:pl-[16.666667%]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-[0_0_80%] md:flex-[0_0_66.666667%] min-w-0"
            >
              <div
                className={cn(
                  "relative aspect-4/3 md:aspect-auto md:h-[670px] md:max-h-[570px] rounded-lg overflow-hidden transition-all duration-500 ease-out transform-gpu",
                  index === selectedIndex
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-70",
                )}
                style={{
                  boxShadow:
                    "var(--sds-size-depth-0) var(--sds-size-depth-100) var(--sds-size-depth-100) var(--sds-size-depth-negative-025) var(--sds-color-black-200)",
                }}
              >
                <a
                  href={slide.image}
                  role="button"
                  aria-label={`View full-size image: ${
                    slide.alt || slide.title
                  }`}
                  data-pswp-src={slide.image}
                  data-pswp-width={slide.width || 1200}
                  data-pswp-height={slide.height || 800}
                  className="relative block w-full h-full cursor-zoom-in"
                  onClick={(e) => {
                    if (index !== selectedIndex) {
                      e.preventDefault();
                      scrollTo(index);
                    }
                  }}
                >
                  {/* Skeleton */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300",
                      isReady ? "opacity-0" : "opacity-100",
                    )}
                  />

                  {/* Image */}
                  <img
                    src={slide.image}
                    alt={slide.alt || slide.title}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                      isReady ? "opacity-100" : "opacity-0",
                    )}
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 md:mt-8 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "transition-all duration-300 rounded-full",
              index === selectedIndex
                ? "w-8 h-2 bg-yellow-400"
                : "w-2 h-2 bg-gray-400",
            )}
          />
        ))}
      </div>
    </div>
  );
};
