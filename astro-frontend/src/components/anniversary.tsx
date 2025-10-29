"use client";

import { useEffect, useRef, useState } from "react";
import { Fireworks } from "fireworks-js";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "~/assets/react-icons/x.svg?react";

export default function AnniversaryFireworks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fireworksRef = useRef<Fireworks | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const DURATION = 10; // fireworks duration in seconds

  useEffect(() => {
    if (containerRef.current) {
      fireworksRef.current = new Fireworks(containerRef.current, {
        rocketsPoint: {
          min: 0,
          max: 100,
        },
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        explosion: 5,
        autoresize: true,
        brightness: {
          min: 50,
          max: 80,
        },
        boundaries: {
          x: 50,
          y: 50,
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        },
        sound: {
          enabled: false,
        },
      });
    }
    return () => fireworksRef.current?.stop();
  }, []);

  const handleFireworks = () => {
    if (isActive) return;

    setIsActive(true);
    setCountdown(DURATION);
    fireworksRef.current?.start();

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          fireworksRef.current?.stop();
          setIsActive(false);
          setShowModal(true); // show modal after celebration ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <>
      {/* Fireworks container */}
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Celebrate Button */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 sm:bottom-8 sm:left-8">
        <motion.button
          onClick={handleFireworks}
          disabled={isActive}
          className={`cursor-pointer
            flex items-center gap-2 px-6 py-3 rounded-full
            bg-white/90 text-gray-800 dark:bg-gray-900/80 dark:text-white
            backdrop-blur-md border border-gray-200 dark:border-gray-700
            shadow-sm hover:shadow-md transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={!isActive ? { scale: 1.05 } : {}}
          whileTap={!isActive ? { scale: 0.97 } : {}}
        >
          {isActive
            ? `🎆 Celebrating ${countdown}s`
            : "🎉 Celebrate 1 Year With Us!"}
        </motion.button>
      </div>

      {/* Celebration Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Floating message container */}
            <motion.div
              className="relative text-center px-6 py-10 sm:px-10 sm:py-12 text-white"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* X button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
                aria-label="Close"
              >
                <CloseIcon className="h-6 w-6 cursor-pointer" />
              </button>

              {/* Text with soft gradient glow */}
              <motion.h2
                className="text-3xl sm:text-4xl font-semibold mb-3 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Thank You for Celebrating With Us!
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your support means the world to us. One year down, and a
                lifetime to go — together in faith, community, and celebration.
                💛
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
