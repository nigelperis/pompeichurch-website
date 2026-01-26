import { useEffect, useRef, useState } from "react";
import type { Event } from "~/models/event";
import { searchEvents } from "~/services/events/event-search";

function highlightText(text: string, query: string) {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-yellow-200 px-0.5 rounded">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export default function EventSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const data = await searchEvents(query);
      setResults(data);
      setActiveIndex(-1);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setResults([]);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search events..."
        className="w-full border px-3 py-2 rounded"
        aria-label="Search events"
      />

      {loading && (
        <ul className="absolute z-0 mt-1 w-full bg-white border shadow rounded-md">
          {[1, 2, 3].map((i) => (
            <li key={i} className="px-3 py-2 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </li>
          ))}
        </ul>
      )}

      {!loading && results.length > 0 && (
        <ul className="absolute z-0 mt-1 w-full bg-white border shadow rounded-md max-h-64 overflow-y-auto">
          {results.map((event, index) => (
            <li key={event.id}>
              <a
                href={`/events/${event.slug}`}
                className={`block px-3 py-2 ${
                  activeIndex === index ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                {highlightText(event.englishTitle, query)}
              </a>
            </li>
          ))}
        </ul>
      )}

      {!loading && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-0 mt-1 w-full bg-white border shadow rounded-md px-3 py-2 text-sm text-gray-500">
          No events found
        </div>
      )}
    </div>
  );
}
