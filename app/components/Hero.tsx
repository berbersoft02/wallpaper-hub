"use client";

import { useRef } from "react";
import { Gamepad2 } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import DraggableIcon from "./DraggableIcon";
import ParticlesBackground from "./ParticlesBackground";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import { HeroSection } from "./ui/feature-carousel";

// Define carousel images
const carouselImages = [
  { src: "/3.png", alt: "Wallpaper 3" },
  { src: "/4.png", alt: "Wallpaper 4" },
  { src: "/5.png", alt: "Wallpaper 5" },
  { src: "/6.png", alt: "Wallpaper 6" },
  { src: "/7.png", alt: "Wallpaper 7" },
  { src: "/8.png", alt: "Wallpaper 8" },
  { src: "/9.png", alt: "Wallpaper 9" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax layers
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background layers transforms (different speeds)
  const gridX = useTransform(smoothX, [-0.5, 0.5], ["-5%", "5%"]);
  const gridY = useTransform(smoothY, [-0.5, 0.5], ["-5%", "5%"]);
  
  const glowX = useTransform(smoothX, [-0.5, 0.5], ["-10%", "10%"]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["-10%", "10%"]);

  const textX = useTransform(smoothX, [-0.5, 0.5], ["-2%", "2%"]);
  const textY = useTransform(smoothY, [-0.5, 0.5], ["-2%", "2%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Interactive WebGL Particles Layer */}
      <ParticlesBackground />

      {/* --- PARALLAX BACKGROUND LAYERS --- */}
      
      {/* 1. Deep Grid Layer */}
      <motion.div 
        style={{ x: gridX, y: gridY, scale: 1.1 }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: "linear-gradient(to right, #05d9e8 1px, transparent 1px), linear-gradient(to bottom, #05d9e8 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </motion.div>

      {/* 2. Floating Radial Glows */}
      <motion.div 
        style={{ x: glowX, y: glowY, scale: 1.2 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-neon-pink/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-neon-cyan/10 blur-[120px] rounded-full" />
      </motion.div>

      {/* Background Decor Icons with Glow */}
      <div className="absolute top-20 left-10 text-neon-pink/20 animate-bounce z-10 drop-shadow-[0_0_15px_rgba(255,42,109,0.8)]">
        <Gamepad2 size={64} />
      </div>
      <div className="absolute bottom-20 right-10 text-neon-cyan/20 animate-pulse z-10 drop-shadow-[0_0_15px_rgba(5,217,232,0.8)]">
        <Gamepad2 size={80} />
      </div>

      <motion.div 
        style={{ x: textX, y: textY }}
        className="relative z-10 max-w-6xl w-full space-y-6 pt-12"
      >
        <div className="inline-block bg-neon-purple/30 px-6 py-2 rounded-full border-2 border-neon-purple mb-4 shadow-[0_0_20px_rgba(211,0,197,0.5)] animate-fade-in">
          <span className="font-pixel text-neon-pink text-sm md:text-base drop-shadow-[0_0_8px_rgba(255,42,109,0.8)]">✨ WELCOME TO MY WORLD</span>
        </div>
        
        <HeroSection 
          title={
            <>
              LEVEL UP YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-orange-400 to-neon-cyan animate-sparkle">
                SCREENS
              </span>
            </>
          }
          subtitle="Welcome here! Dive into my ocean of exclusive wallpapers. Follow me Only_dias on TikTok!"
          images={carouselImages}
        />

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12 pb-12">
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
    </section>
  );
}