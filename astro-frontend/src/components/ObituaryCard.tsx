import { useEffect, useState } from "react";
import { Locale } from "~/enums/locale";
import { useTranslations } from "~/i18n/utils";
import { cn } from "~/helpers/cn";
import { getFuneralPrayer } from "~/helpers/get-funeral-prayer";
import { getWardNameKok } from "~/helpers/get-ward-names-kok";
import { RelationType } from "~/enums/obituary";
import { getPlaceholderImage } from "~/helpers/get-placeholder-image";
import ShareLink from "~/components/ui/ShareLink";
import CloseIcon from "~/assets/react-icons/x.svg?react";
import YoutubeIcon from "~/assets/react-icons/youtube.svg?react";
import CoffinIcon from "~/assets/react-icons/coffin.svg?react";
import InfoIcon from "~/assets/react-icons/info.svg?react";
import WhatsAppShare from "~/components/ui/whatsapp-share.tsx";
import { EXPIRE_TIME } from "~/constants/index.ts";

interface Props {
  id?: string | number;
  name?: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  age?: string | number;
  relationType?: RelationType;
  relationNameEn?: string;
  relationNameKok?: string;
  ward?: string;
  dateOfDeath: string;
  slug: string;
  funeralDetails?: string;
  funeralDetailsKok?: string;
  funeralDetailsUpdatedAt?: Date | string;
  youtubeLink?: string;
  className?: string;
  autoFlip?: boolean;
}

// Simple lang detection from URL
const lang =
  typeof window !== "undefined" &&
  window.location.pathname.startsWith(`/${Locale.KOK}`)
    ? Locale.KOK
    : Locale.EN;

const relationMapKok: Record<string, string> = {
  "H/O": "ಪತಿ",
  "W/O": "ಪತಿಣ್",
  "D/O": "ಧುವ್",
  "S/O": "ಪುತ್",
};

const activeLabels = {
  en: {
    age: "Age",
    ward: "Ward",
    death: "Death",
  },
  kok: {
    age: "ಪ್ರಾಯ್",
    ward: "ವಾಡೊ",
    death: "ಮರಣ್",
  },
};

type FuneralInfoButtonProps = {
  label: string;
  lang: Locale;
  onClick: () => void;
};

