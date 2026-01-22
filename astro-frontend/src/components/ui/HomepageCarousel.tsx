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
  isLoading?: boolean;
}

const CarouselSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative w-full mx-auto", className)}>
      {/* Carousel Container Skeleton */}
      <div className="overflow-hidden">
        <div className="flex translate-x-[calc(-40%+50%)] md:translate-x-[calc(-33.333333%+50%)]">
          {/* Left partial image skeleton - positioned to be cut off on the left */}
          <div className="flex-[0_0_80%] md:flex-[0_0_66.666667%] min-w-0">
            <div
              className="relative aspect-[4/3] md:aspect-auto md:h-[570px] rounded-lg overflow-hidden scale-90 opacity-70"
              style={{
                boxShadow:
                  "var(--sds-size-depth-0) var(--sds-size-depth-100) var(--sds-size-depth-100) var(--sds-size-depth-negative-025) var(--sds-color-black-200)",
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            </div>
          </div>

          {/* Center main image skeleton */}
          <div className="flex-[0_0_80%] md:flex-[0_0_66.666667%] min-w-0">
            <div
              className="relative aspect-[4/3] md:aspect-auto md:h-[570px] rounded-lg overflow-hidden scale-99 opacity-100"
              style={{
                boxShadow:
                  "var(--sds-size-depth-0) var(--sds-size-depth-100) var(--sds-size-depth-100) var(--sds-size-depth-negative-025) var(--sds-color-black-200)",
              }}
            >
              <div className="w-full h-full relative bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{
                    animation: 'shimmer 2s infinite',
                    transform: 'translateX(-100%)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right partial image skeleton */}
          <div className="flex-[0_0_80%] md:flex-[0_0_66.666667%] min-w-0">
            <div
              className="relative aspect-[4/3] md:aspect-auto md:h-[570px] rounded-lg overflow-hidden scale-90 opacity-70"
              style={{
                boxShadow:
                  "var(--sds-size-depth-0) var(--sds-size-depth-100) var(--sds-size-depth-100) var(--sds-size-depth-negative-025) var(--sds-color-black-200)",
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator Skeleton */}
      <div className="flex justify-center mt-6 md:mt-8 space-x-2">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "rounded-full bg-gray-300 animate-pulse",
              index === 0 ? "w-8 h-2" : "w-2 h-2"
            )}
          />
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export const HomepageCarousel: React.FC<HomepageCarouselProps> = ({
  slides,
  autoplay = false,
  autoplayDelay = 4000,
  className,
  isLoading = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEmblaReady, setIsEmblaReady] = useState(false);

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

    // Set ready after emblaApi is available and positioned
    const timer = setTimeout(() => {
      setIsEmblaReady(true);
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !autoplay || !isEmblaReady) return;

    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(autoplayInterval);
  }, [emblaApi, autoplay, autoplayDelay, isEmblaReady]);

  // Initialize PhotoSwipe lightbox
  useEffect(() => {
    let lightbox: any;

    const initLightbox = async () => {
      const PhotoSwipeLightbox = (await import("photoswipe/lightbox")).default;
      await import("photoswipe/style.css");

      lightbox = new PhotoSwipeLightbox({
        mainClass: "pswp--custom-icon-colors",
        gallery: ".homepage-carousel-lightbox",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });

      lightbox.init();
    };

    initLightbox();

    return () => {
      if (lightbox) {
        lightbox.destroy();
      }
    };
  }, []);

  if (!slides || slides.length === 0) {
    return null;
  }

  // Show skeleton only if explicitly loading
  const showSkeleton = isLoading || (!isEmblaReady && slides.length > 0);

  return (
    <div
      className={cn(
        "relative w-full mx-auto homepage-carousel-lightbox",
        className,
      )}
    >
      {/* Show skeleton overlay while initializing */}
      {showSkeleton && (
        <div className="absolute inset-0 z-10">
          <CarouselSkeleton />
        </div>
      )}

      {/* Carousel Container - always render but hide while skeleton shows */}
      <div className={cn("overflow-hidden", showSkeleton && "opacity-0")} ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-[0_0_80%] md:flex-[0_0_66.666667%] min-w-0"
            >
              <div
                className={cn(
                  "relative aspect-4/3 md:aspect-auto md:max-h-[570px] md:h-[670px] rounded-lg overflow-hidden transition-all duration-500 ease-out transform-gpu",
                  index === selectedIndex
                    ? "scale-99 opacity-100"
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
                  className="block w-full h-full cursor-zoom-in"
                  onClick={(e) => {
                    if (index !== selectedIndex) {
                      e.preventDefault();
                      scrollTo(index);
                    }
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt || slide.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className={cn("flex justify-center mt-6 md:mt-8 space-x-2", showSkeleton && "opacity-0")}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "transition-all duration-300 rounded-full",
              index === selectedIndex
                ? "w-8 h-2 bg-yellow-400"
                : "w-2 h-2 bg-gray-400",
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};