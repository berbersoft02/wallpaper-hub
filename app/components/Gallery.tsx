"use client";

import { Download, Heart, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface Wallpaper {
  id: string;
  url: string;
  character: string;
  title: string;
  category: string;
}

interface CharacterData {
  name: string;
  category: string;
  wallpapers: string[];
}

export default function Gallery() {
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

          data.characters.forEach((char: CharacterData) => {
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
                category: char.category || 'Anime'
              });
            });
          });

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
    
    const stickers: Record<string, string> = {
      "Alya Kujou": "alya.png",
      "Miku Nakano": "mikunakano.png",
      "Akane Kurokawa": "akane.png",
      "Chinatsu": "chinatsu.png",
      "Chisato Nishikigi": "Chisato.png",
      "♡ Hina Chono": "hina.png",
      "Bachira Meguru": "bachira.png"
    };

    if (stickers[charName]) {
      return (
        <span className="inline-flex items-center gap-2">
          {formattedName}
          {/* Sticker */}
          <img 
             src={`/stickers/${stickers[charName]}`}
             alt="sticker" 
             className="w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(255,42,109,0.8)]"
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </span>
      );
    }
    return formattedName;
  };

  const allWallpapersReversed = [...wallpapers].reverse();
  const animeOnly = allWallpapersReversed.filter(w => w.category === 'Anime');

  const filteredWallpapers = filter === "All" 
    ? animeOnly.slice(0, displayCount)
    : wallpapers.filter(w => w.character === filter).reverse();

  const finalDisplay = filteredWallpapers;
  const hasMore = filter === "All" && displayCount < animeOnly.length;

  const getCount = (charName: string) => wallpapers.filter(w => w.character === charName).length;

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

        <div className="flex flex-col items-center gap-8 mb-12">
          {specialCollections.length > 0 && (
             <div className="flex flex-wrap justify-center gap-4">
                {specialCollections.map((char) => (
                  <button
                    key={char}
                    onClick={() => setFilter(char)}
                    className={`font-pixel px-8 py-4 border-2 transition-all rounded-lg uppercase tracking-wider ${
                      filter === char 
                        ? "bg-neon-cyan border-neon-cyan text-dark-bg shadow-[0_0_24px_rgba(5,217,232,0.6)] scale-110" 
                        : "border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-bg hover:shadow-[0_0_16px_rgba(5,217,232,0.4)]"
                    }`}
                  >
                    <span className="text-xs mr-2 opacity-80">({getCount(char)})</span> {renderCharacterName(char)}
                  </button>
                ))}
             </div>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setFilter("All");
                setDisplayCount(10);
              }}
              className={`font-pixel px-6 py-3 border-2 transition-all rounded-lg ${
                filter === "All" 
                  ? "bg-neon-pink border-neon-pink text-white shadow-[0_0_24px_rgba(255,42,109,0.6)] hover:shadow-[0_0_32px_rgba(255,42,109,0.9)] hover:scale-105" 
                  : "border-gray-700 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_16px_rgba(5,217,232,0.4)] hover:scale-105"
              }`}
            >
              <span className="text-xs mr-2 opacity-80">({animeOnly.length})</span> All
            </button>
            {characters.map((char) => (
              <button
                key={char}
                onClick={() => setFilter(char)}
                className={`font-pixel px-6 py-3 border-2 transition-all rounded-lg capitalize ${
                  filter === char 
                    ? "bg-neon-pink border-neon-pink text-white shadow-[0_0_24px_rgba(255,42,109,0.6)] hover:shadow-[0_0_32px_rgba(255,42,109,0.9)] hover:scale-105" 
                    : "border-gray-700 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_16px_rgba(5,217,232,0.4)] hover:scale-105"
                }`}
              >
                <span className="text-xs mr-2 opacity-80">({getCount(char)})</span> {renderCharacterName(char)}
              </button>
            ))}
            <button
              onClick={() => setShowRecommendationModal(true)}
              className="font-pixel px-6 py-3 border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all rounded-lg hover:shadow-[0_0_24px_rgba(211,0,197,0.6)]"
            >
              Send Recommendation
            </button>
          </div>
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
              <div 
                key={wp.id} 
                className="group relative bg-card-bg border-2 border-gray-800 hover:border-neon-pink transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:shadow-[0_0_32px_rgba(255,42,109,0.4)] hover:scale-105 cursor-pointer"
                onClick={() => setSelectedImageIndex(index)}
              >
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
                  <div>
                    <h3 className="font-pixel text-lg text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] truncate max-w-[200px]">{wp.title}</h3>
                    <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{renderCharacterName(wp.character)}</span>
                  </div>
                  <button className="text-gray-500 hover:text-red-500 transition-all hover:scale-125">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
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
            className="absolute top-4 right-4 p-3 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-pink hover:scale-110 transition-all z-20"
          >
            <X size={28} />
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
              className="absolute top-4 right-4 text-white hover:text-neon-pink transition-colors"
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
           <div className="bg-card-bg p-8 max-w-lg w-full rounded-lg" onClick={e => e.stopPropagation()}>
              <h3 className="text-white font-pixel text-2xl mb-4">Send Recommendation</h3>
              <p className="text-gray-300 mb-6">Want to see a specific character? Let me know!</p>
              <a href="mailto:berbersoft@gmail.com" className="bg-neon-pink text-white px-6 py-2 rounded font-pixel">Email Me</a>
              <button onClick={() => setShowRecommendationModal(false)} className="ml-4 text-gray-400">Close</button>
           </div>
        </div>
      )}
    </section>
  );
}