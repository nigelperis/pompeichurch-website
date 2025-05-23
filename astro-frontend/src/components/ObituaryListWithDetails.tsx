import { useState, useContext, useRef, useLayoutEffect, createContext } from "react";
import { ui } from "~/i18n/ui";
import ShareIconUrl from '~/assets/icons/share.svg?url';
import YouTubeIconUrl from '~/assets/icons/youtube.svg?url';
import ChevronRightUrl from '~/assets/icons/chevron-right.svg?url';
import BlankUrl from '~/assets/static-assets/blank.jpeg?url';

export const LanguageContext = createContext<string>("en");

type Lang = keyof typeof ui;

export function useTranslation() {
  const lang = (useContext(LanguageContext) || "en") as Lang;
  return (key: string) => (ui[lang] as Record<string, string>)[key] ?? key;
}

type StrapiImage = {
  url: string;
  width?: number;
  height?: number;
  formats?: any;
} | null;

type Obituary = {
  id: string | number;
  lang?: string;
  englishName: string;
  konkaniName: string;
  image: StrapiImage;
  age?: number;
  relationType?: string;
  relationNameEn?: string;
  relationNameKok?: string;
  ward?: string;
  dateOfDeath?: string;
  funeralDetails?: string;
  youtubeLink?: string;
};

type ObituaryListWithWidePanelProps = {
  obituaries: Obituary[];
  lang: string;
};

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL || "";


function getObituaryShareData({ lang, englishName, konkaniName, ward }: {
  lang: string,
  englishName: string,
  konkaniName: string,
  ward?: string,
}) {
  const slug = englishName.replace(/\s+/g, "-").toLowerCase();
  const path = lang === "kok"
    ? `/kok/obituary?id=${slug}`
    : `/obituary?id=${slug}`;
  const url = typeof window !== "undefined"
    ? new URL(path, window.location.origin).href
    : path;
  const title = `${konkaniName || englishName}${ward ? " - " + ward : ""}`;
  return { url, title };
}


function getImageUrl(image: StrapiImage) {
  if (!image || !image.url) return BlankUrl;
  if (image.url.startsWith("/")) return API_BASE_URL + image.url;
  return image.url;
}

type ObituaryCardProps = Obituary & {
  showFuneralButton?: boolean;
  onFuneralClick?: () => void;
  isExpanded?: boolean;
  className?: string;
};

function ObituaryCard({
  id,
  konkaniName,
  englishName,
  image,
  age,
  relationType,
  relationNameEn,
  relationNameKok,
  ward,
  dateOfDeath,
  showFuneralButton,
  onFuneralClick,
  isExpanded,
  className,
  lang: cardLang,
}: ObituaryCardProps & { lang?: string }) {
  const imageUrl = getImageUrl(image);
  const imageWidth = image?.width;
  const imageHeight = image?.height;
  const t = useTranslation();
  const lang = useContext(LanguageContext) || cardLang || "en";

  const shareData = getObituaryShareData({
    lang,
    englishName,
    konkaniName,
    ward,
  });

  return (
    <div
      id={String(id).replace(/\s+/g, "-").toLowerCase()}
      className={[
        "bg-white rounded-sm shadow overflow-hidden w-[280px] md:w-[250px] mx-1 flex flex-col transition-transform duration-200 ease-in-out md:h-[510px] relative",
        className || "",
      ].join(" ")}
      style={{
        zIndex: isExpanded ? 2 : 1,
        height: "100%",
      }}
    >
      <div className="aspect-[3/4] bg-gray-100 relative ">
        <img
          src={imageUrl}
          alt={englishName}
          width={imageWidth}
          height={imageHeight}
          className="object-cover w-full h-full"
          loading="lazy"
          onError={e => (e.currentTarget.src = BlankUrl)}
        />
        {showFuneralButton && onFuneralClick && (
          <button
            className="absolute left-0 bottom-0 shadow w-full py-2 bg-white font-semibold hover:bg-amber-300 text-black transition cursor-pointer"
            onClick={onFuneralClick}
            type="button"
            style={{ borderRadius: 0 }}
          >
            <span role="img" aria-label="Funeral Info">{t("funeralDetails")} <img src={ChevronRightUrl} className="w-6 h-6 inline-block" /> </span>
          </button>
        )}
      </div>
      <div className="flex flex-col justify-between p-3 h-full min-h-[180px] relative">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 line-clamp-2">
            {lang === 'kok' ? konkaniName : englishName}
          </h3>
          {(relationNameEn || relationNameKok) && (
            <p className="line-clamp-2 md:text-base text-lg text-slate-700">
              <strong>
                {relationType ? t(`relation.${relationType}`) : t("obituary.relation")}
                :</strong>{" "}
              {lang === 'kok' ? relationNameKok : relationNameEn}
            </p>
          )}
          {age !== undefined && (
            <p className="md:text-base text-lg text-slate-700">
              <strong>{t("age")}:</strong> {age}
            </p>
          )}
          {ward && (
            <p className="md:text-base text-lg text-slate-700">
              <strong>{t("ward")}:</strong> {ward ? t(`ward.${ward}`) : t("ward.name")}
            </p>
          )}
          {dateOfDeath && (
            <p className="md:text-base text-lg text-slate-700">
              <strong>{t("death")}:</strong>{" "}
              {new Date(dateOfDeath).toLocaleDateString("en-GB")}
            </p>
          )}
        </div>
        <div className="absolute bottom-1 right-1">
          <button
            className="share-button cursor-pointer transform transition-transform duration-300 hover:scale-110 px-3 py-2 text-sm"
            onClick={() => {
              if (navigator.share) {
                navigator.share(shareData);
              } else {
                navigator.clipboard.writeText(shareData.url);
                alert("Link copied!");
              }
            }}
            aria-label="Share"
            type="button"
          >
            <img src={ShareIconUrl} alt="Share" className="w-7 h-7 inline-block" />
          </button>
        </div>
      </div>
    </div>
  );
}

