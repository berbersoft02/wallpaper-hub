"use client";

import { Download, Heart, Star } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { GlowCard } from "./ui/spotlight-card";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { useCyberSound } from "@/lib/hooks/useCyberSound";

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
    <section id="icons" className="py-20 px-4 md:px-12 bg-dark-bg/30 relative overflow-hidden border-t border-gray-800">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-pixel text-4xl md:text-5xl text-center mb-12 text-neon-purple animate-glow-purple">
          <span className="text-white">ICONS</span> & PFPS
        </h2>

        <div className="flex justify-center gap-4 mb-12">
           <button
             onMouseEnter={() => playSound('hover')}
             onClick={() => { setFilter("All"); playSound('click'); }}
             className={`px-6 py-2 rounded-full font-pixel text-sm transition-all border ${filter === "All" ? "bg-neon-purple border-neon-purple text-white shadow-[0_0_15px_rgba(211,0,197,0.5)] scale-105" : "bg-dark-bg/50 border-gray-700 text-gray-400 hover:border-neon-purple"}`}
           >
             ALL ({icons.length})
           </button>
           {favorites.length > 0 && (
             <button
               onMouseEnter={() => playSound('hover')}
               onClick={() => { setFilter("Favorites"); playSound('click'); }}
               className={`px-6 py-2 rounded-full font-pixel text-sm transition-all border flex items-center gap-2 ${filter === "Favorites" ? "bg-white text-dark-bg shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-105" : "bg-dark-bg/50 border-gray-700 text-neon-pink hover:bg-neon-pink/10"}`}
             >
               <Star size={16} fill={filter === "Favorites" ? "black" : "none"} />
               FAVS ({favorites.length})
             </button>
           )}
        </div>

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
