import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { cn } from "~/helpers/cn";

interface CarouselSlide {
  id: number;
  title: string;
  image: string;
  alt?: string;
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
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(autoplayInterval);
  }, [emblaApi, autoplay, autoplayDelay]);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative w-full mx-auto", className)}>
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-[0_0_80%] md:flex-[0_0_66.666667%] min-w-0"
            >
              <div
                className={cn(
                  "relative aspect-4/3 md:aspect-auto md:max-h-[570px] md:h-[670px] rounded-lg overflow-hidden transition-all duration-500 ease-out shadow-sm",
                  "transform-gpu",
                  index === selectedIndex
                    ? "scale-99 opacity-100"
                    : "scale-90 opacity-70",
                )}
                onClick={() => scrollTo(index)}
              >
                <img
                  src={slide.image}
                  alt={slide.alt || slide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 md:mt-8 space-x-2">
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
