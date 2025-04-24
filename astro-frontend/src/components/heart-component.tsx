"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { strapiPost } from "~/helpers/strapi-post";
import type { Event } from "~/models/event";
import { ROUTES } from "~/constants/strapi-endpoints";

export default function HeartComponent({
  slug,
  initialCount,
}: {
  slug: string;
  initialCount: number;
}) {
  const getFillLevel = (count: number) => {
    if (count >= 3) return 100;
    if (count === 2) return 60;
    if (count === 1) return 30;
    return 0;
  };

  const getLocalCount = (slug: string): number => {
    if (typeof window === "undefined") return 0;
    const data = localStorage.getItem(slug);
    return data ? parseInt(data) : 0;
  };

  const setLocalCount = (slug: string, count: number) => {
    localStorage.setItem(slug, count.toString());
  };

  const [count, setCount] = useState(0);
  const [fillLevel, setFillLevel] = useState(0);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [clickAnimations, setClickAnimations] = useState<
    { id: number; x: number }[]
  >([]);
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateStateFromStorage = () => {
      const localCount = getLocalCount(slug);
      const finalCount = Math.max(initialCount, localCount);
      setCount(finalCount);
      setFillLevel(getFillLevel(localCount));
      setShouldPulse(localCount >= 3);
    };

    updateStateFromStorage();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === slug) {
        updateStateFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [slug, initialCount]);

  const handleClick = async () => {
    const currentLocal = getLocalCount(slug);
    if (currentLocal >= 3) return;

    // Animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const newAnimation = { id: Date.now(), x: rect.width / 2 };
      setClickAnimations((prev) => [...prev, newAnimation]);
      setTimeout(() => {
        setClickAnimations((prev) =>
          prev.filter((anim) => anim.id !== newAnimation.id)
        );
      }, 1000);
    }

    try {
      const data = await strapiPost<Event>({
        endpoint: ROUTES.LIKE_EVENTS(slug),
      });

      if (!data) throw new Error("Failed to increment likes");

      const serverCount = data.likes;
      const newLocalCount = currentLocal + 1;

      setLocalCount(slug, newLocalCount);
      setCount(serverCount);
      setFillLevel(getFillLevel(newLocalCount));
      if (newLocalCount >= 3) setShouldPulse(true);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[200px] p-4">
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="flex items-center justify-center bg-red-100 hover:bg-red-200 transition-colors rounded-full px-2 py-2 h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 cursor-pointer"
          aria-label={`Like button, ${fillLevel}% filled, ${count} likes`}
        >
          <div className="relative w-6 h-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full absolute"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                  C13.09 3.81 14.76 3 16.5 3
                  19.58 3 22 5.42 22 8.5
                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                stroke="currentColor"
                strokeWidth="0.8"
                className="stroke-red-500"
              />
            </svg>
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                clipPath: `inset(${100 - fillLevel}% 0 0 0)`,
                scale:
                  fillLevel === 100 && shouldPulse
                    ? [1, 1.2, 1]
                    : isClicked
                      ? [1, 1.25, 1]
                      : 1,
              }}
              transition={{
                clipPath: { duration: 0.4, ease: "easeInOut" },
                scale:
                  fillLevel === 100 && shouldPulse
                    ? {
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        repeatDelay: 0.2,
                      }
                    : { duration: 0.3, ease: "easeOut" },
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                    2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                    C13.09 3.81 14.76 3 16.5 3
                    19.58 3 22 5.42 22 8.5
                    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  className="fill-red-500"
                />
              </svg>
            </motion.div>
          </div>

          <span className="font-semibold text-red-500 tabular-nums min-w-[22px] text-center pt-2">
            {count}
          </span>

          <AnimatePresence>
            {clickAnimations.map((a) => (
              <motion.span
                key={a.id}
                className="absolute pointer-events-none text-red-500 font-bold"
                initial={{ opacity: 1, y: 0, x: a.x }}
                animate={{ opacity: 0, y: -40, x: a.x }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                +1
              </motion.span>
            ))}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
