"use client";

import { Download, Heart, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback, Suspense } from "react";
import SpotlightCard from "./SpotlightCard";
import { useSearchParams } from "next/navigation";
import { slugify } from "@/lib/utils";

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

function GalleryContent() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [specialCollections, setSpecialCollections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(10);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [showDownloadSuccessModal, setShowDownloadSuccessModal] = useState(false);
  const [recommendationForm, setRecommendationForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
            if (char.category === 'Special') {
              specialNames.push(char.name);
            } else {
              animeNames.push(char.name);
            }

            char.wallpapers.forEach((wallpaperUrl: string, imgIndex: number) => {
              allWallpapers.push({
                id: `${char.name}-${imgIndex}`,
                url: wallpaperUrl,
                character: char.name,
                title: `${char.name} - ${imgIndex + 1}`,
                category: char.category || 'Anime',
                tags: char.tags || []
              });
            });
          });

          // 2. Process priority characters (Interleaved)
          // Map priority chars to their data objects
          const priorityDataList = priorityNames
            .map(name => priorityChars.find((c: CharacterData) => c.name === name))
            .filter((c): c is CharacterData => !!c);

          // Add names to filter list
          priorityDataList.forEach(c => {
            if (c.category === 'Special') specialNames.push(c.name);
            else animeNames.push(c.name);
          });

          // Find the max length to iterate
          const maxLength = Math.max(...priorityDataList.map(c => c.wallpapers.length), 0);

          // Iterate backwards (from oldest to newest) to build the stack for the reversed view
          for (let i = maxLength - 1; i >= 0; i--) {
             for (let j = priorityDataList.length - 1; j >= 0; j--) {
                const char = priorityDataList[j];
                const wps = char.wallpapers;
                
                // Specific Logic for "Mixed": Only prioritize 54, 44, 37, 24
                if (char.name === "Mixed") {
                   const priorityIndices = [53, 43, 36, 23]; // 0-based for 54, 44, 37, 24
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

          // 3. Add the rest of the Mixed wallpapers that weren't prioritized
          const mixedChar = priorityDataList.find(c => c.name === "Mixed");
          if (mixedChar) {
            const priorityIndices = [53, 43, 36, 23];
            mixedChar.wallpapers.forEach((url, i) => {
              if (!priorityIndices.includes(i)) {
                // Add to the START of allWallpapers so they appear AFTER priority ones in reverse
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
    setDisplayCount(10);
  }, [filter]);

  const renderCharacterName = (charName: string) => {
    const formattedName = charName.replace(/-/g, ' ');
    
    // Create a slug for the sticker filename: "Alya Kujou ♡" -> "alya-kujou"
    // 1. Lowercase
    // 2. Remove emojis/special chars (keep letters, numbers, spaces)
    // 3. Trim
    // 4. Replace spaces with hyphens
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

  const allWallpapersReversed = [...wallpapers].reverse();
  const everything = allWallpapersReversed;

  const filteredWallpapers = filter === "All" 
    ? everything.slice(0, displayCount)
    : wallpapers.filter(w => w.character === filter).reverse();

  const finalDisplay = filteredWallpapers;
  const hasMore = filter === "All" && displayCount < everything.length;

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
    "Makima": "makima-control-devil-psychology-long",
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
    "Kaoruko waguri": "kaoruko-waguri-kaoru-hana-4k-guide",
    "Maria kujou": "maria-kujou-roshidere-sister-4k-guide",
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

  const goToPrevious = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else if (selectedImageIndex === 0) {
      setSelectedImageIndex(finalDisplay.length - 1);
    }
  }, [selectedImageIndex, finalDisplay.length]);

  const goToNext = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex < finalDisplay.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else if (selectedImageIndex === finalDisplay.length - 1) {
      setSelectedImageIndex(0);
    }
  }, [selectedImageIndex, finalDisplay.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
        setShowRecommendationModal(false);
        setShowDownloadSuccessModal(false);
      } else if (selectedImageIndex !== null) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrevious();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
      }
    };
    if (selectedImageIndex !== null || showRecommendationModal || showDownloadSuccessModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex, showRecommendationModal, showDownloadSuccessModal, goToPrevious, goToNext]);

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

  return (
    <section id="gallery" className="py-20 px-4 md:px-12 bg-dark-bg/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/3 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-pixel text-4xl md:text-5xl text-center mb-12 text-neon-cyan drop-shadow-[0_0_24px_rgba(5,217,232,0.8)] animate-glow-cyan">
          <span className="text-white">LATEST</span> DROPS
        </h2>

        <div className="flex flex-col items-center gap-10 mb-16 animate-fade-in">
          
          {filter !== "All" && CHARACTER_GUIDE_MAP[filter] && (
            <div className="w-full max-w-4xl bg-card-bg/80 border-2 border-neon-cyan/50 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_32px_rgba(5,217,232,0.2)] animate-slide-up">
              <div className="text-center md:text-left">
                <h4 className="font-pixel text-xl text-white mb-2">Deepen Your Experience</h4>
                <p className="text-gray-400 text-sm font-body">Read our expert editing guide and story analysis for <span className="text-neon-cyan font-bold">{filter}</span>.</p>
              </div>
              <div className="flex gap-4">
                <a 
                  href={`/wallpapers/${slugify(filter)}`}
                  className="px-6 py-3 bg-neon-pink text-white font-pixel rounded-lg hover:bg-white hover:text-neon-pink transition-all hover:scale-105 shadow-[0_0_16px_rgba(255,42,109,0.4)]"
                >
                  FULL COLLECTION
                </a>
                <a 
                  href={`/blog/${CHARACTER_GUIDE_MAP[filter]}`}
                  className="px-6 py-3 bg-neon-cyan text-dark-bg font-pixel rounded-lg hover:bg-white transition-all hover:scale-105 shadow-[0_0_16px_rgba(5,217,232,0.4)]"
                >
                  READ GUIDE
                </a>
              </div>
            </div>
          )}

          {/* --- Special Collections (Premium Cards) --- */}
          {specialCollections.length > 0 && (
             <div className="w-full max-w-6xl">
               <h3 className="text-neon-cyan font-pixel text-xl mb-6 text-center tracking-widest drop-shadow-[0_0_10px_rgba(5,217,232,0.5)]">
                 FEATURED COLLECTIONS
               </h3>
               <div className="flex flex-wrap justify-center gap-4">
                  {specialCollections.map((char) => (
                    <button
                      key={char}
                      onClick={() => setFilter(char)}
                      className={`relative group overflow-hidden px-8 py-4 rounded-xl transition-all duration-300 border backdrop-blur-md ${
                        filter === char 
                          ? "bg-neon-cyan/20 border-neon-cyan text-white shadow-[0_0_20px_rgba(5,217,232,0.4)] scale-105" 
                          : "bg-white/5 border-white/10 text-gray-300 hover:border-neon-cyan/50 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(5,217,232,0.2)]"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                      <div className="flex items-center gap-3 relative z-10">
                        <span className="font-pixel uppercase tracking-wider text-sm md:text-base">
                          {renderCharacterName(char)}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${filter === char ? "bg-neon-cyan text-dark-bg" : "bg-white/10 text-gray-400"}`}>
                          {getCount(char)}
                        </span>
                      </div>
                    </button>
                  ))}
               </div>
             </div>
          )}

          {/* --- Character Library (Sleek Tags) --- */}
          <div className="w-full max-w-6xl">
            <h3 className="text-neon-pink font-pixel text-xl mb-6 text-center tracking-widest drop-shadow-[0_0_10px_rgba(255,42,109,0.5)]">
              Anime CHARACTER Archive
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3">
              {/* 'All' Button */}
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

              {/* Character Buttons */}
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
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-pink/20 via-transparent to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                <div className="aspect-[9/16] relative overflow-hidden">
                   {wp.url.match(/\.(mp4|webm)/i) ? (
                     <video
                       src={wp.url}
                       className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                       muted
                       loop
                       autoPlay
                       playsInline
                     />
                   ) : (
                   <Image 
                      src={wp.url} 
                      alt={wp.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                   />
                   )}
                   
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       handleDownload(wp.url, wp.title);
                     }}
                     className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-neon-cyan/80 hover:shadow-[0_0_16px_rgba(5,217,232,0.8)] z-10"
                   >
                     <Download size={24} />
                   </button>
                </div>
                
                <div className="p-4 flex justify-between items-center border-t border-gray-800 bg-dark-bg/90 backdrop-blur-sm">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-pixel text-lg text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] truncate">{wp.title}</h3>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{renderCharacterName(wp.character)}</span>
                      {wp.tags && wp.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {wp.tags.map(tag => (
                            <span key={tag} className="text-[10px] text-neon-cyan font-mono hover:text-neon-pink transition-colors">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-red-500 transition-all hover:scale-125 ml-2 shrink-0">
                    <Heart size={20} />
                  </button>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}

        {!loading && filter === "All" && hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setDisplayCount(prev => prev + 10)}
              className="font-pixel px-8 py-4 bg-neon-cyan hover:bg-neon-cyan/80 text-dark-bg text-xl rounded-lg border-2 border-neon-cyan transition-all hover:scale-105 shadow-[0_0_24px_rgba(5,217,232,0.6)]"
            >
              More
            </button>
          </div>
        )}
      </div>

      {selectedImageIndex !== null && finalDisplay[selectedImageIndex] && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-neon-pink transition-all z-20 group"
          >
            <X size={28} className="group-hover:rotate-90 transition-transform" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-cyan hover:scale-110 transition-all z-20"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-cyan hover:scale-110 transition-all z-20"
          >
            <ChevronRight size={32} />
          </button>
          
          <div 
            className="relative max-w-full max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {finalDisplay[selectedImageIndex].url.match(/\.(mp4|webm)/i) ? (
              <video
                src={finalDisplay[selectedImageIndex].url}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                controls
                autoPlay
                loop
              />
            ) : (
            <img 
              src={finalDisplay[selectedImageIndex].url} 
              alt={finalDisplay[selectedImageIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            )}
            
            <div className="mt-4 bg-black/70 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4">
              <h3 className="font-pixel text-xl text-white">{finalDisplay[selectedImageIndex].title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(finalDisplay[selectedImageIndex].url, finalDisplay[selectedImageIndex].title);
                }}
                className="p-2 bg-neon-cyan/20 hover:bg-neon-cyan/40 rounded-full text-neon-cyan transition-all"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {showDownloadSuccessModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-fade-in"
          onClick={() => setShowDownloadSuccessModal(false)}
        >
          <div 
            className="relative bg-card-bg border-4 border-neon-pink p-8 max-w-md w-full mx-4 rounded-lg shadow-[0_0_64px_rgba(255,42,109,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDownloadSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-neon-pink transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-neon-pink/20 rounded-full flex items-center justify-center shadow-[0_0_32px_rgba(255,42,109,0.6)]">
                 <Download size={40} className="text-neon-pink animate-bounce" />
              </div>
              <h3 className="font-pixel text-2xl text-neon-cyan">
                Download Started!
              </h3>
              <a 
                href="https://www.tiktok.com/@noxzx_kb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-pixel text-xl bg-neon-cyan text-dark-bg px-8 py-3 rounded-md w-full hover:bg-white transition-colors"
              >
                VISIT TIKTOK
              </a>
            </div>
          </div>
        </div>
      )}

      {showRecommendationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4" onClick={() => setShowRecommendationModal(false)}>
           <div className="bg-card-bg p-8 max-w-lg w-full rounded-lg border-2 border-neon-cyan shadow-[0_0_30px_rgba(5,217,232,0.3)]" onClick={e => e.stopPropagation()}>
              <h3 className="text-white font-pixel text-2xl mb-2">Send Recommendation</h3>
              <p className="text-gray-300 mb-6 text-sm">Have a character request or feedback? Send it directly to me!</p>
              
              {sendStatus?.success ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-neon-cyan text-5xl flex justify-center">✓</div>
                  <h4 className="text-white text-xl font-bold">Message Sent!</h4>
                  <p className="text-gray-400">{sendStatus.message}</p>
                  <button 
                    onClick={() => {
                      setShowRecommendationModal(false);
                      setSendStatus(null);
                      setRecommendationForm({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2 bg-neon-cyan text-dark-bg font-bold rounded hover:bg-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSending(true);
                    try {
                      const res = await fetch('/api/recommendations', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(recommendationForm)
                      });
                      const data = await res.json();
                      if (res.ok) {
                        setSendStatus({ success: true, message: data.message });
                      } else {
                        setSendStatus({ success: false, message: data.error || 'Failed to send.' });
                      }
                    } catch (err) {
                      setSendStatus({ success: false, message: 'Something went wrong.' });
                    } finally {
                      setSending(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-gray-400 text-xs uppercase mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={recommendationForm.name}
                      onChange={(e) => setRecommendationForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-dark-bg/50 border border-gray-700 rounded p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase mb-1">Your Email</label>
                    <input 
                      type="email" 
                      required
                      value={recommendationForm.email}
                      onChange={(e) => setRecommendationForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-dark-bg/50 border border-gray-700 rounded p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase mb-1">Message</label>
                    <textarea 
                      required
                      value={recommendationForm.message}
                      onChange={(e) => setRecommendationForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-dark-bg/50 border border-gray-700 rounded p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors min-h-[100px]"
                      placeholder="Which character would you like to see next?"
                    />
                  </div>
                  
                  {sendStatus?.success === false && (
                    <div className="text-red-500 text-sm">{sendStatus.message}</div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setShowRecommendationModal(false)}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={sending}
                      className="px-6 py-2 bg-neon-pink hover:bg-neon-pink/80 text-white font-bold rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {sending ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
           </div>
        </div>
      )}
    </section>
  );
}

export default function Gallery() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-pixel text-neon-cyan">Loading Gallery...</div>}>
      <GalleryContent />
    </Suspense>
  );
}