"use client";

import { useEffect, useRef, useState } from "react";
import { Fireworks } from "fireworks-js";
import { motion, useReducedMotion } from "framer-motion";

export default function FireworksButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fireworksRef = useRef<Fireworks | null>(null);
  const [isActive, setIsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (containerRef.current) {
      fireworksRef.current = new Fireworks(containerRef.current, {
        maxRockets: 4,
        rocketSpawnInterval: 150,
        numParticles: 60,
        traceLength: 3,
        traceSpeed: 0.4,
        explosionMinHeight: 0.3,
        explosionMaxHeight: 0.8,
        hue: { min: 0, max: 360 },
        brightness: { min: 40, max: 80 },
        gravity: 0.015,
        autoresize: true,
      });
    }
    return () => fireworksRef.current?.stop();
  }, []);

  const handleFireworks = () => {
    if (isActive) return; // Prevent multiple clicks
    setIsActive(true);
    fireworksRef.current?.start();
    setTimeout(() => {
      fireworksRef.current?.stop();
      setIsActive(false);
    }, 10000); // Fireworks last 8 seconds
  };

  const buttonVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: shouldReduceMotion ? 0 : 0.5,
      },
    },
    hover: shouldReduceMotion
      ? {}
      : {
          scale: 1.05,
          transition: { type: "spring", stiffness: 200, damping: 10 },
        },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.5 },
    },
  };

  return (
    <>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-40 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      />

      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 sm:bottom-8 sm:left-8">
        <motion.button
          onClick={handleFireworks}
          disabled={isActive}
          className={`cursor-pointer
            flex items-center gap-2 px-5 py-2.5 rounded-full
            bg-white/90 text-gray-800 dark:bg-gray-900/80 dark:text-white
            backdrop-blur-md border border-gray-200 dark:border-gray-700
            shadow-sm hover:shadow-md transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          `}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap={isActive ? {} : { scale: 0.97 }}
          aria-label="Trigger fireworks animation"
          title="Click to celebrate"
        >
          {isActive ? "Celebrating..." : "Celebrate With Us!"}
        </motion.button>
      </div>
    </>
  );
}
