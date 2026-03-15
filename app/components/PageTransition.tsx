"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const glitchVariants = {
  initial: { 
    opacity: 0, 
    x: -20,
    filter: "hue-rotate(90deg) blur(10px)",
  },
  animate: { 
    opacity: 1, 
    x: 0,
    filter: "hue-rotate(0deg) blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    filter: "hue-rotate(-90deg) blur(10px)",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    }
  }
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={glitchVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}