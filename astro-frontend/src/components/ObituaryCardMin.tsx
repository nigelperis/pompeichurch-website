import { useEffect, useRef, useState } from "react";
import { Locale } from "~/enums/locale";
import { useTranslations } from "~/i18n/utils";
import { cn } from "~/helpers/cn";
import ShareLink from "~/components/ui/ShareLink";
import CoffinIcon from "~/assets/react-icons/coffin.svg?react";
import CloseIcon from "~/assets/react-icons/x.svg?react";
import YoutubeIcon from "~/assets/react-icons/youtube.svg?react";
import WhatsAppShare from "~/components/ui/whatsapp-share.tsx";
import { EXPIRE_TIME } from "~/constants/index.ts";
import {
  getFuneralDetails,
  parseDateOnly,
} from "~/helpers/get-funeral-details";
import { FuneralInfoButton } from "./ui/FuneralInfoButton";

interface Props {
  id?: string | number;
  name?: string;
  age?: string | number;
  dateOfDeath?: string;
  imageUrl: string;
  imageWidth?: number;
  imageHeight?: number;
  slug?: string;
  blurred?: boolean;
  homeTime?: string;
  massTime?: string;
  funeralDate: string;
  funeralDetailsUpdatedOn?: Date | string;
  youtubeLink?: string;
  className?: string;
  autoFlip?: boolean;
}

// Simple lang detection from URL for label localization
const lang =
  typeof window !== "undefined" &&
  window.location.pathname.startsWith(`/${Locale.KOK}`)
    ? Locale.KOK
    : Locale.EN;

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

