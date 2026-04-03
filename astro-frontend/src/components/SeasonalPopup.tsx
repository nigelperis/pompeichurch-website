import { useMemo, useState } from "react";
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
    dots: string[];
    backgroundImage?: string;
  }
> = {
  christmas: {
    border: "border-red-100",
    panel: "bg-white",
    overlay: "",
    closeButton: "hover:text-red-700",
    dots: ["bg-red-400", "bg-emerald-400", "bg-amber-400"],
  },
  easter: {
    border: "border-amber-100",
    panel: "bg-cover bg-center bg-no-repeat",
    overlay: "bg-white/80 backdrop-blur-[1px]",
    closeButton: "hover:text-amber-700",
    dots: ["bg-amber-300", "bg-rose-300", "bg-sky-300"],
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

  if (!isVisible) return null;

  const theme = themes[variant];

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-300">
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-3xl border text-center shadow-2xl animate-in zoom-in-95 duration-300 ${theme.border} ${theme.panel}`}
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

          <p className="pt-8 text-lg font-medium leading-relaxed text-gray-800">
            {resolvedMessage}
          </p>

          <div className="mt-6 flex justify-center gap-2">
            {theme.dots.map((dotColor, index) => (
              <span
                key={`${variant}-${index}`}
                className={`h-2.5 w-2.5 rounded-full ${dotColor}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
