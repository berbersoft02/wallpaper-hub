"use client";

import React, { useState, useEffect } from 'react';
import { HeroSection } from "./ui/feature-carousel";
import wallpapersData from '@/app/data/wallpapers.json';

export default function WallpaperShowcase() {
  const [showcaseImages, setShowcaseImages] = useState<{ src: string; alt: string; }[]>([]);

  useEffect(() => {
    // Clone characters to avoid mutating source
    const chars = [...wallpapersData.characters];
    const selected: { src: string; alt: string; }[] = [];
    
    // Fisher-Yates shuffle
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    
    // Pick first 15 characters with wallpapers
    for (const char of chars) {
      if (char.wallpapers && char.wallpapers.length > 0) {
        // Pick a random wallpaper from this character
        const randomWp = char.wallpapers[Math.floor(Math.random() * char.wallpapers.length)];
        selected.push({
          src: randomWp,
          alt: `${char.name} 4K Archive`
        });
      }
      if (selected.length >= 15) break;
    }
    
    setShowcaseImages(selected);
  }, []);

  // Return null or placeholder while images are loading to prevent jumpy layout
  if (showcaseImages.length === 0) return (
    <section className="py-20 bg-dark-bg/20 min-h-[600px] flex items-center justify-center">
      <div className="font-pixel text-neon-cyan animate-pulse">Initializing Archives...</div>
    </section>
  );

  return (
    <section className="py-20 relative overflow-hidden bg-dark-bg/20 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-3xl md:text-5xl text-neon-cyan mb-4 drop-shadow-[0_0_15px_rgba(5,217,232,0.5)]">
            FEATURED <span className="text-white">ARCHIVES</span>
          </h2>
          <p className="font-body text-gray-400 text-lg max-w-2xl mx-auto">
            Experience our most iconic 4K anime collections in a dynamic 3D showcase.
          </p>
        </div>

        <HeroSection 
          images={showcaseImages}
          className="min-h-0 py-10"
        />
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </section>
  );
}
