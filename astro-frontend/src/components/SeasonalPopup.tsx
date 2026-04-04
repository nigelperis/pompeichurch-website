import { useMemo, useState, useEffect } from "react";
import Cancel from "~/assets/icons/cancel.svg?react";

type SeasonalVariant = "christmas" | "easter";

interface SeasonalPopupProps {
  message: string;
  variant: SeasonalVariant;
}

const themes: Record<
  SeasonalVariant,
  {
    border: string;
    panel: string;
    overlay: string;
    closeButton: string;
    backgroundImage?: string;
  }
> = {
  christmas: {
    border: "border-red-100",
    panel: "bg-white",
    overlay: "",
    closeButton: "hover:text-red-700",
  },
  easter: {
    border: "border-amber-100",
    panel: "bg-cover bg-center bg-no-repeat",
    overlay: "bg-white/70 backdrop-blur-[1px]",
    closeButton: "hover:text-amber-700",
    backgroundImage: "url('/easter-background.avif')",
  },
};

export default function SeasonalPopup({
  message,
  variant,
}: SeasonalPopupProps) {
  const [isVisible, setIsVisible] = useState(true);

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
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVisible(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!isVisible) return null;

  const theme = themes[variant];

  return (
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-300"
      onClick={() => setIsVisible(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md overflow-hidden rounded-3xl text-center shadow-2xl animate-in zoom-in-95 duration-300 ${theme.border} ${theme.panel}`}
        style={
          theme.backgroundImage
            ? { backgroundImage: theme.backgroundImage }
            : undefined
        }
      >
        <div className={`relative p-8 ${theme.overlay}`}>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close Popup"
            className={`absolute right-4 top-4 text-gray-500 transition ${theme.closeButton}`}
          >
            <Cancel className="h-5 w-5 cursor-pointer" />
          </button>

          <p className="pt-4 text-lg font-medium leading-relaxed text-gray-800">
            {resolvedMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
