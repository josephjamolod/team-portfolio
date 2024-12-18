"use client";

import { motion } from "motion/react";

export function AnimatedText() {
  return (
    <>
      {"Connectivity".split("").map((word, idx) => (
        <motion.span
          key={idx}
          className="inline-block"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.04 }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}