export function FuneralInfoButton({
  label,
  lang,
  onClick,
}: FuneralInfoButtonProps) {
  const [showFullLabel, setShowFullLabel] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!showFullLabel) return;
    const timer = setTimeout(() => setShowFullLabel(false), 3000);
    return () => clearTimeout(timer);
  }, [showFullLabel]);

  // Show full label on hover/focus
  const expandLabel = () => setIsHovered(true);
  const collapseLabel = () => setIsHovered(false);

  const isExpanded = showFullLabel || isHovered;

  return (
    <button
      type="button"
      aria-label={label}
      className={[
        "flex items-center px-4 py-1.5 rounded-l-full",
        "bg-white/80 backdrop-blur-md shadow-md border border-white/40 font-semibold text-black",
        "transition-all duration-300 hover:bg-white/90 z-10 cursor-pointer",
        "gap-1",
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
        <span
          className={lang === "kok" ? "text-[16px] relative -top-[-3px]" : ""}
        >
          {label}
        </span>
      </span>
    </button>
  );
}

export default function ObituaryCard({
  id,
  name,
  age,
  relationType,
  relationNameEn,
  relationNameKok,
  ward,
  dateOfDeath,
  imageWidth,
  imageHeight,
  imageUrl,
  slug,
  funeralDetails,
  funeralDetailsKok,
  youtubeLink,
  className,
  funeralDetailsUpdatedAt,
  autoFlip = false,
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const obituaryUrl =
    lang === Locale.EN ? `/obituary/${slug}/` : `/kok/obituary/${slug}/`;

  const cardId = typeof id === "string" ? id : String(id ?? "no-id");

  let updatedAt: Date | null = null;
  if (funeralDetailsUpdatedAt) {
    updatedAt = new Date(funeralDetailsUpdatedAt);
    if (isNaN(updatedAt.getTime())) updatedAt = null;
  }
  const now = new Date();
  // check if details are fresh (within one day)

  const isDetailsFresh =
    updatedAt && now.getTime() - updatedAt.getTime() <= EXPIRE_TIME;

  const localizedFuneralDetails =
    lang === Locale.KOK
      ? funeralDetailsKok?.trim() || funeralDetails || ""
      : funeralDetails || "";

  useEffect(() => {
    if (autoFlip && localizedFuneralDetails && isDetailsFresh) {
      const timer = setTimeout(() => {
        setFlipped(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [localizedFuneralDetails, autoFlip, isDetailsFresh]);

  const t = useTranslations(lang);

  const funeralPrayer =
    lang === Locale.EN
      ? getFuneralPrayer(Locale.EN, relationType)
      : getFuneralPrayer(Locale.KOK, relationType);

  const labels = activeLabels[lang as keyof typeof activeLabels];
  const relationLabel =
    lang === Locale.KOK
      ? relationMapKok[relationType ?? ""] || "Spouse"
      : relationType || "Relation";

  let formattedDate = "";
  if (dateOfDeath) {
    const dateObj = new Date(dateOfDeath);
    if (!isNaN(dateObj.getTime())) {
      formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(dateObj)
        .replace(/\//g, "-");
    }
  }

  const showFlip =
    localizedFuneralDetails &&
    localizedFuneralDetails.trim().length > 0 &&
    isDetailsFresh;

  return (
    <div
      id={cardId.replace(/\s+/g, "-").toLowerCase()}
      className={cn(
        "relative mx-auto w-[280px] h-[580px] md:w-[250px] md:h-[510px] m-auto perspective",
        className,
      )}
      style={{ perspective: "1000px" }}
    >
      <div
        className={cn(
          "w-full h-full transition-transform duration-1000 transform-style preserve-3d relative",
          flipped ? "rotate-y-180" : "",
        )}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 1s ease-in-out",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        {/* Front Side */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden bg-white border border-gray-200 flex flex-col overflow-hidden transition-opacity duration-500",
            flipped ? "opacity-0 delay-0" : "opacity-100 delay-500",
          )}
        >
          <div className="aspect-[3/4] bg-gray-100 relative md:h-[330px]">
            <img
              src={imageUrl}
              alt={`Image of ${name}`}
              width={imageWidth}
              height={imageHeight}
              className="object-cover w-full h-full"
              loading="lazy"
            />
            {showFlip && !flipped && (
              <div className="absolute top-2 right-0 z-10">
                <FuneralInfoButton
                  label={t("funeral.rites")}
                  lang={lang}
                  onClick={() => setFlipped(true)}
                />
              </div>
            )}
          </div>
          {/* Details Section */}
          <div className="flex flex-col justify-between p-3 h-full min-h-[180px] relative">
            <div className="space-y-1">
              <p className="text-xl font-bold text-slate-900 line-clamp-2">
                {name}
              </p>
              {(relationNameEn || relationNameKok) && (
                <p className="line-clamp-2 md:text-base text-lg text-slate-700">
                  <strong>{relationLabel}:</strong>{" "}
                  {lang === "kok" ? relationNameKok : relationNameEn}
                </p>
              )}
              {age && (
                <p className="md:text-base text-lg text-slate-700">
                  <strong>{labels.age}:</strong> {age}
                </p>
              )}
              {ward && (
                <p className="md:text-base text-lg text-slate-700">
                  <strong>{labels.ward}:</strong> {getWardNameKok(ward, lang)}
                </p>
              )}
              {dateOfDeath && (
                <p className="md:text-base text-lg text-slate-700">
                  <strong>{labels.death}:</strong> {formattedDate}
                </p>
              )}
            </div>
            <div className="absolute bottom-4 right-2 flex items-center gap-2 ">
              <WhatsAppShare shareData={{ title: name, url: obituaryUrl }} />
              <ShareLink
                className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
                shareData={{
                  title: name,
                  url: obituaryUrl,
                }}
              />
            </div>
          </div>
        </div>
        {/* Back side */}
        {showFlip && (
          <div
            className={cn(
              "absolute inset-0 backface-hidden bg-white border border-gray-200 p-4 rotate-y-180 flex flex-col transition-opacity duration-500",
              flipped ? "opacity-100 delay-500" : "opacity-0 delay-0",
            )}
          >
            <button
              type="button"
              className="absolute top-2 right-2 p-1 rounded-full hover:scale-115 cursor-pointer transition"
              onClick={() => setFlipped(false)}
            >
              <CloseIcon className="h-8 w-8 md:h-6 md:w-6 text-red-600" />
            </button>
            {/* Funeral details content */}
            <div className="flex-1 pt-4 pb-2">
              <h4 className="flex items-center gap-2 justify-center font-bold text-xl mb-2">
                <CoffinIcon className="w-7 h-7" />
                <span className={cn(lang === Locale.KOK ? "mt-2" : "")}>
                  {t("funeral.rites")}
                </span>
              </h4>
              <div className="mb-2">
                <p className="text-xl md:text-[18px] text-center mt-6">
                  {localizedFuneralDetails ? (
                    localizedFuneralDetails
                  ) : (
                    <em>No details available.</em>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              {funeralPrayer && (
                <blockquote
                  className={cn(
                    "text-slate-900 text-center",
                    lang === Locale.KOK
                      ? "text-lg md:text-base mb-12 md:mb-8"
                      : "text-xl sm:text-xl md:text-base mb-14",
                  )}
                >
                  "{funeralPrayer}"
                </blockquote>
              )}
              <p
                className={cn(
                  "font-semibold text-slate-700 text-lg text-center mb-4",
                  lang === Locale.KOK ? "md:text-base" : "md:text-[15px]",
                )}
              >
                {t("parish-priest-and-parishioners")}
              </p>
              {youtubeLink && (
                <a
                  href={youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-base py-2 w-full mt-2"
                  style={{ letterSpacing: "0.04em" }}
                >
                  <YoutubeIcon className="w-6 h-6" />
                  <span
                    className={
                      lang === Locale.KOK
                        ? "block leading-none mt-1.5"
                        : "block"
                    }
                  >
                    {t("funeral.youtube")}
                  </span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      <style>{`
        .perspective { perspective: 1000px; }
        .transform-style { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
