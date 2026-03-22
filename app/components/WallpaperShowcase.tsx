"use client";

import React from 'react';
import { HeroSection } from "./ui/feature-carousel";

const showcaseImages = [
  { src: "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Zero%20Two/1.jpg", alt: "Zero Two 4K" },
  { src: "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Alya%20Kujou%20%E2%99%A1/1.jpg", alt: "Alya Kujou 4K" },
  { src: "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Frieren/1.jpg", alt: "Frieren 4K" },
  { src: "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Attack%20On%20Titan/1.webp", alt: "Attack On Titan 4K" },
  { src: "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Shiina%20Mahiru/1.jpg", alt: "Shiina Mahiru 4K" },
  { src: "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Rin%20Shima/1.jpg", alt: "Rin Shima 4K" },
  { src: "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Mixed/1.jpg", alt: "Mixed Collection 4K" },
];

export default function WallpaperShowcase() {
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