export default function ObituaryCardMin({
  id,
  name,
  age,
  dateOfDeath,
  imageWidth,
  imageHeight,
  imageUrl,
  slug,
  blurred = false,
  homeTime,
  massTime,
  funeralDate,
  youtubeLink,
  className = "",
  funeralDetailsUpdatedOn,
  autoFlip = true,
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const obituaryUrl =
    lang === Locale.EN ? `/obituary/${slug}/` : `/kok/obituary/${slug}/`;

  let updatedAt: Date | null = null;
  if (funeralDetailsUpdatedOn) {
    updatedAt = new Date(funeralDetailsUpdatedOn);
    if (isNaN(updatedAt.getTime())) updatedAt = null;
  }
  const now = new Date();

  // check if details are fresh (within one day)
  const isFuneralDetailsFresh =
    updatedAt && now.getTime() - updatedAt.getTime() <= EXPIRE_TIME;

  const localizedFuneralDetails = getFuneralDetails(
    lang,
    funeralDate,
    homeTime,
    massTime,
  );

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      autoFlip &&
      localizedFuneralDetails &&
      (!funeralDate || isFuneralDetailsFresh)
    ) {
      const observer = new window.IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Add a delay before flipping (2 seconds)
            setTimeout(() => {
              setFlipped(true);
            }, 2000);
            observer.disconnect();
          }
        },
        { threshold: 1.0 },
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => observer.disconnect();
    }
  }, [localizedFuneralDetails, autoFlip, funeralDate, isFuneralDetailsFresh]);

  const t = useTranslations?.(lang);
  const labels = activeLabels[lang as keyof typeof activeLabels];

  // Format date
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

  const cardId = typeof id === "string" ? id : String(id ?? "no-id");

  // BLURRED Minimal Card (View All)
  if (blurred) {
    return (
      <div className={cn("flex-none relative h-full", className)}>
        <div className={cn("flex-none relative h-full", className)}>
          <div className="w-64 snap-start first:snap-align-none max-w-xs shrink-0 border border-gray-200 duration-200 ease-in-out sm:w-64 min-h-[380px] h-[380px]">
            <div className="opacity-50 blur-md">
              <div className="card-image flex-none">
                <img
                  src={imageUrl}
                  alt={`Image of ${name}`}
                  width={imageWidth}
                  height={imageHeight}
                  className="h-[300px] w-full object-cover border-none"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col justify-start space-y-1 p-3">
                <div className="space-y-1">
                  <p className="text-lg font-bold leading-snug text-slate-900 flex items-center">
                    <span className="truncate max-w-[190px]" title={name}>
                      {name}
                    </span>
                    {age ? (
                      <span className="shrink-0">&nbsp;({age})</span>
                    ) : null}
                  </p>
                  {dateOfDeath && (
                    <p className="text-slate-700">
                      {labels.death}: {formattedDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Overlay button also mobile only */}
        <div className="absolute inset-0 z-5 flex items-center justify-center lg:hidden">
          <a
            href={lang === Locale.KOK ? "/kok/obituary" : "/obituary"}
            className="from-natgeo-yellow to-natgeo-yellow hoverable-link border-natgeo-yellow border-b-2 bg-linear-to-r px-2 py-1 inline-block text-xl font-bold text-black hover:border-transparent hover:text-black mb-2 mt-2"
          >
            {t ? t("ui.view-all") : "View All"}
          </a>
        </div>
        {/* For desktop, just render a normal card underneath */}
        <div className="hidden lg:block">
          {/* render the standard minimal card */}
          <div className="card-image flex-none">
            <img
              src={imageUrl}
              alt={`Image of ${name}`}
              width={imageWidth}
              height={imageHeight}
              className="h-[300px] w-full object-cover border-none"
              loading="lazy"
            />
          </div>
          <div className="flex flex-1 flex-col justify-start space-y-1 p-3">
            <div className="space-y-1">
              <p className="text-lg font-bold leading-snug text-slate-900 flex items-center">
                <span className="truncate max-w-[190px]" title={name}>
                  {name}
                </span>
                {age ? <span className="shrink-0">&nbsp;({age})</span> : null}
              </p>

              {dateOfDeath && (
                <p className="text-slate-700">
                  {labels.death}: {formattedDate}
                </p>
              )}
            </div>
            <div className="absolute bottom-2 right-2 flex items-center gap-2 ">
              <WhatsAppShare
                shareData={{
                  title: name,
                  url: obituaryUrl,
                }}
                size={28}
              />
              <ShareLink
                className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
                shareData={{
                  title: name,
                  url: obituaryUrl,
                }}
                size={28}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const showFlip =
    (!funeralDate &&
      localizedFuneralDetails &&
      localizedFuneralDetails.trim().length > 0) ||
    (funeralDate &&
      localizedFuneralDetails &&
      localizedFuneralDetails.trim().length > 0 &&
      isFuneralDetailsFresh);

  return (
    <div
      className={cn("flex-none relative h-full perspective", className)}
      style={{ perspective: "1000px" }}
      id={cardId}
    >
      <div
        ref={cardRef}
        className={cn(
          "relative w-64 max-w-xs shrink-0 border border-gray-200 sm:w-64 transition-transform duration-1000 transform-style",
          flipped ? "rotate-y-180" : "",
        )}
        style={{
          minHeight: 380,
          height: 380,
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 1s ease-in-out",
        }}
      >
        {/* Front Side */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden bg-white flex flex-col overflow-hidden transition-opacity duration-500",
            flipped ? "opacity-0 delay-0" : "opacity-100 delay-500",
          )}
        >
          <div className="flex-none relative">
            <img
              src={imageUrl}
              alt={`Image of ${name}`}
              width={imageWidth}
              height={imageHeight}
              className="h-[300px] w-full object-cover border-none"
              loading="lazy"
            />
            {showFlip && !flipped && (
              <FuneralInfoButton
                label={t("funeral.rites")}
                lang={lang}
                onClick={() => setFlipped(true)}
                floating={true}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col justify-start space-y-1 p-3">
            <p className="text-lg font-bold leading-snug text-slate-900 flex items-center">
              <span className="truncate max-w-[190px]" title={name}>
                {name}
              </span>
              {age ? <span className="shrink-0">&nbsp;({age})</span> : null}
            </p>

            {dateOfDeath && (
              <p className="text-slate-700">
                {labels.death}: {formattedDate}
              </p>
            )}
          </div>
          {/* Share Icon */}
          <div className="absolute bottom-2 right-2 flex items-center gap-2 ">
            <WhatsAppShare
              shareData={{
                title: name,
                url: obituaryUrl,
              }}
              size={28}
            />
            <ShareLink
              className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
              shareData={{
                title: name,
                url: obituaryUrl,
              }}
              size={28}
            />
          </div>
        </div>

        {/* Back side */}
        {showFlip && (
          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-between w-full h-full backface-hidden bg-white p-4 rotate-y-180 transition-opacity duration-500",
              flipped ? "opacity-100 delay-500" : "opacity-0 delay-0",
            )}
          >
            <button
              type="button"
              className="absolute top-2 right-1 rounded-full hover:scale-115 cursor-pointer transition"
              onClick={() => setFlipped(false)}
            >
              <CloseIcon className="h-8 w-8 text-red-600" />
            </button>
            <div className="flex-1 flex flex-col items-center justify-center text-center pt-6 pb-4">
              <h4 className="flex items-center gap-2 justify-center font-bold text-xl mb-2">
                <CoffinIcon className="w-7 h-7" />
                <span className={cn(lang === Locale.KOK ? "mt-2" : "")}>
                  {t("funeral.rites")}
                </span>
              </h4>
              <p className="text-xl md:text-[18px] text-center mt-6">
                {localizedFuneralDetails}
              </p>
            </div>
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
                    lang === Locale.KOK ? "block leading-none mt-1.5" : "block"
                  }
                >
                  {t("funeral.youtube")}
                </span>
              </a>
            )}
          </div>
        )}
      </div>
      {/* Minimal card flip effect */}
      <style>
        {`
      .perspective { perspective: 1000px; }
      .transform-style { transform-style: preserve-3d; }
      .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      .rotate-y-180 { transform: rotateY(180deg); }
      `}
      </style>
    </div>
  );
}
