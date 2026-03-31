"use client";

import { Download, Heart, Maximize2, X, ChevronLeft, ChevronRight, Terminal, Loader2, Palette, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback, Suspense, useMemo, useRef } from "react";
import { GlowCard } from "./ui/spotlight-card";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import Lightbox from "./Lightbox";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { useCyberSound } from "@/lib/hooks/useCyberSound";
import RecommendationButton from "./RecommendationButton";
import DownloadModal from "./DownloadModal";

interface Wallpaper {
  id: string;
  url: string;
  character: string;
  title: string;
  category: string;
  tags?: string[];
}

interface CharacterData {
  name: string;
  category: string;
  wallpapers: string[];
  tags?: string[];
}

const cloudinaryLoader = ({ src, width, quality }: any) => {
  if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
    const parts = src.split('/upload/');
    return `${parts[0]}/upload/w_${width},q_${quality || 75},f_auto/${parts[1]}`;
  }
  return src;
};

function PixelImage({ src, alt, className, fill, width, height, unoptimized, ...props }: any) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideo = src.match(/\.(mp4|webm)/i);

  if (isVideo) {
    return (
      <video
        src={src}
        className={`${className} ${isLoaded ? 'pixel-loaded' : 'pixel-loading'}`}
        muted
        loop
        autoPlay
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        crossOrigin="anonymous"
        {...props}
      />
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      {!isLoaded && <div className="absolute inset-0 pixel-placeholder z-0" />}
      <Image
        loader={cloudinaryLoader}
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={`${className} ${isLoaded ? 'pixel-loaded' : 'pixel-loading'}`}
        onLoad={() => setIsLoaded(true)}
        crossOrigin="anonymous"
        {...props}
      />
    </div>
  );
}

