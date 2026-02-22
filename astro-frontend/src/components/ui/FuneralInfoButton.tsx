import { useEffect, useState } from "react";
import InfoIcon from "~/assets/react-icons/info.svg?react";
import type { Locale } from "~/enums/locale";

type FuneralInfoButtonProps = {
  label: string;
  lang: Locale;
  onClick: () => void;
  floating?: boolean;
};

export function FuneralInfoButton({
  label,
  lang,
  onClick,
  floating = false,
}: FuneralInfoButtonProps) {
  const [showFullLabel, setShowFullLabel] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!showFullLabel) return;
    const timer = setTimeout(() => setShowFullLabel(false), 3000);
    return () => clearTimeout(timer);
  }, [showFullLabel]);

  const expandLabel = () => setIsHovered(true);
  const collapseLabel = () => setIsHovered(false);
  const isExpanded = showFullLabel || isHovered;

  return (
    <button
      type="button"
      aria-label={label}
      className={[
        floating ? "absolute top-4 right-0" : "",
        "flex items-center px-4 py-1.5 rounded-l-full",
        "bg-white/80 backdrop-blur-md shadow-md border border-white/40 font-semibold text-black",
        "transition-all duration-300 md:hover:bg-white/90 cursor-pointer",
        "gap-1 z-10",
      ].join(" ")}
      onClick={onClick}
      onMouseEnter={expandLabel}
      onMouseLeave={collapseLabel}
      onFocus={expandLabel}
      onBlur={collapseLabel}
    >
      <InfoIcon className="w-5 h-5 opacity-80" />
      <span
        className={[
          "overflow-hidden transition-all duration-300",
          isExpanded
            ? "max-w-[200px] opacity-100 ml-1"
            : "max-w-0 opacity-0 ml-0",
        ].join(" ")}
        style={{ whiteSpace: "nowrap" }}
      >
        <span className={lang === "kok" ? "text-[16px] relative top-1" : ""}>
          {label}
        </span>
      </span>
    </button>
  );
}
