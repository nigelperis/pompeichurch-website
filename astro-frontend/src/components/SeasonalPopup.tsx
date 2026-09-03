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
    border: "border border-[#d9bd5b]/70",
    panel: "bg-[#fffdf7]",
    backdrop: "bg-[#092f3b]/45",
    overlay: "bg-white/25 backdrop-blur-[0.5px]",
    closeButton: "hover:bg-white hover:text-[#155a70]",
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
    const previousBodyOverflow = document.body.style.overflow;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    const focusFrame = requestAnimationFrame(() =>
      closeButtonRef.current?.focus(),
    );

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
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
        className={`seasonal-popup-panel relative w-full overflow-hidden rounded-3xl text-center shadow-2xl ${variant === "monthi" ? "max-w-lg" : "max-w-md"} ${theme.border} ${theme.panel}`}
        style={
          theme.backgroundImage
            ? { backgroundImage: theme.backgroundImage }
            : undefined
        }
      >
        {variant === "monthi" && (
          <div className="relative overflow-hidden">
            <img
              src={virginMaryImage.src}
              alt={imageAlt}
              width={virginMaryImage.width}
              height={virginMaryImage.height}
              className="aspect-[16/9] w-full object-cover object-center"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#fffdf7] to-transparent"
            />
          </div>
        )}
        <div className={`relative p-8 ${theme.overlay}`}>
          {variant === "monthi" && (
            <>
              <span
                aria-hidden="true"
                className="absolute -left-9 -top-9 size-28 rounded-full border border-[#e5c964]/45 bg-white/20"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-12 -right-10 size-32 rounded-full border border-[#6f9f83]/25 bg-[#f5cf55]/10"
              />
            </>
          )}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label={closeLabel}
            className={`absolute right-4 top-4 rounded-full p-1 text-gray-500 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a6277] ${theme.closeButton}`}
          >
            <Cancel className="h-5 w-5 cursor-pointer" />
          </button>

          {eyebrow && (
            <p
              className={`pr-5 text-xs font-semibold uppercase leading-relaxed tracking-[0.16em] ${theme.eyebrow}`}
            >
              {eyebrow}
            </p>
          )}

          {title && (
            <h2
              id={`seasonal-${variant}-title`}
              className={`mt-3 text-3xl font-bold leading-tight ${theme.title}`}
            >
              {title}
            </h2>
          )}

          <p
            id={`seasonal-${variant}-message`}
            className={`text-lg font-medium leading-relaxed ${title ? "mt-4" : "pt-4"} ${theme.message}`}
          >
            {resolvedMessage}
          </p>

          {variant === "monthi" && (
            <div
              aria-hidden="true"
              className="mx-auto mt-6 flex w-fit items-center gap-1.5"
            >
              {[0, 1, 2, 3, 4].map((grain) => (
                <span
                  key={grain}
                  className="block h-3 w-1.5 rotate-45 rounded-full bg-[#d9ad32]"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
