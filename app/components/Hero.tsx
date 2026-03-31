"use client";

import { useRef, useState, useEffect } from "react";
import { Gamepad2, Sparkles } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import DraggableIcon from "./DraggableIcon";
import ParticlesBackground from "./ParticlesBackground";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import { HeroSection } from "./ui/feature-carousel";
import wallpapersData from '@/app/data/wallpapers.json';

// ... (floatingIcons array stays the same)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showcaseImages, setShowcaseImages] = useState<{ src: string; alt: string; }[]>([]);

  useEffect(() => {
    const chars = [...wallpapersData.characters];
    const selected: { src: string; alt: string; }[] = [];
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    for (const char of chars) {
      if (char.wallpapers && char.wallpapers.length > 0) {
        const randomWp = char.wallpapers[Math.floor(Math.random() * char.wallpapers.length)];
        selected.push({ src: randomWp, alt: `${char.name} 4K Archive` });
      }
      if (selected.length >= 12) break;
    }
    setShowcaseImages(selected);
  }, []);

  // ... (parallax motion values and logic stays the same)

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[140vh] md:min-h-[160vh] flex flex-col items-center text-center px-4 overflow-hidden pt-32"
    >
      {/* Interactive WebGL Particles Layer */}
      <ParticlesBackground />

      {/* ... (background parallax divs stay the same) ... */}

      {/* Draggable Floating Icons */}
      {floatingIcons.map((icon, index) => (
        <DraggableIcon
          key={index}
          src={icon.src}
          alt={`Anime character ${index + 3}`}
          initialTop={icon.top || ""}
          initialLeft={icon.left}
          initialRight={icon.right}
          initialBottom={icon.bottom}
          size={icon.size}
          animation={icon.animation}
          effect={icon.effect}
          ringColor={icon.ringColor}
          shadowColor={icon.shadowColor}
        />
      ))}

      {/* Hero Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          style={{ x: textX, y: textY }}
          className="max-w-4xl space-y-6 mb-20"
        >
          <div className="inline-block bg-neon-purple/30 px-6 py-2 rounded-full border-2 border-neon-purple mb-4 shadow-[0_0_20px_rgba(211,0,197,0.5)] animate-fade-in">
            <span className="font-pixel text-neon-pink text-sm md:text-base drop-shadow-[0_0_8px_rgba(255,42,109,0.8)] flex items-center gap-2">
              <Sparkles size={16} /> WELCOME TO MY WORLD
            </span>
          </div>
          
          <h1 className="font-pixel text-5xl md:text-8xl leading-tight animate-glow-hero drop-shadow-[0_0_24px_var(--color-neon-pink)]">
            LEVEL UP YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-orange-400 to-neon-cyan animate-sparkle">
              SCREENS
            </span>
          </h1>
          
          <p className="font-body text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto animate-fade-in-delay">
            Welcome here! Dive into my ocean of exclusive wallpapers. Follow me <span className="text-orange-400 font-bold animate-glow-orange drop-shadow-[0_0_12px_rgba(251,146,60,0.8)]">Only_dias</span> on TikTok!
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
            <InteractiveHoverButton 
              href="#gallery"
              text="BROWSE GALLERY"
              className="shadow-[0_0_32px_rgba(255,42,109,0.6)] hover:shadow-[0_0_48px_rgba(255,42,109,0.9)]"
            />
            
            <InteractiveHoverButton 
              href="https://www.tiktok.com/@noxzx_kb"
              target="_blank"
              rel="noopener noreferrer"
              text="TIKTOK CHANNEL"
              className="border-white shadow-[0_0_24px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.7)]"
            />
          </div>
        </motion.div>

        {/* --- THE 3D CAROUSEL INTEGRATED IN HERO --- */}
        <div className="w-full relative mt-10 animate-fade-in-up">
          <div className="absolute inset-0 bg-neon-cyan/5 blur-[100px] rounded-full pointer-events-none" />
          {showcaseImages.length > 0 ? (
            <HeroSection 
              images={showcaseImages}
              className="min-h-0 py-10 md:py-20"
            />
          ) : (
            <div className="h-[400px] flex items-center justify-center font-pixel text-neon-cyan animate-pulse uppercase tracking-[0.3em]">
              Synchronizing Neural Link...
            </div>
          )}
        </div>
      </div>

      {/* Background Decor Icons with Glow */}
      <div className="absolute top-20 left-10 text-neon-pink/20 animate-bounce z-10 drop-shadow-[0_0_15px_rgba(255,42,109,0.8)] pointer-events-none">
        <Gamepad2 size={64} />
      </div>
      <div className="absolute bottom-20 right-10 text-neon-cyan/20 animate-pulse z-10 drop-shadow-[0_0_15px_rgba(5,217,232,0.8)] pointer-events-none">
        <Gamepad2 size={80} />
      </div>
    </section>
  );
}
