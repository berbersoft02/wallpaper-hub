"use client";

import { Download, Heart, Star, LayoutGrid, Zap } from "lucide-react";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { GlowCard } from "./ui/spotlight-card";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { useCyberSound } from "@/lib/hooks/useCyberSound";
import { HeroSection } from "./ui/feature-carousel";

interface IconItem {
  id: number;
  url: string;
  title: string;
}

export default function IconsPFPs() {
  const [filter, setFilter] = useState<"All" | "Favorites">("All");
  const [displayCount, setDisplayCount] = useState(12);
  const { playSound } = useCyberSound();
  
  // Array of images from 1 to 69
  const icons = useMemo(() => Array.from({ length: 69 }, (_, i) => ({
    id: i + 1,
    url: `/${i + 1}.png`,
    title: `Matching PFP #${i + 1}`,
  })), []);

  const showcaseIcons = useMemo(() => {
    // Pick 12 random icons for the carousel
    return [...icons]
      .sort(() => Math.random() - 0.5)
      .slice(0, 12)
      .map(icon => ({
        src: icon.url,
        alt: icon.title
      }));
  }, [icons]);

  const { favorites, toggleFavorite, isFavorite } = useFavorites<IconItem>("pfps-favs");

  const filteredIcons = useMemo(() => {
    if (filter === "Favorites") return favorites;
    return icons;
  }, [filter, icons, favorites]);

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="icons" className="py-24 px-4 md:px-12 bg-dark-bg/40 relative overflow-hidden border-t border-gray-800">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. INTEGRATED CAROUSEL --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 mb-4">
              <Zap size={14} className="text-neon-purple animate-pulse" />
              <span className="font-pixel text-xs text-neon-purple uppercase tracking-widest">Trending Now</span>
            </div>
            <h2 className="font-pixel text-4xl md:text-6xl text-white mb-6">
              FEATURED <span className="text-neon-purple">PROFILE</span> ART
            </h2>
            <p className="font-body text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Curated matching icons and high-fidelity avatars from our latest collection drops.
            </p>
          </div>

          <div className="bg-black/20 rounded-3xl border border-white/5 p-4 md:p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
            <HeroSection 
              images={showcaseIcons}
              className="min-h-0 py-4 md:py-10"
            />
          </div>
        </div>

        {/* --- 2. GRID CONTROLS --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-t border-white/5 pt-16">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neon-purple/20 rounded-xl border border-neon-purple/40">
              <LayoutGrid size={24} className="text-neon-purple" />
            </div>
            <div className="text-left">
              <h3 className="font-pixel text-2xl text-white uppercase tracking-tight">Full Archive</h3>
              <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Database: {icons.length} Entries</p>
            </div>
          </div>

          <div className="flex bg-black/40 p-1 rounded-full border border-gray-800">
             <button
               onClick={() => { setFilter("All"); playSound('click'); }}
               className={`px-8 py-2 rounded-full font-pixel text-sm transition-all ${filter === "All" ? "bg-neon-purple text-white shadow-[0_0_20px_rgba(211,0,197,0.4)]" : "text-gray-500 hover:text-white"}`}
             >
               ALL
             </button>
             {favorites.length > 0 && (
               <button
                 onClick={() => { setFilter("Favorites"); playSound('click'); }}
                 className={`px-8 py-2 rounded-full font-pixel text-sm transition-all flex items-center gap-2 ${filter === "Favorites" ? "bg-white text-dark-bg" : "text-gray-500 hover:text-white"}`}
               >
                 FAVORITES ({favorites.length})
               </button>
             )}
          </div>
        </div>

        {/* --- 3. THE GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredIcons.slice(0, displayCount).map((icon) => (
            <GlowCard 
              key={icon.id}
              glowColor="purple"
              customSize={true}
              className="group relative bg-card-bg/40 border-gray-800 hover:border-neon-purple/50 transition-all duration-500 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(211,0,197,0.3)]"
            >
              <div className="aspect-square relative overflow-hidden rounded-t-xl">
                <Image 
                  src={icon.url}
                  alt={icon.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={() => { handleDownload(icon.url, icon.title); playSound('click'); }}
                    className="p-3 bg-neon-purple text-white rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(211,0,197,0.5)]"
                  >
                    <Download size={20} />
                  </button>
                  <button 
                    onClick={() => { toggleFavorite(icon); playSound('click'); }}
                    className={`p-3 rounded-full hover:scale-110 transition-transform ${isFavorite(icon.id) ? "bg-neon-pink text-white" : "bg-white/10 backdrop-blur-md text-white"}`}
                  >
                    <Heart size={20} fill={isFavorite(icon.id) ? "white" : "none"} />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-dark-bg/60 backdrop-blur-md border-t border-white/5 rounded-b-xl">
                <h3 className="font-pixel text-sm text-gray-200 truncate">{icon.title}</h3>
              </div>
            </GlowCard>
          ))}
        </div>

        {displayCount < filteredIcons.length && (
          <div className="flex justify-center mt-12">
            <button
              onMouseEnter={() => playSound('hover')}
              onClick={() => { setDisplayCount(prev => prev + 12); playSound('click'); }}
              className="font-pixel px-8 py-4 border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all rounded-lg hover:shadow-[0_0_24px_rgba(211,0,197,0.6)]"
            >
              Load More Icons
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
