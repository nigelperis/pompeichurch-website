import { useMemo, useState, useEffect, useRef } from "react";
import Cancel from "~/assets/icons/cancel.svg?react";
import virginMaryImage from "~/assets/static-assets/virgin-mary.jpeg";

type SeasonalVariant = "christmas" | "easter" | "monthi";

interface SeasonalPopupProps {
  message: string;
  variant: SeasonalVariant;
  title?: string;
  eyebrow?: string;
  closeLabel?: string;
  imageAlt?: string;
}

const themes: Record<
  SeasonalVariant,
  {
    border: string;
    panel: string;
    backdrop: string;
    overlay: string;
    closeButton: string;
    message: string;
    eyebrow: string;
    title: string;
    backgroundImage?: string;
  }
> = {
  christmas: {
    border: "border-red-100",
    panel: "bg-white",
    backdrop: "bg-black/40",
    overlay: "",
    closeButton: "hover:text-red-700",
    message: "text-gray-800",
    eyebrow: "text-red-700",
    title: "text-gray-900",
  },
  easter: {
    border: "border-amber-100",
    panel: "bg-cover bg-center bg-no-repeat",
    backdrop: "bg-black/40",
    overlay: "bg-white/70 backdrop-blur-[1px]",
    closeButton: "hover:text-amber-700",
    message: "text-gray-800",
    eyebrow: "text-amber-800",
    title: "text-gray-900",
    backgroundImage: "url('/easter-background.avif')",
  },
  monthi: {
    border: "border-0",
    panel: "bg-[#fffdf7]",
    backdrop: "bg-[#092f3b]/45",
    overlay: "bg-white/25 backdrop-blur-[0.5px]",
    closeButton: "bg-white/90 shadow-sm hover:bg-white hover:text-[#155a70]",
    message: "text-[#344c55]",
    eyebrow: "text-[#1a6277]",
    title: "text-[#174f65]",
    backgroundImage:
      "radial-gradient(circle at 8% 10%, rgba(247, 178, 189, 0.46), transparent 25%), radial-gradient(circle at 92% 88%, rgba(245, 207, 85, 0.4), transparent 26%), linear-gradient(145deg, #fffdf7 0%, #f2f8f6 52%, #edf6f8 100%)",
  },
};

export default function SeasonalPopup({
  message,
  variant,
  title,
  eyebrow,
  closeLabel = "Close celebration message",
  imageAlt = "Infant Mary surrounded by flowers",
}: SeasonalPopupProps) {
  const [isVisible, setIsVisible] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const resolvedMessage = useMemo(() => {
    if (variant !== "christmas") return message;

    const nextYear =
      new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      ).getFullYear() + 1;

    return message.replace("{newYear}", nextYear.toString());
  }, [message, variant]);

  useEffect(() => {
    if (!isVisible) return;

    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const scrollPosition = window.scrollY;
    const rootElement = document.documentElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    const previousRootOverflow = rootElement.style.overflow;
    const previousRootOverscrollBehavior = rootElement.style.overscrollBehavior;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const preventScroll = (event: Event) => event.preventDefault();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    rootElement.style.overflow = "hidden";
    rootElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });
    const focusFrame = requestAnimationFrame(() =>
      closeButtonRef.current?.focus(),
    );

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      rootElement.style.overflow = previousRootOverflow;
      rootElement.style.overscrollBehavior = previousRootOverscrollBehavior;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
      window.scrollTo(0, scrollPosition);
      previouslyFocusedElement?.focus();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const theme = themes[variant];

  return (
    <div
      className={`seasonal-popup-backdrop fixed inset-0 z-10000 flex items-center justify-center p-4 ${theme.backdrop}`}
      onClick={() => setIsVisible(false)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `seasonal-${variant}-title` : undefined}
        aria-label={title ? undefined : resolvedMessage}
        aria-describedby={title ? `seasonal-${variant}-message` : undefined}
        onClick={(e) => e.stopPropagation()}
        className={`seasonal-popup-panel relative max-h-[calc(100dvh-2rem)] w-full overflow-hidden rounded-3xl text-center shadow-2xl ${variant === "monthi" ? "max-w-lg" : "max-w-md"} ${theme.border} ${theme.panel}`}
        style={
          theme.backgroundImage
            ? { backgroundImage: theme.backgroundImage }
            : undefined
        }
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label={closeLabel}
          className={`absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full text-gray-500 transition outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${theme.closeButton}`}
        >
          <Cancel className="h-5 w-5 cursor-pointer" />
        </button>

        <div className="overflow-hidden">
          {variant === "monthi" && (
            <div className="relative overflow-hidden">
              <img
                src={virginMaryImage.src}
                alt={imageAlt}
                width={virginMaryImage.width}
                height={virginMaryImage.height}
                className="h-[clamp(4.5rem,34dvh,18rem)] w-full object-cover object-center"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-[#fffdf7] to-transparent"
              />
            </div>
          )}

          <div
            className={`relative ${variant === "monthi" ? "px-[clamp(0.75rem,2.5dvh,1.75rem)] py-[clamp(1.5rem,4dvh,2.25rem)]" : "p-8"} ${theme.overlay}`}
          >
            {title && (
              <h2
                id={`seasonal-${variant}-title`}
                className={`${variant === "monthi" ? "mt-[clamp(0.25rem,1.2dvh,0.75rem)] text-[clamp(1.25rem,3.8dvh,1.875rem)]" : "mt-2 text-2xl sm:mt-3 sm:text-3xl"} font-bold leading-tight ${theme.title}`}
              >
                {title}
              </h2>
            )}
            <p
              id={`seasonal-${variant}-message`}
              className={`${variant === "monthi" ? "text-[clamp(0.75rem,2.2dvh,1.125rem)] leading-[1.45]" : "leading-relaxed sm:text-lg"} font-medium ${title ? (variant === "monthi" ? "mt-[clamp(0.375rem,1.5dvh,1rem)]" : "mt-3 sm:mt-4") : "pt-3 sm:pt-4"} ${theme.message}`}
            >
              {resolvedMessage}
            </p>

            {variant === "monthi" && (
              <div
                aria-hidden="true"
                className="mx-auto mt-6 flex w-fit items-center gap-3"
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
