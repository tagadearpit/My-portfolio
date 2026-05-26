"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // Mobile guard
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Check if device is touch-based
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }
  }, []);

  // Motion values are stable references, no need for deps
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => { isVisibleRef.current = false; setIsVisible(false); };
    const handleMouseEnter = () => { isVisibleRef.current = true; setIsVisible(true); };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouch]); // Stable deps

  if (isTouch || !isVisible) return null;

  return (
    // Single container to prevent mix-blend-difference double-blending
    <div className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference">
      {/* Center dot */}
      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full -translate-x-1 -translate-y-1"
        style={{ x: cursorX, y: cursorY }}
      />
      {/* Magnetic ring */}
      <motion.div
        className="absolute w-8 h-8 border border-white/50 rounded-full -translate-x-4 -translate-y-4"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
    </div>
  );
}