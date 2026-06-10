"use client";

import { useRef, useState, useEffect } from "react";
import { Gamepad2, Sparkles } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import DraggableIcon from "./DraggableIcon";
import ParticlesBackground from "./ParticlesBackground";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import { HeroSection } from "./ui/feature-carousel";

interface HeroProps {
  showcaseImages: { src: string; alt: string; }[];
}

// Reduced floating icons to 20 for better performance
const floatingIcons = [
  { src: "/3.png", top: "50%", left: "3%", size: "lg" as const, animation: "float-random-3 20s ease-in-out infinite, neon-pulse 3s ease-in-out infinite", ringColor: "ring-neon-cyan/50", shadowColor: "shadow-[0_0_24px_rgba(5,217,232,0.6)]" },
  { src: "/4.png", top: "45%", right: "10%", size: "md" as const, animation: "float-random-4 16s ease-in-out infinite, electric 3s ease-in-out infinite", ringColor: "ring-neon-pink/50", shadowColor: "shadow-[0_0_20px_rgba(255,42,109,0.6)]" },
  { src: "/5.png", bottom: "20%", left: "6%", size: "sm" as const, animation: "float-random-5 19s ease-in-out infinite, breathe 4s ease-in-out infinite", effect: "animate-rainbow-border rounded-full", ringColor: "ring-transparent", shadowColor: "" },
  { src: "/6.png", bottom: "25%", right: "4%", size: "lg" as const, animation: "float-random-6 17s ease-in-out infinite, hologram 6s ease-in-out infinite", effect: "animate-hologram", ringColor: "ring-neon-purple/50", shadowColor: "shadow-[0_0_30px_rgba(211,0,197,0.6)]" },
  { src: "/7.png", top: "30%", left: "25%", size: "sm" as const, animation: "float-random-7 21s ease-in-out infinite, glitch 5s ease-in-out infinite", ringColor: "ring-neon-cyan/30", shadowColor: "shadow-[0_0_25px_rgba(5,217,232,0.5)]" },
  { src: "/8.png", bottom: "35%", right: "20%", size: "md" as const, animation: "float-random-8 14s ease-in-out infinite, cyber-flicker 4s ease-in-out infinite", effect: "animate-cyber-flicker", ringColor: "ring-neon-pink/40", shadowColor: "shadow-[0_0_20px_rgba(255,42,109,0.5)]" },
  { src: "/9.png", top: "5%", left: "50%", size: "sm" as const, animation: "float-random-1 15s ease-in-out 2s infinite, neon-pulse 4s ease-in-out infinite", ringColor: "ring-neon-cyan/50", shadowColor: "shadow-[0_0_18px_rgba(5,217,232,0.6)]" },
  { src: "/10.png", top: "70%", left: "40%", size: "md" as const, animation: "float-random-2 18s ease-in-out 3s infinite, electric 5s ease-in-out infinite", ringColor: "ring-neon-purple/40", shadowColor: "shadow-[0_0_22px_rgba(211,0,197,0.5)]" },
  { src: "/11.png", top: "25%", right: "35%", size: "sm" as const, animation: "float-random-3 20s ease-in-out 1.5s infinite, breathe 5s ease-in-out infinite", effect: "animate-breathe", ringColor: "ring-neon-pink/50", shadowColor: "shadow-[0_0_20px_rgba(255,42,109,0.5)]" },
  { src: "/12.png", bottom: "10%", left: "30%", size: "md" as const, animation: "float-random-4 16s ease-in-out 2.5s infinite, hologram 7s ease-in-out infinite", ringColor: "ring-neon-cyan/40", shadowColor: "shadow-[0_0_25px_rgba(5,217,232,0.6)]" },
  { src: "/13.png", top: "8%", left: "15%", size: "sm" as const, animation: "float-random-5 19s ease-in-out 0.5s infinite, rainbow-border 5s linear infinite", effect: "animate-rainbow-border rounded-full", ringColor: "ring-transparent", shadowColor: "" },
  { src: "/14.png", top: "60%", right: "15%", size: "md" as const, animation: "float-random-6 17s ease-in-out 1s infinite, electric 4s ease-in-out 0.5s infinite", ringColor: "ring-neon-pink/40", shadowColor: "shadow-[0_0_20px_rgba(255,42,109,0.5)]" },
  { src: "/15.png", top: "40%", left: "20%", size: "sm" as const, animation: "float-random-7 21s ease-in-out 1.2s infinite, neon-pulse 5s ease-in-out infinite", ringColor: "ring-neon-cyan/40", shadowColor: "shadow-[0_0_18px_rgba(5,217,232,0.5)]" },
  { src: "/16.png", bottom: "15%", right: "25%", size: "md" as const, animation: "float-random-8 14s ease-in-out 0.8s infinite, hologram 5s ease-in-out infinite", effect: "animate-hologram", ringColor: "ring-neon-purple/50", shadowColor: "shadow-[0_0_25px_rgba(211,0,197,0.5)]" },
  { src: "/17.png", top: "20%", right: "45%", size: "sm" as const, animation: "float-random-1 15s ease-in-out 2.2s infinite, glitch 6s ease-in-out infinite", ringColor: "ring-neon-cyan/50", shadowColor: "shadow-[0_0_20px_rgba(5,217,232,0.6)]" },
  { src: "/18.png", bottom: "40%", left: "15%", size: "md" as const, animation: "float-random-2 18s ease-in-out 1.8s infinite, cyber-flicker 5s ease-in-out infinite", ringColor: "ring-neon-pink/40", shadowColor: "shadow-[0_0_22px_rgba(255,42,109,0.5)]" },
  { src: "/19.png", top: "75%", right: "30%", size: "sm" as const, animation: "float-random-3 20s ease-in-out 0.3s infinite, breathe 4s ease-in-out infinite", effect: "animate-breathe", ringColor: "ring-neon-purple/40", shadowColor: "shadow-[0_0_18px_rgba(211,0,197,0.5)]" },
  { src: "/20.png", top: "12%", left: "60%", size: "md" as const, animation: "float-random-4 16s ease-in-out 1.4s infinite, neon-pulse 3s ease-in-out 1s infinite", ringColor: "ring-neon-cyan/50", shadowColor: "shadow-[0_0_25px_rgba(5,217,232,0.6)]" },
  { src: "/21.png", bottom: "30%", right: "12%", size: "sm" as const, animation: "float-random-5 19s ease-in-out 2.8s infinite, rainbow-border 4s linear infinite", effect: "animate-rainbow-border rounded-full", ringColor: "ring-transparent", shadowColor: "" },
  { src: "/22.png", top: "55%", left: "45%", size: "md" as const, animation: "float-random-6 17s ease-in-out 0.7s infinite, electric 4s ease-in-out 2s infinite", ringColor: "ring-neon-pink/50", shadowColor: "shadow-[0_0_20px_rgba(255,42,109,0.5)]" },
];

