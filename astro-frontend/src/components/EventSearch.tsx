import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import SearchIcon from "~/assets/icons/search.svg?react";
import ChevronClose from "~/assets/icons/cancel.svg?react";
import type { Event } from "~/models/event";
import { Locale } from "~/enums/locale";
import { searchEvents } from "~/services/events/event-search";
import { Message } from "~/constants/message";

function highlightText(text: string, query: string) {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

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

interface EventSearchProps {
  locale: Locale;
}

export default function EventSearch({ locale }: EventSearchProps) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const emptyStateMessage =
    locale === Locale.KOK
      ? Message.EVENTS_NOT_FOUND_KOK
      : Message.EVENTS_NOT_FOUND;

  const searchEventsMessage =
    locale === Locale.KOK ? "ಘಡಿತಾ ಸೊಧಾ..." : "Search events...";

  React.useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setOpen(true);
      const data = await searchEvents(query, locale);
      setResults(data);
      setActiveIndex(-1);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  function handleClear() {
    setQuery("");
    setResults([]);
    setOpen(false);
    setActiveIndex(-1);
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

    if (e.key === "Enter" && activeIndex >= 0) {
      window.location.href = `/events/${results[activeIndex].slug}`;
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={false}>
      <div className="relative w-full max-w-md">
        <Popover.Anchor asChild>
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <SearchIcon width={18} height={18} />
            </div>

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (query.length >= 2 && results.length > 0) setOpen(true);
              }}
              placeholder={searchEventsMessage}
              aria-label="Search events"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
                aria-label="Clear search"
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
                  <li key={i} className="px-4 py-2 animate-pulse">
                    <div className="h-4 bg-gray-200 w-3/4" />
                  </li>
                ))}
              </ul>
            )}

            {!loading && results.length > 0 && (
              <ul className="max-h-64 overflow-y-auto">
                {results.map((event, index) => {
                  const title =
                    locale === Locale.KOK
                      ? event.konkaniTitle
                      : event.englishTitle;

                  return (
                    <li
                      key={event.id}
                      className={`px-4 py-2 cursor-pointer ${
                        activeIndex === index
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() =>
                        (window.location.href = `/events/${event.slug}`)
                      }
                    >
                      {highlightText(title, query)}
                    </li>
                  );
                })}
              </ul>
            )}

            {!loading && query.length >= 2 && results.length === 0 && (
              <div className="px-4 py-2 text-gray-500">{emptyStateMessage}</div>
            )}
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
}