function GalleryContent({ onRecommendClick }: { onRecommendClick: () => void }) {
  const { playSound } = useCyberSound();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [specialCollections, setSpecialCollections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(24);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{url: string, title: string} | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { favorites, toggleFavorite, isFavorite } = useFavorites<Wallpaper>("wallpapers-favs");

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) setFilter(filterParam);
  }, [searchParams]);

  useEffect(() => {
    const loadWallpapers = async () => {
      try {
        const response = await fetch(`/api/wallpapers?t=${Date.now()}`);
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        const data = await response.json();
        
        if (data.characters && data.characters.length > 0) {
          const allWallpapers: Wallpaper[] = [];
          const animeNames: string[] = [];
          const specialNames: string[] = [];

          const priorityNames = ["Frieren", "Violet Evergarden", "Shiina Mahiru", "Alya Kujou ♡", "Shikimori Micchon", "Mixed"];
          const priorityChars = data.characters.filter((c: CharacterData) => priorityNames.includes(c.name));
          const otherChars = data.characters.filter((c: CharacterData) => !priorityNames.includes(c.name));

          // 1. Gather all wallpapers from any entry that has "Desktop" in its name
          const desktopWallpapers: string[] = [];
          data.characters.forEach((char: CharacterData) => {
            if (char.name.toLowerCase().includes("desktop")) {
              char.wallpapers.forEach(url => {
                if (!desktopWallpapers.includes(url)) desktopWallpapers.push(url);
              });
            }
          });

          // 2. Add them to the global list under the unified name "Desktop Wallpapers"
          if (desktopWallpapers.length > 0) {
            specialNames.push("Desktop Wallpapers");
            desktopWallpapers.forEach((url, i) => {
              allWallpapers.push({ 
                id: `desktop-unified-${i}`, 
                url, 
                character: "Desktop Wallpapers", 
                title: `Desktop Setup - ${i + 1}`, 
                category: "Special", 
                tags: ["PC", "4K", "Desktop"] 
              });
            });
          }

          // 3. Process other characters (excluding the ones we just unified)
          otherChars.forEach((char: CharacterData) => {
            if (!char.name.toLowerCase().includes("desktop")) {
              if (char.category === 'Special') specialNames.push(char.name);
              else animeNames.push(char.name);

              char.wallpapers.forEach((url, i) => {
                allWallpapers.push({ id: `${char.name}-${i}`, url, character: char.name, title: `${char.name} - ${i + 1}`, category: char.category || 'Anime', tags: char.tags || [] });
              });
            }
          });

          // Sort specialNames to put Desktop Wallpapers first if it exists
          const finalSpecialNames = Array.from(new Set(specialNames)).sort((a, b) => {
            if (a === "Desktop Wallpapers") return -1;
            if (b === "Desktop Wallpapers") return 1;
            return a.localeCompare(b);
          });

          const priorityDataList = priorityNames.map(name => priorityChars.find((c: any) => c.name === name)).filter(Boolean);
          const maxLength = Math.max(...priorityDataList.map((c: any) => c.wallpapers.length), 0);

          for (let i = maxLength - 1; i >= 0; i--) {
             for (let j = priorityDataList.length - 1; j >= 0; j--) {
                const char: any = priorityDataList[j];
                if (char.wallpapers[i]) {
                  allWallpapers.push({ id: `${char.name}-${i}`, url: char.wallpapers[i], character: char.name, title: `${char.name} - ${i + 1}`, category: char.category || 'Anime', tags: char.tags || [] });
                }
             }
          }

          setWallpapers(allWallpapers);
          setSpecialCollections(Array.from(new Set(specialNames)).sort());
          setCharacters(Array.from(new Set(animeNames)).sort());
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load wallpapers.');
      } finally {
        setLoading(false);
      }
    };
    loadWallpapers();
  }, []);

  const everything = useMemo(() => [...wallpapers].reverse(), [wallpapers]);

  const filteredItems = useMemo(() => {
    let filtered = filter === "All" ? everything : filter === "Favorites" ? favorites : wallpapers.filter(w => w.character === filter).reverse();
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(w => w.character.toLowerCase().includes(q) || w.category.toLowerCase().includes(q) || w.tags?.some(t => t.toLowerCase().includes(q)));
    }
    return filtered;
  }, [filter, everything, wallpapers, searchQuery, favorites]);

  const finalDisplay = useMemo(() => filteredItems.slice(0, displayCount), [filteredItems, displayCount]);

  useEffect(() => {
    setDisplayCount(12);
  }, [filter, searchQuery]);

  const getCount = (name: string) => wallpapers.filter(w => w.character === name).length;

  useEffect(() => {
    const imageParam = searchParams.get('image');
    if (imageParam) {
      const index = finalDisplay.findIndex(w => w.id === imageParam);
      if (index !== -1) {
        setSelectedImageIndex(index);
      }
    } else {
      setSelectedImageIndex(null);
    }
  }, [searchParams, finalDisplay]);

  const triggerDownload = (url: string, title: string) => {
    const isVideo = url.toLowerCase().match(/\.(mp4|webm)$/);
    const ext = isVideo ? 'mp4' : 'jpg';
    const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${ext}`;
    const downloadUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${filename}`;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadClick = (url: string, title: string) => {
    setPendingDownload({ url, title });
    setIsDownloadModalOpen(true);
  };

  const handleCloseLightbox = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('image');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const renderCharacterName = (charName: string) => {
    const formattedName = charName.replace(/-/g, ' ');
    const stickerSlug = charName.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');
    return (
      <span className="inline-flex items-center gap-2">
        {formattedName}
        <img src={`/stickers/${stickerSlug}.png`} alt="sticker" className="w-6 h-6 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </span>
    );
  };

  return (
    <>
      <section id="gallery" className="py-20 px-4 md:px-12 bg-dark-bg/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-pixel text-4xl md:text-5xl text-center mb-12 text-neon-cyan animate-glow-cyan">
            <span className="text-white">LATEST</span> DROPS
          </h2>
          <div className="flex flex-col items-center gap-8 mb-16">
            <div className="w-full max-w-2xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-purple rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative flex items-center bg-black/80 border border-gray-700 rounded-xl px-4 py-3 focus-within:ring-neon-cyan ring-1 ring-white/10 transition-all">
                <Terminal className="text-neon-cyan mr-3 animate-pulse" size={24} />
                <input type="text" placeholder="search: character, tag..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-white font-mono focus:outline-none" />
                {searchQuery && <button onClick={() => { setSearchQuery(""); playSound('click'); }}><X size={20} className="text-gray-400 hover:text-neon-pink" /></button>}
              </div>
            </div>
            <RecommendationButton onClick={onRecommendClick} />
          </div>

          {specialCollections.length > 0 && (
            <div className="w-full max-w-6xl mt-4 mb-4">
              <h3 className="text-neon-cyan font-pixel text-xl mb-6 text-center tracking-widest">FEATURED COLLECTIONS</h3>
              <div className="flex flex-wrap justify-center gap-4">
                  {specialCollections.map((char) => (
                    <button key={char} onMouseEnter={() => playSound('hover')} onClick={() => { setFilter(char); playSound('click'); }} className={`px-6 py-3 rounded-xl transition-all border backdrop-blur-md ${filter === char ? "bg-neon-cyan/20 border-neon-cyan text-white scale-105" : "bg-white/5 border-white/10 text-gray-300 hover:border-neon-cyan/50 hover:bg-white/10"}`}>
                      <div className="flex items-center gap-3">{renderCharacterName(char)} <span className="text-xs opacity-50">{getCount(char)}</span></div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          <div className="w-full max-w-6xl">
            <h3 className="text-neon-pink font-pixel text-lg mb-6 text-center tracking-widest opacity-70 uppercase">Anime ARCHIVE</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <button onMouseEnter={() => playSound('hover')} onClick={() => { setFilter("All"); playSound('click'); }} className={`px-6 py-2 rounded-full font-pixel text-sm transition-all border ${filter === "All" ? "bg-neon-pink border-neon-pink text-white" : "bg-dark-bg/50 border-gray-700 text-gray-400"}`}>ALL <span className="ml-2 opacity-50">{everything.length}</span></button>
              {favorites.length > 0 && <button onMouseEnter={() => playSound('hover')} onClick={() => { setFilter("Favorites"); playSound('click'); }} className={`px-6 py-2 rounded-full font-pixel text-sm transition-all border flex items-center gap-2 ${filter === "Favorites" ? "bg-white text-dark-bg" : "bg-dark-bg/50 border-gray-700 text-neon-pink"}`}><Star size={16} fill={filter === "Favorites" ? "black" : "none"} /> FAVS ({favorites.length})</button>}
              {characters.map(char => (
                <button key={char} onMouseEnter={() => playSound('hover')} onClick={() => { setFilter(char); playSound('click'); }} className={`px-5 py-2 rounded-full transition-all border text-sm flex items-center gap-2 ${filter === char ? "bg-neon-purple/20 border-neon-purple text-white shadow-[0_0_15px_rgba(211,0,197,0.4)] scale-105" : "bg-dark-bg/30 border-gray-800 text-gray-400 hover:border-neon-cyan/50"}`}>
                  {renderCharacterName(char)} <span className="text-[10px] opacity-40">{getCount(char)}</span>
                </button>
              ))}
            </div>
          </div>
          
          {loading ? <div className="text-center py-20 font-pixel text-neon-cyan animate-pulse">Loading Archive...</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {finalDisplay.map((wp, index) => {
                const getGlowColor = (category: string) => {
                  if (category === 'Special') return 'purple';
                  if (category === 'Anime') return 'blue';
                  return 'blue';
                };

                // Detect if it's a desktop wallpaper by character name or title
                const isDesktop = wp.character.toLowerCase().includes("desktop") || 
                                 wp.title.toLowerCase().includes("desktop");

                return (
                  <GlowCard 
                    key={wp.id} 
                    glowColor={getGlowColor(wp.category)}
                    customSize={true}
                    className="group relative bg-card-bg/40 border-gray-800 rounded-lg overflow-hidden transition-all duration-500 hover:border-neon-pink/50 cursor-pointer" 
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set('image', wp.id);
                      router.push(`${pathname}?${params.toString()}`, { scroll: false });
                    }}
                  >
                    <div className={`${isDesktop ? "aspect-video" : "aspect-[9/16]"} relative overflow-hidden rounded-t-lg`}>
                       <PixelImage 
                          src={wp.url} 
                          alt={wp.title} 
                          fill 
                          sizes={isDesktop ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                       />
                    </div>
                    <div className="p-4 flex justify-between items-center bg-dark-bg/60 backdrop-blur-md rounded-b-lg border-t border-white/5">
                      <div className="truncate flex-1 mr-2">
                        <h3 className="font-pixel text-lg text-white truncate">{wp.title}</h3>
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{wp.character}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); toggleFavorite(wp); playSound('click'); }} className="p-2 hover:scale-125 transition-transform">
                        <Heart size={20} className={isFavorite(wp.id) ? "text-neon-pink fill-neon-pink drop-shadow-[0_0_8px_rgba(255,42,109,0.8)]" : "text-gray-500"} />
                      </button>
                    </div>
                  </GlowCard>
                );
              })}
            </div>
          )}
          {!loading && displayCount < filteredItems.length && (
            <div className="flex justify-center mt-12">
              <button onMouseEnter={() => playSound('hover')} onClick={() => { setDisplayCount(prev => prev + 24); playSound('click'); }} className="font-pixel px-12 py-4 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all rounded-lg shadow-[0_0_20px_rgba(5,217,232,0.3)]">SHOW MORE WALLPAPERS</button>
            </div>
          )}
        </div>
      </section>

      {selectedImageIndex !== null && (
        <Lightbox images={filteredItems.map(w => w.url)} titles={filteredItems.map(w => w.title)} selectedIndex={selectedImageIndex} onClose={handleCloseLightbox} onPrev={() => { setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : filteredItems.length - 1); playSound('click'); }} onNext={() => { setSelectedImageIndex(prev => prev! < filteredItems.length - 1 ? prev! + 1 : 0); playSound('click'); }} onDownload={handleDownloadClick} />
      )}

      <DownloadModal 
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onConfirm={() => pendingDownload && triggerDownload(pendingDownload.url, pendingDownload.title)}
        fileName={pendingDownload?.title || ""}
      />
    </>
  );
}

export default function Gallery({ onRecommendClick }: { onRecommendClick: () => void }) {
  return (
    <Suspense fallback={<div className="py-20 text-center font-pixel text-neon-cyan">Loading Archive...</div>}>
      <GalleryContent onRecommendClick={onRecommendClick} />
    </Suspense>
  );
}
