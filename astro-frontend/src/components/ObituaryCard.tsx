import { useEffect, useState } from "react";
import { Locale } from "~/enums/locale";
import { useTranslations } from "~/i18n/utils";
import { cn } from "~/helpers/cn";
import { getFuneralPrayer } from "~/helpers/get-funeral-prayer";
import { getWardNameKok } from "~/helpers/get-ward-names-kok";
import { RelationType } from "~/enums/obituary";

interface Props {
  id: string;
  name: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  age: string | number;
  relationType?: RelationType;
  relationNameEn?: string;
  relationNameKok?: string;
  ward: string;
  dateOfDeath: string;
  funeralDetails?: string;
  funeralDetailsUpdatedAt?: Date;
  youtubeLink?: string;
  className?: string;
}

// Simple lang detection from URL (you can improve)
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

const ONE_DAY_MS = 24 * 60 * 60 * 1000; // milliseconds in one day

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
  funeralDetails,
  youtubeLink,
  className,
  funeralDetailsUpdatedAt,
}: Props) {
  const [flipped, setFlipped] = useState(false);

  const updatedAt = funeralDetailsUpdatedAt
    ? new Date(funeralDetailsUpdatedAt)
    : null;
  const now = new Date();

  // check if details are fresh (within one day)
  const isFuneralDetailsFresh = updatedAt
    ? now.getTime() - updatedAt.getTime() < ONE_DAY_MS
    : false;

  useEffect(() => {
    if (funeralDetails && isFuneralDetailsFresh) {
      const timer = setTimeout(() => {
        setFlipped(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [funeralDetails, isFuneralDetailsFresh]);

  const t = useTranslations(lang);

  const funeralPrayer =
    lang === Locale.EN
      ? getFuneralPrayer(Locale.EN, relationType)
      : getFuneralPrayer(Locale.KOK, relationType);

  const labels = activeLabels[lang as keyof typeof activeLabels];
  const relationLabel =
    lang === Locale.KOK
      ? relationMapKok[relationType ?? ""] || "ಸಾತೀ"
      : relationType || "Relation";

  const formattedDate = dateOfDeath
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(new Date(dateOfDeath))
        .replace(/\//g, "-")
    : "";

  return (
    <div
      id={id.replace(/\s+/g, "-").toLowerCase()}
      className={cn(
        "relative w-[280px] md:w-[250px] mx-auto perspective",
        className,
      )}
      style={{ perspective: 1000 }}
    >
      <div
        className={`relative w-full h-[550px] md:h-[510px] transition-transform duration-700 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden bg-white border border-gray-200 flex flex-col overflow-hidden">
          <div className="relative aspect-[3/4] bg-gray-100">
            <img
              src={imageUrl}
              alt={`Image of ${name}`}
              width={imageWidth}
              height={imageHeight}
              className="object-cover w-full h-full"
              loading="lazy"
            />

            {funeralDetails && isFuneralDetailsFresh && (
              <div className="group">
                <button
                  type="button"
                  aria-label="Funeral Details"
                  className="absolute top-4 right-2 flex items-center gap-1 px-2 bg-black/40 text-white border border-white/30 backdrop-blur-sm font-medium rounded-md shadow-md transform transition-all duration-200 animate-bounce cursor-pointer"
                  onClick={() => setFlipped(true)}
                >
                  <span
                    className={cn("mt-2", {
                      "mt-0 p-1 gap-2": lang === Locale.EN,
                    })}
                  >
                    {t("funeral.rites")}
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between p-3 h-full min-h-[180px] relative">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 line-clamp-2">
                {name}
              </h3>

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

            {/* Share Link */}
          </div>
        </div>

        {/* Back side */}
        <div className="absolute flex items-center w-full h-full backface-hidden bg-white border border-gray-200 p-4 rotate-y-180 flex-col">
          {/* Close (X) button top-right */}
          <button
            type="button"
            className="absolute top-2 right-2 p-1 rounded-full hover:scale-115 cursor-pointer transition"
            onClick={() => setFlipped(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="overflow-auto text-justify text-black whitespace-pre-line pt-8">
            <h4 className="font-bold mb-2 text-center text-2xl md:text-xl">
              {t("funeral.rites")}
            </h4>
            <p
              className={cn("text-slate-800 text-xl md:text-lg p-2", {
                "font-noto-sans-kannada text-xl md:text-[18px]":
                  lang === Locale.EN,
              })}
            >
              {funeralDetails ? funeralDetails : <em>No details available.</em>}
            </p>
            <p
              className={cn(
                "text-black text-lg md:text-[16px] md:p-2 text-center mt-2",
                {
                  "text-xl md:text-[17px]": lang === Locale.EN,
                },
              )}
            >
              {funeralPrayer}
            </p>
            <p
              className={cn(
                "text-gray-500 font-bold text-[16px] md:text-lg md:text-[16px] mt-6 text-center",
                { "md:text-sm": lang === Locale.EN },
              )}
            >
              {t("funeral.subtitle")}
            </p>
          </div>

          {youtubeLink && (
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 text-white px-4 hover:bg-red-700 transition mt-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a2.88 2.88 0 00-2.028-2.034C19.648 3.75 12 3.75 12 3.75s-7.648 0-9.47.402a2.88 2.88 0 00-2.027 2.034A30.176 30.176 0 000 12a30.176 30.176 0 00.503 5.814 2.88 2.88 0 002.027 2.034c1.823.4 9.47.4 9.47.4s7.648 0 9.47-.4a2.88 2.88 0 002.028-2.034A30.176 30.176 0 0024 12a30.176 30.176 0 00-.502-5.814zM9.75 15.02v-6.04l5.25 3.02-5.25 3.02z" />
              </svg>
              <p className="font-roboto p-1">Watch on YouTube</p>
            </a>
          )}
        </div>
      </div>

      <style>{`
  .perspective {
    perspective: 1000px;
  }
  .transform-style {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`}</style>
    </div>
  );
}
