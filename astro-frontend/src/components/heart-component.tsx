"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeartComponent() {
  const [fillLevel, setFillLevel] = useState(0);
  const [count, setCount] = useState(0);
  const [clickAnimations, setClickAnimations] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    // Trigger click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);

    // Create +1 animation
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const newAnimation = {
        id: Date.now(),
        x: rect.width / 2,
        y: 0,
      };
      setClickAnimations((prev) => [...prev, newAnimation]);

      // Remove animation after it completes
      setTimeout(() => {
        setClickAnimations((prev) =>
          prev.filter((anim) => anim.id !== newAnimation.id)
        );
      }, 1000);
    }

    // Increment count on every click
    setCount((prev) => prev + 1);

    // Cycle through fill levels: 0 -> 30 -> 60 -> 100 -> 0
    setFillLevel((prev) => {
      if (prev === 0) return 30;
      if (prev === 30) return 60;
      if (prev === 60) return 100;
      return 0;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 mr-3 mt-2">
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={handleClick}
            className="relative w-10 h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 cursor-pointer"
            aria-label={`Like button, currently ${fillLevel}% filled, ${count} likes`}
          >
            {/* Heart outline */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                stroke="black"
                strokeWidth="0.8"
                className="stroke-red-500"
              />
            </svg>

            {/* Filled heart with clip path */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                clipPath: `inset(${100 - fillLevel}% 0 0 0)`,
                scale:
                  fillLevel === 100
                    ? [1, 1.15, 1] // Continuous pulse when fully filled
                    : isClicked
                      ? [1, 1.2, 1]
                      : 1, // Quick pulse on click
              }}
              transition={{
                clipPath: {
                  duration: 0.4,
                  ease: "easeInOut",
                },
                scale:
                  fillLevel === 100
                    ? {
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        repeatDelay: 0.2,
                      }
                    : {
                        duration: 0.3,
                        ease: "easeOut",
                      },
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#f43f5e"
                  className="fill-red-500"
                />
              </svg>
            </motion.div>
          </button>

          {/* +1 Animations */}
          <AnimatePresence>
            {clickAnimations.map((animation) => (
              <motion.div
                key={animation.id}
                className="absolute pointer-events-none text-red-500 font-bold"
                initial={{ opacity: 1, y: 0, x: animation.x + 39 }}
                animate={{ opacity: 0, y: -40, x: animation.x + 30 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                +1
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Count display */}
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-red-500 tabular-nums">
            {count}
          </span>
        </div>
      </div>
    </div>
  );
}
