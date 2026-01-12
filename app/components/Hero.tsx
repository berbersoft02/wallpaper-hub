"use client";

import { ArrowDown, Gamepad2 } from "lucide-react";
import DraggableIcon from "./DraggableIcon";

// Define all floating icons with their properties
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
  { src: "/23.png", bottom: "50%", right: "40%", size: "sm" as const, animation: "float-random-7 21s ease-in-out 1.6s infinite, hologram 6s ease-in-out 1s infinite", ringColor: "ring-neon-purple/40", shadowColor: "shadow-[0_0_18px_rgba(211,0,197,0.6)]" },
  { src: "/24.png", top: "35%", left: "35%", size: "md" as const, animation: "float-random-8 14s ease-in-out 2.3s infinite, neon-pulse 4s ease-in-out infinite", ringColor: "ring-neon-cyan/40", shadowColor: "shadow-[0_0_22px_rgba(5,217,232,0.5)]" },
  { src: "/25.png", bottom: "18%", left: "22%", size: "sm" as const, animation: "float-random-1 15s ease-in-out 1.1s infinite, glitch 7s ease-in-out infinite", ringColor: "ring-neon-pink/40", shadowColor: "shadow-[0_0_20px_rgba(255,42,109,0.5)]" },
  { src: "/26.png", top: "65%", left: "28%", size: "md" as const, animation: "float-random-2 18s ease-in-out 0.4s infinite, electric 5s ease-in-out 1s infinite", ringColor: "ring-neon-purple/50", shadowColor: "shadow-[0_0_25px_rgba(211,0,197,0.5)]" },
  { src: "/27.png", top: "18%", right: "22%", size: "sm" as const, animation: "float-random-3 20s ease-in-out 2.6s infinite, breathe 5s ease-in-out infinite", effect: "animate-breathe", ringColor: "ring-neon-cyan/50", shadowColor: "shadow-[0_0_18px_rgba(5,217,232,0.6)]" },
  { src: "/28.png", bottom: "45%", left: "38%", size: "md" as const, animation: "float-random-4 16s ease-in-out 0.9s infinite, cyber-flicker 4s ease-in-out infinite", ringColor: "ring-neon-pink/40", shadowColor: "shadow-[0_0_22px_rgba(255,42,109,0.5)]" },
  { src: "/29.png", top: "45%", right: "18%", size: "sm" as const, animation: "float-random-5 19s ease-in-out 1.7s infinite, rainbow-border 5s linear infinite", effect: "animate-rainbow-border rounded-full", ringColor: "ring-transparent", shadowColor: "" },
  { src: "/30.png", bottom: "12%", right: "35%", size: "md" as const, animation: "float-random-6 17s ease-in-out 2.4s infinite, hologram 6s ease-in-out 2s infinite", ringColor: "ring-neon-purple/50", shadowColor: "shadow-[0_0_20px_rgba(211,0,197,0.6)]" },
  { src: "/31.png", top: "28%", left: "55%", size: "sm" as const, animation: "float-random-7 21s ease-in-out 0.6s infinite, neon-pulse 3s ease-in-out 0.5s infinite", ringColor: "ring-neon-cyan/40", shadowColor: "shadow-[0_0_18px_rgba(5,217,232,0.5)]" },
  { src: "/32.png", top: "15%", left: "35%", size: "md" as const, animation: "float-random-1 15s ease-in-out 1.5s infinite, electric 4s ease-in-out infinite", ringColor: "ring-neon-pink/50", shadowColor: "shadow-[0_0_22px_rgba(255,42,109,0.5)]" },
  { src: "/33.png", bottom: "35%", left: "45%", size: "sm" as const, animation: "float-random-2 18s ease-in-out 0.8s infinite, breathe 5s ease-in-out infinite", effect: "animate-breathe", ringColor: "ring-neon-cyan/50", shadowColor: "shadow-[0_0_18px_rgba(5,217,232,0.5)]" },
  { src: "/34.png", top: "65%", right: "45%", size: "lg" as const, animation: "float-random-3 20s ease-in-out 2.1s infinite, hologram 7s ease-in-out infinite", effect: "animate-hologram", ringColor: "ring-neon-purple/50", shadowColor: "shadow-[0_0_25px_rgba(211,0,197,0.6)]" },
  { src: "/35.png", top: "40%", right: "35%", size: "md" as const, animation: "float-random-4 16s ease-in-out 1.2s infinite, glitch 5s ease-in-out infinite", ringColor: "ring-neon-pink/40", shadowColor: "shadow-[0_0_20px_rgba(255,42,109,0.5)]" },
  { src: "/36.png", bottom: "10%", right: "15%", size: "sm" as const, animation: "float-random-5 19s ease-in-out 0.4s infinite, neon-pulse 4s ease-in-out infinite", ringColor: "ring-neon-cyan/40", shadowColor: "shadow-[0_0_18px_rgba(5,217,232,0.6)]" },
  { src: "/37.png", top: "50%", left: "12%", size: "md" as const, animation: "float-random-6 17s ease-in-out 1.9s infinite, cyber-flicker 4s ease-in-out infinite", effect: "animate-cyber-flicker", ringColor: "ring-neon-purple/40", shadowColor: "shadow-[0_0_22px_rgba(211,0,197,0.5)]" },
  { src: "/38.png", bottom: "55%", left: "25%", size: "sm" as const, animation: "float-random-7 21s ease-in-out 2.7s infinite, rainbow-border 5s linear infinite", effect: "animate-rainbow-border rounded-full", ringColor: "ring-transparent", shadowColor: "" },
  { src: "/39.png", top: "10%", right: "8%", size: "md" as const, animation: "float-random-8 15s ease-in-out 1.3s infinite, electric 4s ease-in-out infinite", ringColor: "ring-neon-cyan/50", shadowColor: "shadow-[0_0_22px_rgba(5,217,232,0.5)]" },
  { src: "/40.png", bottom: "20%", left: "55%", size: "sm" as const, animation: "float-random-1 18s ease-in-out 0.5s infinite, breathe 5s ease-in-out infinite", effect: "animate-breathe", ringColor: "ring-neon-pink/50", shadowColor: "shadow-[0_0_20px_rgba(255,42,109,0.5)]" },
  { src: "/41.png", top: "30%", left: "5%", size: "lg" as const, animation: "float-random-2 22s ease-in-out 2s infinite, hologram 6s ease-in-out infinite", effect: "animate-hologram", ringColor: "ring-neon-purple/50", shadowColor: "shadow-[0_0_25px_rgba(211,0,197,0.6)]" },
  { src: "/42.png", bottom: "5%", right: "50%", size: "md" as const, animation: "float-random-3 16s ease-in-out 1.8s infinite, cyber-flicker 5s ease-in-out infinite", ringColor: "ring-neon-cyan/40", shadowColor: "shadow-[0_0_20px_rgba(5,217,232,0.5)]" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
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

      {/* Background Decor Icons with Glow */}
      <div className="absolute top-20 left-10 text-neon-pink/20 animate-bounce z-10 drop-shadow-[0_0_15px_rgba(255,42,109,0.8)]">
        <Gamepad2 size={64} />
      </div>
      <div className="absolute bottom-20 right-10 text-neon-cyan/20 animate-pulse z-10 drop-shadow-[0_0_15px_rgba(5,217,232,0.8)]">
        <Gamepad2 size={80} />
      </div>

      <div className="relative z-10 max-w-4xl space-y-6">
        <div className="inline-block bg-neon-purple/30 px-6 py-2 rounded-full border-2 border-neon-purple mb-4 shadow-[0_0_20px_rgba(211,0,197,0.5)] animate-fade-in">
          <span className="font-pixel text-neon-pink text-sm md:text-base drop-shadow-[0_0_8px_rgba(255,42,109,0.8)]">✨ WELCOME TO MY WORLD</span>
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

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
          <a href="#gallery" className="group relative px-8 py-4 bg-neon-pink font-pixel text-xl text-white overflow-hidden transition-all hover:scale-110 shadow-[0_0_32px_rgba(255,42,109,0.6)] hover:shadow-[0_0_48px_rgba(255,42,109,0.9)] rounded-lg border-2 border-neon-pink/50">
            <span className="relative z-10 group-hover:tracking-wider transition-all">BROWSE GALLERY</span>
            <div className="absolute inset-0 h-full w-full bg-neon-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </a>
          
          <a href="https://www.tiktok.com/@noxzx_kb" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white font-pixel text-xl text-white hover:bg-white hover:text-dark-bg transition-all hover:scale-110 shadow-[0_0_24px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.7)] rounded-lg">
             TIKTOK CHANNEL
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ArrowDown className="text-neon-cyan w-8 h-8" />
      </div>
    </section>
  );
}