export default function Hero({ showcaseImages }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable floating icons on desktop to save mobile performance
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax layers
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background layers transforms
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
      className="relative min-h-[140vh] md:min-h-[160vh] flex flex-col items-center text-center px-4 overflow-hidden pt-32"
    >
      <ParticlesBackground />

      <motion.div style={{ x: gridX, y: gridY, scale: 1.1 }} className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, #05d9e8 1px, transparent 1px), linear-gradient(to bottom, #05d9e8 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </motion.div>

      <motion.div style={{ x: glowX, y: glowY, scale: 1.2 }} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-neon-pink/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-neon-cyan/10 blur-[120px] rounded-full" />
      </motion.div>

      {/* Only render floating icons on desktop */}
      {isDesktop && floatingIcons.map((icon, index) => (
        <DraggableIcon key={index} src={icon.src} alt="" initialTop={icon.top || ""} initialLeft={icon.left} initialRight={icon.right} initialBottom={icon.bottom} size={icon.size} animation={icon.animation} effect={icon.effect} ringColor={icon.ringColor} shadowColor={icon.shadowColor} />
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <motion.div style={{ x: textX, y: textY }} className="max-w-4xl space-y-6 mb-20">
          <div className="inline-block bg-neon-purple/30 px-6 py-2 rounded-full border-2 border-neon-purple mb-4 shadow-[0_0_20px_rgba(211,0,197,0.5)]">
            <span className="font-pixel text-neon-pink text-sm md:text-base drop-shadow-[0_0_8px_rgba(255,42,109,0.8)] flex items-center gap-2">
              <Sparkles size={16} /> WELCOME TO MY WORLD
            </span>
          </div>
          <h1 className="font-pixel text-5xl md:text-8xl leading-tight animate-glow-hero drop-shadow-[0_0_24px_var(--color-neon-pink)]">
            LEVEL UP YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-orange-400 to-neon-cyan animate-sparkle">SCREENS</span>
          </h1>
          <p className="font-body text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto">
            Welcome here! Dive into my ocean of exclusive wallpapers. Follow me <span className="text-orange-400 font-bold animate-glow-orange drop-shadow-[0_0_12px_rgba(251,146,60,0.8)]">Only_Gohan</span> on TikTok!
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
            <InteractiveHoverButton href="#gallery" text="BROWSE GALLERY" className="shadow-[0_0_32px_rgba(255,42,109,0.6)] hover:shadow-[0_0_48px_rgba(255,42,109,0.9)]" />
            <InteractiveHoverButton href="https://www.tiktok.com/@noxzx_kb" target="_blank" rel="noopener noreferrer" text="TIKTOK CHANNEL" className="border-white shadow-[0_0_24px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.7)]" />
          </div>
        </motion.div>

        <div className="w-full relative mt-10">
          <div className="absolute inset-0 bg-neon-cyan/5 blur-[100px] rounded-full pointer-events-none" />
          {showcaseImages && showcaseImages.length > 0 ? (
            <HeroSection images={showcaseImages} className="min-h-0 py-10 md:py-20" />
          ) : (
            <div className="h-[400px] flex items-center justify-center font-pixel text-neon-cyan animate-pulse uppercase tracking-[0.3em]">Synchronizing Neural Link...</div>
          )}
        </div>
      </div>

      <div className="absolute top-20 left-10 text-neon-pink/20 animate-bounce z-10 drop-shadow-[0_0_15px_rgba(255,42,109,0.8)] pointer-events-none"><Gamepad2 size={64} /></div>
      <div className="absolute bottom-20 right-10 text-neon-cyan/20 animate-pulse z-10 drop-shadow-[0_0_15px_rgba(5,217,232,0.8)] pointer-events-none"><Gamepad2 size={80} /></div>
    </section>
  );
}
