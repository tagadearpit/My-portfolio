"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const bootLines = [
  "mounting identity graph",
  "verifying system boundaries",
  "loading project telemetry",
  "interface online",
];

export function BootSequence() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("arpit-portfolio-booted");
    if (reduceMotion || seen) {
      const hideTimer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(hideTimer);
    }

    const lineTimer = window.setInterval(() => {
      setLine((current) => Math.min(current + 1, bootLines.length - 1));
    }, 420);

    const exitTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("arpit-portfolio-booted", "true");
      setVisible(false);
    }, 2200);

    return () => {
      window.clearInterval(lineTimer);
      window.clearTimeout(exitTimer);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div className="boot-grid" aria-hidden="true" />
          <motion.div
            className="boot-core"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="boot-orbit boot-orbit-one" />
            <div className="boot-orbit boot-orbit-two" />
            <div className="boot-monogram">AT</div>
          </motion.div>
          <div className="boot-copy">
            <span className="eyebrow">PORTFOLIO CORE / 2026</span>
            <strong>{bootLines[line]}</strong>
            <div className="boot-progress" aria-hidden="true">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.05, ease: "easeInOut" }}
              />
            </div>
          </div>
          <button
            type="button"
            className="boot-skip"
            onClick={() => {
              window.sessionStorage.setItem("arpit-portfolio-booted", "true");
              setVisible(false);
            }}
          >
            Skip sequence
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
