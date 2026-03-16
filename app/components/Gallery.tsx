"use client";

import { Download, Heart, Maximize2, X, ChevronLeft, ChevronRight, Terminal, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback, Suspense, useMemo, useRef } from "react";
import SpotlightCard from "./SpotlightCard";
import { useSearchParams } from "next/navigation";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import Lightbox from "./Lightbox";

// ... existing interfaces and PixelImage ...
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
        {...props}
      />
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      {!isLoaded && <div className="absolute inset-0 pixel-placeholder z-0" />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        unoptimized={unoptimized}
        className={`${className} ${isLoaded ? 'pixel-loaded' : 'pixel-loading'}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}

function GalleryContent() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [specialCollections, setSpecialCollections] = useState<string[]>([]);
  const [desktopCollections, setDesktopCollections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(12);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [showDownloadSuccessModal, setShowDownloadSuccessModal] = useState(false);
  const [recommendationForm, setRecommendationForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loaderRef = useRef<HTMLDivElement>(null);

  // Read filter from URL
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      setFilter(filterParam);
    }
  }, [searchParams]);

  // Load wallpapers from API
  useEffect(() => {
    const loadWallpapers = async () => {
      try {
        const response = await fetch(`/api/wallpapers?t=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }
        const data = await response.json();
        
        if (data.characters && data.characters.length > 0) {
          const allWallpapers: Wallpaper[] = [];
          const animeNames: string[] = [];
          const specialNames: string[] = [];
          const desktopNames: string[] = [];

          // Separate characters
          const priorityNames = [
            "Frieren", 
            "Violet Evergarden", 
            "Shiina Mahiru",
            "Alya Kujou ♡",
            "Shikimori Micchon",
            "Mixed"
          ];
          const priorityChars = data.characters.filter((c: CharacterData) => priorityNames.includes(c.name));
          const otherChars = data.characters.filter((c: CharacterData) => !priorityNames.includes(c.name));

          // 1. Process standard characters normally
          otherChars.forEach((char: CharacterData) => {
            if (char.name === 'Desktop Wallpapers') {
              desktopNames.push(char.name);
            } else if (char.category === 'Special') {
              specialNames.push(char.name);
            } else {
              animeNames.push(char.name);
            }

            char.wallpapers.forEach((wallpaperUrl: string, imgIndex: number) => {
              if (char.name !== 'Desktop Wallpapers') {
                allWallpapers.push({
                  id: `${char.name}-${imgIndex}`,
                  url: wallpaperUrl,
                  character: char.name,
                  title: `${char.name} - ${imgIndex + 1}`,
                  category: char.category || 'Anime',
                  tags: char.tags || []
                });
              }
            });
          });

          // 2. Process priority characters (Interleaved)
          const priorityDataList = priorityNames
            .map(name => priorityChars.find((c: CharacterData) => c.name === name))
            .filter((c): c is CharacterData => !!c);

          priorityDataList.forEach(c => {
            if (c.category === 'Special') specialNames.push(c.name);
            else animeNames.push(c.name);
          });

          const maxLength = Math.max(...priorityDataList.map(c => c.wallpapers.length), 0);

          for (let i = maxLength - 1; i >= 0; i--) {
             for (let j = priorityDataList.length - 1; j >= 0; j--) {
                const char = priorityDataList[j];
                const wps = char.wallpapers;
                
                if (char.name === "Mixed") {
                   const priorityIndices = [53, 43, 36, 23];
                   if (priorityIndices.includes(i)) {
                      allWallpapers.push({
                        id: `${char.name}-${i}`,
                        url: wps[i],
                        character: char.name,
                        title: `${char.name} - ${i + 1}`,
                        category: char.category,
                        tags: char.tags || []
                      });
                   }
                   continue;
                }

                if (wps[i]) {
                  allWallpapers.push({
                    id: `${char.name}-${i}`,
                    url: wps[i],
                    character: char.name,
                    title: `${char.name} - ${i + 1}`,
                    category: char.category || 'Anime',
                    tags: char.tags || []
                  });
                }
             }
          }

          const mixedChar = priorityDataList.find(c => c.name === "Mixed");
          if (mixedChar) {
            const priorityIndices = [53, 43, 36, 23];
            mixedChar.wallpapers.forEach((url, i) => {
              if (!priorityIndices.includes(i)) {
                allWallpapers.unshift({
                  id: `Mixed-${i}`,
                  url: url,
                  character: "Mixed",
                  title: `Mixed - ${i + 1}`,
                  category: "Special",
                  tags: mixedChar.tags || []
                });
              }
            });
          }

          setWallpapers(allWallpapers);
          setDesktopCollections(desktopNames);
          setSpecialCollections(Array.from(new Set(specialNames)).sort());
          setCharacters(Array.from(new Set(animeNames)).sort());
          setError(null);
        } else {
           setError('No wallpapers found.');
        }
      } catch (error) {
        console.error('Error loading wallpapers:', error);
        setError('Failed to load wallpapers.');
      } finally {
        setLoading(false);
      }
    };

    loadWallpapers();
  }, []);

  useEffect(() => {
    setDisplayCount(12);
  }, [filter, searchQuery]);

  const renderCharacterName = (charName: string) => {
    const formattedName = charName.replace(/-/g, ' ');
    const stickerSlug = charName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') 
      .trim()
      .replace(/\s+/g, '-');

    return (
      <span className="inline-flex items-center gap-2">
        {formattedName}
        <img 
           src={`/stickers/${stickerSlug}.png`}
           alt="sticker" 
           className="w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(255,42,109,0.8)]"
           onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </span>
    );
  };

  const everything = useMemo(() => [...wallpapers].reverse(), [wallpapers]);

  const finalDisplay = useMemo(() => {
    let filtered = filter === "All" 
      ? everything
      : wallpapers.filter(w => w.character === filter).reverse();
      
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(w => 
        w.character.toLowerCase().includes(lowerQuery) || 
        w.category.toLowerCase().includes(lowerQuery) ||
        (w.tags && w.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
      );
    }
    
    return filtered.slice(0, displayCount);
  }, [filter, everything, wallpapers, displayCount, searchQuery]);

  const hasMore = useMemo(() => {
    let filtered = filter === "All" 
      ? everything
      : wallpapers.filter(w => w.character === filter).reverse();
      
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(w => 
        w.character.toLowerCase().includes(lowerQuery) || 
        w.category.toLowerCase().includes(lowerQuery) ||
        (w.tags && w.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
      );
    }
    return displayCount < filtered.length;
  }, [filter, everything, wallpapers, displayCount, searchQuery]);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setDisplayCount((prev) => prev + 12);
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  const getCount = (charName: string) => wallpapers.filter(w => w.character === charName).length;

  const CHARACTER_GUIDE_MAP: Record<string, string> = {
    "Frieren": "frieren-4k-wallpapers-guide",
    "Violet Evergarden": "violet-evergarden-story",
    "Alya Kujou ♡": "alya-kujou-tsundere-editing-guide",
    "Tenka Izumo": "tenka-izumo-guide",
    "Yuki Suou": "yuki-suou-4k-wallpapers-guide",
    "Marin Kitagawa": "marin-kitagawa-cosplay-queen-comprehensive",
    "Zero Two": "zero-two-editing-process",
    "Gojo Satoru": "jujutsu-kaisen-gojo-satoru-deep-dive",
    "Akane Kurokawa": "akane-kurokawa-method-acting-long",
    "Chisato Nishikigi": "chisato-nishikigi-action-long",
    "Denji": "chainsaw-man-denji-chaos-full",
    "Spider-Man": "spider-man-across-multiverse-4k-editing",
    "Tanjiro": "demon-slayer-breathing-effects-long",
    "Isagi Yoichi": "blue-lock-egoist-aura-long",
    "Goku": "dragon-ball-visual-evolution-pro",
    "Miku Nakano": "miku-nakano-headphones-aesthetic-long",
    "Makima": "colored-pencil-sketchbook-anime-wallpapers-guide",
    "Yor Forger": "yor-forger-assassin-long",
    "Power": "power-chainsaw-man-longform",
    "Naruto": "naruto-evolution-glow-pro",
    "Luffy": "luffy-gear-5-joyboy-masterclass",
    "Shiina Mahiru": "shiina-mahiru-4k-wallpapers-guide",
    "Shikimori Micchon": "shikimori-4k-wallpapers-guide",
    "Mixed": "mixed-anime-wallpapers-highlights",
    "Awesome": "awesome-anime-backgrounds-collection",
    "Cars": "anime-car-wallpapers-guide",
    "Live Wallpapers": "live-wallpapers-4k-guide",
    "Nature": "anime-nature-scenery-tribute",
    "Pixel": "pixel-art-anime-guide",
    "Nishimiya Shouko": "shouko-nishimiya-silent-voice-4k-guide",
    "Elaina": "elaina-wandering-witch-4k-guide",
    "Mai Sakurajima": "mai-sakurajima-bunny-girl-senpai-4k-guide",
    "Nakano Nino": "nino-nakano-tsundere-energy-4k-guide",
    "Rias Gremory": "rias-gremory-high-school-dxd-4k-guide",
    "Rin Shima": "rin-shima-laid-back-camp-cozy-4k-guide",
    "The Detective Is Already Dead": "siesta-detective-is-already-dead-4k-guide",
    "Kano Chinatsu": "blue-box-chinatsu-hina-4k-guide",
    "Hina Chono": "blue-box-chinatsu-hina-4k-guide",
    "Boku No Hero Academia": "my-hero-academia-4k-wallpapers-epic-guide",
    "Baki Hanma": "baki-hanma-muscle-intensity-4k-guide",
    "Kaoruko Waguri": "kaoruko-waguri-kaoru-hana-4k-guide",
    "Maria Kujou": "maria-kujou-roshidere-sister-4k-guide",
    "Kana Arima": "kana-arima-4k-wallpapers-guide",
    "Yuzuki Nanase": "yuzuki-nanase-chitose-kun-4k-guide",
    "Rin Nanakura": "rin-nanakura-giji-harem-4k-guide",
    "Yuuko Hiragi": "yuuko-hiragi-anime-girl-4k-guide",
    "Subaru Hushino": "subaru-hushino-anime-4k-guide",
    "Phoebe": "phoebe-aesthetic-art-4k-guide",
    "Attack On Titan": "attack-on-titan-cinematic-brutality-long",
    "Jujutsu Kaisen": "jujutsu-kaisen-gojo-satoru-deep-dive",
    "Demon Slayer": "demon-slayer-breathing-effects-long",
    "Chainsaw Man": "chainsaw-man-denji-chaos-full",
    "One Piece": "luffy-gear-5-joyboy-masterclass",
    "Dragon Ball": "dragon-ball-visual-evolution-pro",
    "Blue Lock": "blue-lock-egoist-aura-long",
    "Toji Fushiguro": "toji-fushiguro-sorcerer-killer-4k-guide"
  };

  const handleDownload = (url: string, title: string) => {
    const isVideo = url.toLowerCase().match(/\.(mp4|webm)$/);
    const ext = isVideo ? (url.split('.').pop() || 'mp4') : 'jpg';
    const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${ext}`;
    const downloadUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${filename}`;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setShowDownloadSuccessModal(true);
  };

  const lightboxImages = useMemo(() => finalDisplay.map(w => w.url), [finalDisplay]);
  const lightboxTitles = useMemo(() => finalDisplay.map(w => w.title), [finalDisplay]);

  return (
    <>
      <section id="gallery" className="py-20 px-4 md:px-12 bg-dark-bg/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/3 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-pixel text-4xl md:text-5xl text-center mb-12 text-neon-cyan drop-shadow-[0_0_24px_rgba(5,217,232,0.8)] animate-glow-cyan">
            <span className="text-white">LATEST</span> DROPS
          </h2>

          <div className="flex flex-col items-center gap-10 mb-16 animate-fade-in">
            {/* Filter buttons and recommendation button logic remains the same */}

            {/* --- TERMINAL SEARCH BAR --- */}
            <div className="w-full max-w-3xl relative group mt-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-purple rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-black/80 border border-gray-700 rounded-xl px-4 py-3 ring-1 ring-white/10 focus-within:ring-neon-cyan transition-all">
                <Terminal className="text-neon-cyan mr-3 animate-pulse" size={24} />
                <span className="text-neon-pink font-mono mr-2 text-lg">{">"}</span>
                <input 
                  type="text"
                  placeholder="search: character, tag, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white font-mono placeholder-gray-600 focus:outline-none text-lg"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-neon-pink transition-colors ml-2">
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="w-full max-w-6xl">
              <h3 className="text-neon-pink font-pixel text-xl mb-6 text-center tracking-widest drop-shadow-[0_0_10px_rgba(255,42,109,0.5)]">
                Anime CHARACTER Archive
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setFilter("All");
                    setDisplayCount(10);
                  }}
                  className={`px-6 py-2 rounded-full font-pixel text-sm transition-all duration-300 border ${
                    filter === "All" 
                      ? "bg-neon-pink border-neon-pink text-white shadow-[0_0_15px_rgba(255,42,109,0.5)] scale-105" 
                      : "bg-dark-bg/50 border-gray-700 text-gray-400 hover:border-neon-pink/50 hover:text-white hover:bg-neon-pink/10"
                  }`}
                >
                  ALL <span className="ml-2 opacity-60 text-xs">{everything.length}</span>
                </button>

                {characters.map((char) => (
                  <button
                    key={char}
                    onClick={() => setFilter(char)}
                    className={`px-5 py-2 rounded-full transition-all duration-300 border flex items-center gap-2 ${
                      filter === char 
                        ? "bg-neon-purple/20 border-neon-purple text-white shadow-[0_0_15px_rgba(211,0,197,0.4)] scale-105" 
                        : "bg-dark-bg/30 border-gray-800 text-gray-400 hover:border-neon-cyan/50 hover:text-neon-cyan hover:bg-neon-cyan/5"
                    }`}
                  >
                    <span className="font-mono text-sm capitalize">{renderCharacterName(char)}</span>
                    <span className="text-[10px] opacity-50 bg-black/30 px-1.5 py-0.5 rounded-md">{getCount(char)}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowRecommendationModal(true)}
              className="mt-4 font-pixel px-6 py-3 border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all rounded-lg hover:shadow-[0_0_24px_rgba(211,0,197,0.6)]"
            >
              Send Recommendation
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="font-pixel text-2xl text-neon-cyan animate-pulse">
                Loading wallpapers...
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 font-pixel text-xl">{error}</div>
          ) : finalDisplay.length === 0 ? (
            <div className="text-center py-20 font-pixel text-xl text-gray-400">
              No wallpapers found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {finalDisplay.map((wp, index) => (
                <SpotlightCard 
                  key={wp.id} 
                  className="group relative bg-card-bg border-2 border-gray-800 hover:border-neon-pink transition-all duration-500 rounded-lg overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(255,42,109,0.5)] hover:-translate-y-2 hover:rotate-1 cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                  spotlightColor="rgba(255, 42, 109, 0.2)"
                >
                  <div className="aspect-[9/16] relative overflow-hidden">
                     <PixelImage 
                        src={wp.url} 
                        alt={wp.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                     />
                  </div>
                  
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         handleDownload(wp.url, wp.title);
                       }}
                       className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:scale-110 hover:bg-neon-cyan transition-all"
                     >
                       <Download size={24} />
                     </button>
                  </div>

                  <div className="p-4 flex justify-between items-center border-t border-gray-800 bg-dark-bg/90 backdrop-blur-sm">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-pixel text-lg text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] truncate">{wp.title}</h3>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                          {renderCharacterName(wp.character)}
                        </span>
                      </div>
                    </div>
                    <Heart size={20} className="text-gray-500" />
                  </div>
                </SpotlightCard>
              ))}
            </div>
          )}

          {/* Infinite Scroll Trigger */}
          {filter === "All" && hasMore && (
            <div ref={loaderRef} className="flex justify-center mt-16 py-8">
              <Loader2 className="w-10 h-10 text-neon-cyan animate-spin opacity-50" />
            </div>
          )}
        </div>
      </section>

      {selectedImageIndex !== null && (
        <Lightbox 
        images={lightboxImages}
        titles={lightboxTitles}
        selectedIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onPrev={() => setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : finalDisplay.length - 1)}
        onNext={() => setSelectedImageIndex(prev => prev! < finalDisplay.length - 1 ? prev! + 1 : 0)}
        onDownload={handleDownload}
        />
        )}

        {/* Success and Recommendation modals remain here */}

      {showDownloadSuccessModal && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4" onClick={() => setShowDownloadSuccessModal(false)}>
          <div className="bg-card-bg border-4 border-neon-pink p-8 max-w-md w-full rounded-lg text-center" onClick={e => e.stopPropagation()}>
            <h3 className="font-pixel text-2xl text-neon-cyan mb-4">Download Started!</h3>
            <button onClick={() => setShowDownloadSuccessModal(false)} className="px-8 py-3 bg-neon-cyan text-dark-bg font-pixel rounded-lg">OK</button>
          </div>
        </div>
      )}

      {showRecommendationModal && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4" onClick={() => setShowRecommendationModal(false)}>
           <div className="bg-card-bg p-8 max-w-lg w-full rounded-lg border-2 border-neon-cyan" onClick={e => e.stopPropagation()}>
              <h3 className="text-white font-pixel text-2xl mb-4">Send Recommendation</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSending(true);
                try {
                  const res = await fetch('/api/recommendations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(recommendationForm)
                  });
                  if (res.ok) setSendStatus({ success: true, message: 'Sent!' });
                } catch (err) {} finally { setSending(false); }
              }} className="space-y-4">
                <input type="text" placeholder="Name" className="w-full bg-dark-bg border border-gray-700 p-3 rounded" value={recommendationForm.name} onChange={e => setRecommendationForm({...recommendationForm, name: e.target.value})} />
                <input type="email" placeholder="Email" className="w-full bg-dark-bg border border-gray-700 p-3 rounded" value={recommendationForm.email} onChange={e => setRecommendationForm({...recommendationForm, email: e.target.value})} />
                <textarea placeholder="Message" className="w-full bg-dark-bg border border-gray-700 p-3 rounded h-32" value={recommendationForm.message} onChange={e => setRecommendationForm({...recommendationForm, message: e.target.value})} />
                <div className="flex justify-end gap-4">
                  <button type="button" onClick={() => setShowRecommendationModal(false)} className="text-gray-400">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-neon-pink text-white rounded">{sending ? 'Sending...' : 'Send'}</button>
                </div>
              </form>
           </div>
        </div>
      )}
    </>
  );
}

export default function Gallery() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-pixel text-neon-cyan">Loading Gallery...</div>}>
      <GalleryContent />
    </Suspense>
  );
}