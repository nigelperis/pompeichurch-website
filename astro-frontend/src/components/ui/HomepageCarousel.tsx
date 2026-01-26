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

/* -------------------------------------------------------------------------- */
/*                               SLIDE SHELL                                  */
/* -------------------------------------------------------------------------- */

const SlideShell: React.FC<{
  isActive: boolean;
  children: React.ReactNode;
}> = ({ isActive, children }) => {
  return (
    <div className="flex-[0_0_80%] md:flex-[0_0_66.666667%] min-w-0">
      <div
        className={cn(
          "relative aspect-4/3 md:aspect-auto md:max-h-[570px] md:h-[670px] rounded-lg overflow-hidden transition-all duration-500 ease-out transform-gpu",
          isActive ? "scale-99 opacity-100" : "scale-90 opacity-70",
        )}
        style={{
          boxShadow:
            "var(--sds-size-depth-0) var(--sds-size-depth-100) var(--sds-size-depth-100) var(--sds-size-depth-negative-025) var(--sds-color-black-200)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              SKELETON TRACK                                 */
/* -------------------------------------------------------------------------- */

const CarouselSkeleton: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex">
        {[0, 1, 2].map((index) => (
          <SlideShell key={index} isActive={index === 1}>
            <div className="relative w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
              {index === 1 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
              )}
            </div>
          </SlideShell>
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

/* -------------------------------------------------------------------------- */
/*                             MAIN COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export const HomepageCarousel: React.FC<HomepageCarouselProps> = ({
  slides,
  autoplay = false,
  autoplayDelay = 4000,
  className,
  isLoading = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
    },
    [WheelGesturesPlugin()],
  );

  /* ------------------------------- EMBLA STATE ------------------------------ */

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  /* -------------------------------- AUTOPLAY -------------------------------- */

  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [emblaApi, autoplay, autoplayDelay]);

  /* ---------------------------- PHOTOSWIPE INIT ----------------------------- */

  useEffect(() => {
    let lightbox: any;

    const init = async () => {
      const PhotoSwipeLightbox = (await import("photoswipe/lightbox")).default;
      await import("photoswipe/style.css");

      lightbox = new PhotoSwipeLightbox({
        gallery: ".homepage-carousel-lightbox",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });

      lightbox.init();
    };

    init();

    return () => {
      if (lightbox) lightbox.destroy();
    };
  }, []);

  if (!slides || slides.length === 0) return null;

  /* ----------------------------- LOADING LOGIC ------------------------------ */

  const MIN_IMAGES_FOR_LAYOUT = Math.min(3, slides.length);
  const showSkeleton = isLoading || imagesLoaded < MIN_IMAGES_FOR_LAYOUT;

  /* -------------------------------- RENDER ---------------------------------- */

  return (
    <div
      className={cn(
        "relative w-full mx-auto homepage-carousel-lightbox",
        className,
      )}
    >
      {/* Skeleton Overlay */}
      {showSkeleton && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <CarouselSkeleton />
        </div>
      )}

      {/* Embla Viewport */}
      <div
        ref={emblaRef}
        className={cn("overflow-hidden", showSkeleton && "opacity-0")}
      >
        <div className="flex">
          {slides.map((slide, index) => (
            <SlideShell key={slide.id} isActive={index === selectedIndex}>
              <a
                href={slide.image}
                role="button"
                aria-label={`View full-size image: ${slide.alt || slide.title}`}
                data-pswp-src={slide.image}
                data-pswp-width={slide.width || 1200}
                data-pswp-height={slide.height || 800}
                className="block w-full h-full cursor-zoom-in"
                onClick={(e) => {
                  if (index !== selectedIndex) {
                    e.preventDefault();
                    emblaApi?.scrollTo(index);
                  }
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt || slide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onLoad={() =>
                    setImagesLoaded((v) =>
                      Math.min(v + 1, MIN_IMAGES_FOR_LAYOUT),
                    )
                  }
                />
              </a>
            </SlideShell>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div
        className={cn(
          "flex justify-center mt-6 md:mt-8 space-x-2",
          showSkeleton && "opacity-0",
        )}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "transition-all duration-300 rounded-full",
              index === selectedIndex
                ? "w-8 h-2 bg-yellow-400"
                : "w-2 h-2 bg-gray-400",
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