type FuneralDetailsPanelProps = {
  details?: string;
  youtubeLink?: string;
  onClose: () => void;
  height?: number;
};

function FuneralDetailsPanel({ details, youtubeLink, onClose, height }: FuneralDetailsPanelProps) {
  const t = useTranslation();
  return (
    <div
      className="relative rounded-sm bg-white shadow p-3 md:p-6 flex flex-col justify-center items-center animate-fadeIn flex-grow box-border"
      style={{
        width: "100%",
        maxWidth: "95vw",
        minHeight: "auto",
        ...(height ? { height: `${height}px` } : {}),
        ...(typeof window !== "undefined" && window.innerWidth >= 768 ? { minHeight: "420px" } : {}),
      }}
    >
      <button
        className="absolute top-3 right-4 text-4xl font-bold text-gray-600 hover:text-red-600 cursor-pointer"
        onClick={onClose}
        type="button"
        aria-label="Close"
      >
        ×
      </button>
      <h3 className="text-2xl font-bold text-yellow-600 mb-4">🕊️ {t("funeralDetails")} 🕊️ </h3>
      <div className="text-lg mb-4 whitespace-pre-line">{details}</div>
      {youtubeLink && (
        <a
          href={youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex rounded-sm items-center gap-2 px-4 py-2 bg-red-600 text-white shadow hover:bg-red-700"
        >
          <img src={YouTubeIconUrl} alt="YouTube" className="w-7 h-7 inline-block" />
          {t("watchOnYoutube")}
        </a>
      )}
    </div>
  );
}

export default function ObituaryListWithWidePanel({ obituaries, lang }: ObituaryListWithWidePanelProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);

  function handleExpand(idx: number) {
    setExpandedIdx(idx);
  }
  function handleClose() {
    setExpandedIdx(null);
  }

  useLayoutEffect(() => {
    if (expandedIdx !== null && cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    } else {
      setCardHeight(undefined);
    }
  }, [expandedIdx]);

  return (
    <LanguageContext.Provider value={lang || "en"}>
      {expandedIdx !== null ? (
        <div className="flex flex-col items-center justify-center w-full pt-4">
          <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center w-full max-w-4xl">
            <div ref={cardRef} className="flex-shrink-0 flex justify-center">
              <ObituaryCard
                {...obituaries[expandedIdx]}
                showFuneralButton={!!obituaries[expandedIdx].funeralDetails}
                isExpanded
                lang={lang}
              />
            </div>
            <FuneralDetailsPanel
              details={obituaries[expandedIdx].funeralDetails}
              youtubeLink={obituaries[expandedIdx].youtubeLink}
              onClose={handleClose}
              height={cardHeight}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 justify-items-center">
          {obituaries.map((item, idx) => (
            <ObituaryCard
              key={item.id}
              {...item}
              showFuneralButton={!!item.funeralDetails}
              onFuneralClick={() => handleExpand(idx)}
              lang={lang}
            />
          ))}
        </div>
      )}
    </LanguageContext.Provider>
  );
}
