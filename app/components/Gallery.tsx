/* eslint-disable @next/next/no-img-element */
"use client";

import { Heart, X, Terminal, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, Suspense, useMemo } from "react";
import SpotlightCard from "./SpotlightCard";
import { useSearchParams } from "next/navigation";
import Lightbox from "./Lightbox";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { useCyberSound } from "@/lib/hooks/useCyberSound";

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

function PixelImage({ src, alt, className, fill, width, height, unoptimized, ...props }: Record<string, unknown> & { src: string, alt: string, className?: string, fill?: boolean, width?: number, height?: number, unoptimized?: boolean }) {
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
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        unoptimized={unoptimized}
        className={`${className} ${isLoaded ? 'pixel-loaded' : 'pixel-loading'}`}
        onLoad={() => setIsLoaded(true)}
        crossOrigin="anonymous"
        {...props}
      />
    </div>
  );
}

function GalleryContent() {
  const { playSound } = useCyberSound();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [specialCollections, setSpecialCollections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(24);
  const [showDownloadSuccessModal, setShowDownloadSuccessModal] = useState(false);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [recommendationForm, setRecommendationForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{ success: boolean; message: string } | null>(null);

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

          otherChars.forEach((char: CharacterData) => {
            if (char.name !== 'Desktop Wallpapers') {
              if (char.category === 'Special') specialNames.push(char.name);
              else animeNames.push(char.name);

              char.wallpapers.forEach((url, i) => {
                allWallpapers.push({ id: `${char.name}-${i}`, url, character: char.name, title: `${char.name} - ${i + 1}`, category: char.category || 'Anime', tags: char.tags || [] });
              });
            }
          });

          const priorityDataList = priorityNames.map(name => priorityChars.find((c: CharacterData) => c.name === name)).filter(Boolean);
          const maxLength = Math.max(...priorityDataList.map((c: unknown) => (c as CharacterData).wallpapers.length), 0);

          for (let i = maxLength - 1; i >= 0; i--) {
             for (let j = priorityDataList.length - 1; j >= 0; j--) {
                const char = priorityDataList[j] as CharacterData;
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
        console.error("Failed to load wallpapers:", err);
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

  useEffect(() => { setDisplayCount(24); }, [filter, searchQuery]);

  const getCount = (name: string) => wallpapers.filter(w => w.character === name).length;

  const handleDownload = (url: string, title: string) => {
    const isVideo = url.toLowerCase().match(/\.(mp4|webm)$/);
    const ext = isVideo ? 'mp4' : 'jpg';
    const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${ext}`;
    const link = document.createElement('a');
    link.href = `/api/download?url=${encodeURIComponent(url)}&filename=${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadSuccessModal(true);
  };

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

          <div className="flex flex-col items-center gap-10 mb-16">
            <div className="w-full max-w-3xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-purple rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative flex items-center bg-black/80 border border-gray-700 rounded-xl px-4 py-3 focus-within:ring-neon-cyan ring-1 ring-white/10 transition-all">
                <Terminal className="text-neon-cyan mr-3 animate-pulse" size={24} />
                <input type="text" placeholder="search: character, tag..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-white font-mono focus:outline-none" />
                {searchQuery && <button onClick={() => { setSearchQuery(""); playSound('click'); }}><X size={20} className="text-gray-400 hover:text-neon-pink" /></button>}
              </div>
            </div>

            {specialCollections.length > 0 && (
              <div className="w-full max-w-6xl mt-4 mb-4">
                <h3 className="text-neon-cyan font-pixel text-xl mb-6 text-center tracking-widest">FEATURED COLLECTIONS</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    {specialCollections.map((char) => (
                      <button key={char} onClick={() => { setFilter(char); playSound('click'); }} className={`px-6 py-3 rounded-xl transition-all border backdrop-blur-md ${filter === char ? "bg-neon-cyan/20 border-neon-cyan text-white scale-105" : "bg-white/5 border-white/10 text-gray-300 hover:border-neon-cyan/50 hover:bg-white/10"}`}>
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

            <button
              onMouseEnter={() => playSound('hover')}
              onClick={() => { setShowRecommendationModal(true); playSound('click'); }}
              className="mt-4 font-pixel px-6 py-3 border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all rounded-lg hover:shadow-[0_0_24px_rgba(211,0,197,0.6)]"
            >
              SEND RECOMMENDATION
            </button>
          </div>

          {loading ? <div className="text-center py-20 font-pixel text-neon-cyan animate-pulse">Loading Archive...</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {finalDisplay.map((wp, index) => (
                <SpotlightCard key={wp.id} onMouseEnter={() => playSound('hover')} className="group relative bg-card-bg border-2 border-gray-800 rounded-lg overflow-hidden transition-all duration-500 hover:border-neon-pink hover:-translate-y-1" onClick={() => setSelectedImageIndex(index)}>
                  <div className="aspect-[9/16] relative overflow-hidden">
                     <PixelImage src={wp.url} alt={wp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                  </div>
                  <div className="p-4 flex justify-between items-center border-t border-gray-800 bg-dark-bg/90">
                    <div className="truncate flex-1 mr-2">
                      <h3 className="font-pixel text-lg text-white truncate">{wp.title}</h3>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{wp.character}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(wp); playSound('click'); }} className="p-2 hover:scale-125 transition-transform"><Heart size={20} className={isFavorite(wp.id) ? "text-neon-pink fill-neon-pink drop-shadow-[0_0_8px_rgba(255,42,109,0.8)]" : "text-gray-500"} /></button>
                  </div>
                </SpotlightCard>
              ))}
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
        <Lightbox images={filteredItems.map(w => w.url)} titles={filteredItems.map(w => w.title)} selectedIndex={selectedImageIndex} onClose={() => setSelectedImageIndex(null)} onPrev={() => { setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : filteredItems.length - 1); playSound('click'); }} onNext={() => { setSelectedImageIndex(prev => prev! < filteredItems.length - 1 ? prev! + 1 : 0); playSound('click'); }} onDownload={handleDownload} />
      )}

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
           <div className="bg-card-bg p-8 max-w-lg w-full rounded-lg border-2 border-neon-cyan shadow-[0_0_30px_rgba(5,217,232,0.3)]" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-pixel text-2xl">Send Recommendation</h3>
                <button onClick={() => setShowRecommendationModal(false)} className="text-gray-400 hover:text-neon-pink transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              {sendStatus?.success ? (
                <div className="text-center py-10 space-y-4">
                  <div className="text-neon-cyan font-pixel text-xl">MESSAGE SENT SUCCESSFULLY!</div>
                  <button onClick={() => { setShowRecommendationModal(false); setSendStatus(null); }} className="px-6 py-2 bg-neon-cyan text-black font-pixel rounded">CLOSE</button>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setSending(true);
                  try {
                    const res = await fetch('/api/recommendations', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(recommendationForm)
                    });
                    if (res.ok) {
                      setSendStatus({ success: true, message: 'Sent!' });
                      setRecommendationForm({ name: '', email: '', message: '' });
                    }
                  } catch (err) {} finally { setSending(false); }
                }} className="space-y-4">
                  <input required type="text" placeholder="Your Name" className="w-full bg-black/50 border border-gray-700 p-3 rounded text-white focus:border-neon-cyan outline-none transition-colors" value={recommendationForm.name} onChange={e => setRecommendationForm({...recommendationForm, name: e.target.value})} />
                  <input required type="email" placeholder="Your Email" className="w-full bg-black/50 border border-gray-700 p-3 rounded text-white focus:border-neon-cyan outline-none transition-colors" value={recommendationForm.email} onChange={e => setRecommendationForm({...recommendationForm, email: e.target.value})} />
                  <textarea required placeholder="Which character or series would you like to see?" className="w-full bg-black/50 border border-gray-700 p-3 rounded h-32 text-white focus:border-neon-cyan outline-none transition-colors resize-none" value={recommendationForm.message} onChange={e => setRecommendationForm({...recommendationForm, message: e.target.value})} />
                  <button type="submit" disabled={sending} className="w-full py-3 bg-neon-pink text-white font-pixel text-xl rounded hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(255,42,109,0.4)]">
                    {sending ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                  </button>
                </form>
              )}
           </div>
        </div>
      )}
    </>
  );
}

export default function Gallery() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-pixel text-neon-cyan">Loading Archive...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
