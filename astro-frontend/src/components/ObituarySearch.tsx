import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import SearchIcon from "~/assets/icons/search.svg?react";
import ChevronClose from "~/assets/icons/cancel.svg?react";
import { Locale } from "~/enums/locale";
import { getPlaceholderImage } from "~/helpers/get-placeholder-image";
import type { Obituary } from "~/models/obituary";
import { searchObituaries } from "~/services/obituaries/obituary-search";
import { getNoResultsMessage } from "~/helpers/get-no-result-message";
import { obituaryRelationMapKok } from "~/constants/obituary-relation-map-kok";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, query: string) {
  if (!query) return text;

  const safeQuery = escapeRegExp(query);
  const parts = text.split(new RegExp(`(${safeQuery})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-natgeo-yellow">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

interface Props {
  locale: Locale;
}

export default function ObituarySearch({ locale }: Props) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Obituary[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [open, setOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const searchObituaryMessage =
    locale === Locale.KOK ? "ಸೊದಪ್..." : "Search obituaries...";

  React.useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setOpen(true);

      try {
        const data = await searchObituaries(query);
        if (!cancelled) {
          setResults(data);
          setActiveIndex(-1);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, locale]);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handleClear();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  function handleClear() {
    setQuery("");
    setResults([]);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const index = activeIndex >= 0 ? activeIndex : 0;
      const base = locale === Locale.KOK ? "/kok" : "";
      window.location.href = `${base}/obituary/${results[index].slug}`;
    }

    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <Popover.Root
      open={open}
      modal={false}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setActiveIndex(-1);
      }}
    >
      <div className="relative w-full max-w-md">
        <Popover.Anchor asChild>
          <div className="relative w-full">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <SearchIcon width={18} height={18} />
            </div>

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (query.length >= 2 && results.length) setOpen(true);
              }}
              placeholder={searchObituaryMessage}
              aria-label="Search obituaries"
              aria-autocomplete="list"
              aria-expanded={open}
              className="
                w-full
                border border-gray-300
                pl-10 pr-10 py-2
                focus:outline-none
                focus:ring-0
              "
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
              >
                <ChevronClose width={18} height={18} />
              </button>
            )}
          </div>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            align="start"
            side="bottom"
            sideOffset={4}
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="
              z-0
              w-(--radix-popover-trigger-width)
              border border-gray-300
              bg-white
            "
          >
            {loading && (
              <ul>
                {[1, 2, 3].map((i) => (
                  <li key={i} className="px-4 py-3 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/4 bg-gray-200" />
                        <div className="h-3 w-1/2 bg-gray-100" />
                      </div>
                      <div className="h-13 w-13 rounded-full bg-gray-200" />
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {!loading && results.length > 0 && (
              <ul
                role="listbox"
                className="max-h-64 overflow-y-auto"
                onMouseLeave={() => setActiveIndex(-1)}
              >
                {results.map((obituary, index) => {
                  const name =
                    locale === Locale.KOK
                      ? obituary.konkaniName
                      : obituary.englishName;

                  const obituaryImage = obituary.image?.formats?.thumbnail?.url
                    ? new URL(
                        obituary.image.formats.thumbnail.url,
                        import.meta.env.PUBLIC_STRAPI_URL,
                      ).toString()
                    : getPlaceholderImage({
                        text: obituary.englishName,
                        width: 48,
                        height: 48,
                      });

                  return (
                    <li
                      key={obituary.id}
                      role="option"
                      aria-selected={activeIndex === index}
                      className={`flex cursor-pointer items-center gap-3 px-4 py-3 ${
                        activeIndex === index
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => {
                        const base = locale === Locale.KOK ? "/kok" : "";
                        window.location.href = `${base}/obituary/${obituary.slug}`;
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-slate-900">
                          {highlightText(name, query)}
                        </div>
                        {(obituary.relationType ||
                          obituary.relationNameEn ||
                          obituary.relationNameKok) && (
                          <div className="mt-0.5 text-xs text-slate-500">
                            {locale === Locale.KOK ? (
                              <>
                                {obituary.relationType && (
                                  <span>
                                    {highlightText(
                                      obituaryRelationMapKok[
                                        obituary.relationType
                                      ] || obituary.relationType,
                                      query,
                                    )}
                                    :{" "}
                                  </span>
                                )}
                                {obituary.relationNameKok &&
                                  highlightText(
                                    obituary.relationNameKok,
                                    query,
                                  )}
                              </>
                            ) : (
                              <>
                                {obituary.relationType && (
                                  <span>
                                    {highlightText(
                                      obituary.relationType,
                                      query,
                                    )}
                                    :{" "}
                                  </span>
                                )}
                                {obituary.relationNameEn &&
                                  highlightText(obituary.relationNameEn, query)}
                              </>
                            )}
                          </div>
                        )}
                        {obituary.age && (
                          <div className="mt-0.5 text-xs text-slate-500">
                            {locale === Locale.KOK ? (
                              <>
                                ಪ್ರಾಯ್:{" "}
                                {highlightText(String(obituary.age), query)}
                              </>
                            ) : (
                              <>
                                Age:{" "}
                                {highlightText(String(obituary.age), query)}
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      <img
                        src={obituaryImage}
                        alt=""
                        loading="lazy"
                        className="h-13 w-13 shrink-0 rounded-full object-cover"
                      />
                    </li>
                  );
                })}
              </ul>
            )}

            {!loading && query.length >= 2 && results.length === 0 && (
              <div className="p-4 text-center text-md text-gray-500">
                {getNoResultsMessage(query, locale)}
              </div>
            )}
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
}
