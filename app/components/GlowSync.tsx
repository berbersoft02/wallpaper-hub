"use client";

import { useEffect } from "react";

export default function GlowSync() {
  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      const root = document.documentElement;
      
      root.style.setProperty('--x', x.toFixed(2));
      root.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
      root.style.setProperty('--y', y.toFixed(2));
      root.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  return null;
}
