"use client";

import { Download, Heart, Star, UserCircle, LayoutGrid } from "lucide-react";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { GlowCard } from "./ui/spotlight-card";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { useCyberSound } from "@/lib/hooks/useCyberSound";

interface PFPCharacter {
  name: string;
  icons: string[];
}

interface IconItem {
  id: string;
  url: string;
  character: string;
  title: string;
}

export default function IconsPFPs() {
  const [filter, setFilter] = useState("All");
  const [displayCount, setDisplayCount] = useState(12);
  const [pfpsByChar, setPfpsByChar] = useState<PFPCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const { playSound } = useCyberSound();
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites<IconItem>("pfps-favs");

  useEffect(() => {
    const fetchPfps = async () => {
      try {
        const res = await fetch('/api/wallpapers');
        const data = await res.json();
        if (data.pfps) {
          setPfpsByChar(data.pfps);
        }
      } catch (err) {
        console.error("Failed to fetch PFPs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPfps();
  }, []);

  const allIcons = useMemo(() => {
    const list: IconItem[] = [];
    pfpsByChar.forEach(char => {
      char.icons.forEach((url, i) => {
        list.push({
          id: `${char.name}-${i}`,
          url,
          character: char.name,
          title: `${char.name} PFP #${i + 1}`
        });
      });
    });
    return list.reverse();
  }, [pfpsByChar]);

  const filteredIcons = useMemo(() => {
    if (filter === "Favorites") return favorites;
    if (filter === "All") return allIcons;
    return allIcons.filter(icon => icon.character === filter);
  }, [filter, allIcons, favorites]);

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = `/api/download?url=${encodeURIComponent(url)}&filename=${title.replace(/\s+/g, '_').toLowerCase()}.png`;
    link.setAttribute('download', `${title}.png`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="py-20 text-center font-pixel text-neon-purple animate-pulse">
        Accessing Avatar Database...
      </div>
    );
  }

  return (
    <section id="icons" className="py-24 px-4 md:px-12 bg-dark-bg/30 relative overflow-hidden border-t border-gray-800">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-4xl md:text-6xl text-white mb-6 animate-glow-purple">
            PROFILE <span className="text-neon-purple">PICTURES</span>
          </h2>
          <p className="font-body text-gray-400 text-lg max-w-2xl mx-auto">
            High-quality anime avatars for Discord, TikTok, and social media. Grouped by character for easy discovery.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { setFilter("All"); setDisplayCount(12); playSound('click'); }}
              className={`px-6 py-2 rounded-full font-pixel text-sm transition-all border ${filter === "All" ? "bg-neon-purple border-neon-purple text-white shadow-[0_0_15px_rgba(211,0,197,0.5)]" : "bg-dark-bg/50 border-gray-700 text-gray-400 hover:border-neon-purple"}`}
            >
              ALL ({allIcons.length})
            </button>
            {favorites.length > 0 && (
              <button
                onClick={() => { setFilter("Favorites"); setDisplayCount(12); playSound('click'); }}
                className={`px-6 py-2 rounded-full font-pixel text-sm transition-all border flex items-center gap-2 ${filter === "Favorites" ? "bg-white text-dark-bg shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "bg-dark-bg/50 border-gray-700 text-neon-pink hover:bg-neon-pink/10"}`}
              >
                <Star size={16} fill={filter === "Favorites" ? "black" : "none"} />
                FAVS ({favorites.length})
              </button>
            )}
          </div>

          {pfpsByChar.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 border-t border-white/5 pt-8">
              {pfpsByChar.map(char => (
                <button
                  key={char.name}
                  onClick={() => { setFilter(char.name); setDisplayCount(12); playSound('click'); }}
                  className={`px-4 py-1 rounded-lg font-pixel text-[10px] uppercase tracking-wider transition-all ${filter === char.name ? "text-neon-purple border border-neon-purple shadow-[0_0_10px_rgba(211,0,197,0.3)]" : "text-gray-500 hover:text-gray-300 border border-transparent"}`}
                >
                  {char.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {finalIcons.map((icon) => (
            <GlowCard 
              key={icon.id}
              glowColor="purple"
              customSize={true}
              className="group relative bg-card-bg/40 border-gray-800 hover:border-neon-purple/50 transition-all duration-500 rounded-xl overflow-hidden"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image 
                  src={icon.url}
                  alt={icon.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => { handleDownload(icon.url, icon.title); playSound('click'); }}
                      className="p-3 bg-neon-purple text-white rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(211,0,197,0.5)]"
                    >
                      <Download size={20} />
                    </button>
                    <button 
                      onClick={() => { toggleFavorite(icon); playSound('click'); }}
                      className="p-3 bg-white text-dark-bg rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    >
                      <Heart size={20} className={isFavorite(icon.id) ? "fill-neon-pink text-neon-pink" : ""} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-black/40 backdrop-blur-md border-t border-white/5">
                <p className="font-pixel text-[10px] text-gray-400 uppercase tracking-widest text-center truncate">{icon.character}</p>
              </div>
            </GlowCard>
          ))}
        </div>

        {displayCount < filteredIcons.length && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => { setDisplayCount(prev => prev + 12); playSound('click'); }}
              className="px-10 py-4 font-pixel text-xl border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all rounded-lg hover:shadow-[0_0_24px_rgba(211,0,197,0.6)]"
            >
              LOAD MORE AVATARS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
