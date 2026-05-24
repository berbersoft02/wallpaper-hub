import React from 'react';
import { HeroSection } from "./ui/feature-carousel";

interface WallpaperShowcaseProps {
  images: { src: string; alt: string; }[];
}

export default function WallpaperShowcase({ images }: WallpaperShowcaseProps) {
  if (!images || images.length === 0) return null;

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
          images={images}
          className="min-h-0 py-10"
        />
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </section>
  );
}
