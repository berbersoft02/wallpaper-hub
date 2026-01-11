"use client";

import { Download, Heart, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface Wallpaper {
  id: string;
  url: string;
  character: string;
  title: string;
}

interface CharacterData {
  name: string;
  wallpapers: string[];
}

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(10);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [recommendationForm, setRecommendationForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load wallpapers from API
  useEffect(() => {
    const loadWallpapers = async () => {
      try {
        const response = await fetch('/api/wallpapers');
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('📥 API Response received:', {
          hasCharacters: !!data.characters,
          charactersCount: data.characters?.length || 0,
          total: data.total,
          source: data.source
        });
        
        console.log('📥 API Response received:', {
          hasError: !!data.error,
          charactersCount: data.characters?.length || 0,
          total: data.total,
          source: data.source,
          firstCharacter: data.characters?.[0]?.name,
          firstCharacterWallpapers: data.characters?.[0]?.wallpapers?.length
        });
        
        if (data.error) {
          // Show error message
          setError(data.error);
          console.error('API Error:', data.error, data.message || data.details);
          
          // If there are still characters, show them anyway
          if (data.characters && data.characters.length > 0) {
            const allWallpapers: Wallpaper[] = [];
            const characterNames: string[] = [];

            data.characters.forEach((char: CharacterData) => {
              characterNames.push(char.name);
              char.wallpapers.forEach((wallpaperUrl: string, imgIndex: number) => {
                allWallpapers.push({
                  id: `${char.name}-${imgIndex}`,
                  url: wallpaperUrl,
                  character: char.name,
                  title: `${char.name} - ${imgIndex + 1}`
                });
              });
            });

            setWallpapers(allWallpapers);
            setCharacters(characterNames.sort());
            setError(null); // Clear error if we have data
          }
        } else if (data.characters && data.characters.length > 0) {
          const allWallpapers: Wallpaper[] = [];
          const characterNames: string[] = [];

          data.characters.forEach((char: CharacterData, charIndex: number) => {
            characterNames.push(char.name);
            char.wallpapers.forEach((wallpaperUrl: string, imgIndex: number) => {
              allWallpapers.push({
                id: `${char.name}-${imgIndex}`,
                url: wallpaperUrl,
                character: char.name,
                title: `${char.name} - ${imgIndex + 1}`
              });
            });
          });

          setWallpapers(allWallpapers);
          setCharacters(characterNames.sort());
          setError(null);
          
          // Log source for debugging
          console.log(`✅ Loaded ${allWallpapers.length} wallpapers from ${data.source || 'unknown source'}`);
          console.log(`✅ Characters: ${characterNames.join(', ')}`);
          if (allWallpapers.length > 0) {
            console.log(`Sample wallpaper URL: ${allWallpapers[0].url}`);
          }
        } else {
          console.warn('⚠️ No characters found in API response:', data);
          setError('No wallpapers found. Please check the configuration.');
        }
      } catch (error) {
        console.error('Error loading wallpapers:', error);
        setError('Failed to load wallpapers. Please check the configuration.');
      } finally {
        setLoading(false);
      }
    };

    loadWallpapers();
  }, []);

  // Reset display count when filter changes
  useEffect(() => {
    setDisplayCount(10);
  }, [filter]);

  // Sort all wallpapers to get the latest ones (reverse order)
  // Then limit to displayCount when "All" is selected
  const allWallpapersReversed = [...wallpapers].reverse();
  const filteredWallpapers = filter === "All" 
    ? allWallpapersReversed.slice(0, displayCount)
    : wallpapers.filter(w => w.character === filter);

  // Check if there are more wallpapers to show (only for "All" filter)
  const hasMore = filter === "All" && displayCount < allWallpapersReversed.length;

  // Navigate to previous wallpaper
  const goToPrevious = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else if (selectedImageIndex === 0) {
      // Loop to last image
      setSelectedImageIndex(filteredWallpapers.length - 1);
    }
  }, [selectedImageIndex, filteredWallpapers.length]);

  // Navigate to next wallpaper
  const goToNext = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex < filteredWallpapers.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else if (selectedImageIndex === filteredWallpapers.length - 1) {
      // Loop to first image
      setSelectedImageIndex(0);
    }
  }, [selectedImageIndex, filteredWallpapers.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
        setShowRecommendationModal(false);
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
    if (selectedImageIndex !== null || showRecommendationModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex, showRecommendationModal, goToPrevious, goToNext]);

  // Handle hash change to open recommendation modal
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#gallery') {
        // Check if we should open the recommendation modal
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('recommendation') === 'true') {
          setTimeout(() => {
            setShowRecommendationModal(true);
          }, 500);
        }
      }
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleDownload = async (url: string, title: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback: open in new tab if download fails
      window.open(url, '_blank');
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 md:px-12 bg-dark-bg/50 relative overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/3 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-pixel text-4xl md:text-5xl text-center mb-12 text-neon-cyan drop-shadow-[0_0_24px_rgba(5,217,232,0.8)] animate-glow-cyan">
          <span className="text-white">LATEST</span> DROPS
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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
            All
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
              {char.replace(/-/g, ' ')}
            </button>
          ))}
          <button
            data-recommendation-trigger
            onClick={() => setShowRecommendationModal(true)}
            className="font-pixel px-6 py-3 border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all rounded-lg hover:shadow-[0_0_24px_rgba(211,0,197,0.6)] hover:scale-105"
          >
            Send Recommendation
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="font-pixel text-2xl text-neon-cyan animate-pulse">
              Loading wallpapers...
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-card-bg border-4 border-neon-pink p-12 max-w-md text-center rounded-lg shadow-[0_0_48px_rgba(255,42,109,0.6)]">
              <h3 className="font-pixel text-3xl text-neon-cyan mb-4 drop-shadow-[0_0_16px_rgba(5,217,232,0.8)]">
                Configuration Required
              </h3>
              <p className="font-body text-gray-300 text-sm mb-4">
                {error.includes('Cloudinary') 
                  ? 'Cloudinary is not configured. Please add environment variables on Netlify.'
                  : error}
              </p>
              <p className="font-body text-gray-400 text-xs">
                Check NETLIFY_CLOUDINARY_SETUP.md for instructions.
              </p>
            </div>
          </div>
        ) : filteredWallpapers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-card-bg border-4 border-neon-pink p-12 max-w-md text-center rounded-lg shadow-[0_0_48px_rgba(255,42,109,0.6)] animate-pulse">
              <h3 className="font-pixel text-4xl text-neon-cyan mb-4 drop-shadow-[0_0_16px_rgba(5,217,232,0.8)]">{filter}</h3>
              <div className="font-pixel text-6xl text-neon-pink tracking-widest mb-4 drop-shadow-[0_0_24px_rgba(255,42,109,0.8)]">
                SOON
              </div>
              <p className="font-body text-gray-300 text-sm">
                Cette section arrive bientôt !
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWallpapers.map((wp, index) => (
              <div 
                key={wp.id} 
                className="group relative bg-card-bg border-2 border-gray-800 hover:border-neon-pink transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:shadow-[0_0_32px_rgba(255,42,109,0.4)] hover:scale-105 cursor-pointer"
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="aspect-[9/16] relative overflow-hidden">
                   <Image 
                      src={wp.url} 
                      alt={wp.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                   />
                   
                   {/* Download Button - Top Right Corner */}
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       handleDownload(wp.url, wp.title);
                     }}
                     className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-neon-cyan/80 hover:shadow-[0_0_16px_rgba(5,217,232,0.8)] z-10"
                   >
                     <Download size={24} />
                   </button>
                   
                   {/* Maximize Icon - Center (appears on hover) */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20">
                     <div className="p-4 bg-black/50 backdrop-blur-md rounded-full text-white">
                       <Maximize2 size={32} />
                     </div>
                   </div>
                </div>
                
                <div className="p-4 flex justify-between items-center border-t border-gray-800 bg-dark-bg/90 backdrop-blur-sm">
                  <div>
                    <h3 className="font-pixel text-lg text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{wp.title}</h3>
                    <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{wp.character.replace(/-/g, ' ')}</span>
                  </div>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-500 hover:text-red-500 transition-all hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                  >
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* More Button - Only show when "All" filter and there are more wallpapers */}
        {!loading && filter === "All" && hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setDisplayCount(prev => prev + 10)}
              className="font-pixel px-8 py-4 bg-neon-cyan hover:bg-neon-cyan/80 text-dark-bg text-xl rounded-lg border-2 border-neon-cyan transition-all hover:scale-105 shadow-[0_0_24px_rgba(5,217,232,0.6)] hover:shadow-[0_0_32px_rgba(5,217,232,0.9)]"
            >
              More
            </button>
          </div>
        )}
      </div>

      {/* Full Screen Image Modal with Navigation */}
      {selectedImageIndex !== null && filteredWallpapers[selectedImageIndex] && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 p-3 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-pink hover:scale-110 transition-all z-20 shadow-[0_0_24px_rgba(255,42,109,0.6)] hover:shadow-[0_0_32px_rgba(255,42,109,0.9)]"
          >
            <X size={28} />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-cyan hover:scale-110 transition-all z-20 shadow-[0_0_24px_rgba(5,217,232,0.6)] hover:shadow-[0_0_32px_rgba(5,217,232,0.9)]"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-cyan hover:scale-110 transition-all z-20 shadow-[0_0_24px_rgba(5,217,232,0.6)] hover:shadow-[0_0_32px_rgba(5,217,232,0.9)]"
          >
            <ChevronRight size={32} />
          </button>
          
          {/* Image Container */}
          <div 
            className="relative max-w-full max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={filteredWallpapers[selectedImageIndex].url} 
              alt={filteredWallpapers[selectedImageIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Info Bar */}
            <div className="mt-4 bg-black/70 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4">
              <h3 className="font-pixel text-xl text-white">{filteredWallpapers[selectedImageIndex].title}</h3>
              <span className="text-gray-400">|</span>
              <span className="text-neon-cyan font-pixel text-sm">
                {selectedImageIndex + 1} / {filteredWallpapers.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(filteredWallpapers[selectedImageIndex].url, filteredWallpapers[selectedImageIndex].title);
                }}
                className="p-2 bg-neon-cyan/20 hover:bg-neon-cyan/40 rounded-full text-neon-cyan hover:scale-110 transition-all"
              >
                <Download size={20} />
              </button>
            </div>

            {/* Navigation Hint */}
            <div className="mt-2 text-gray-500 text-sm font-body">
              Use ← → arrow keys to navigate
            </div>
          </div>
        </div>
      )}

      {/* Recommendation Modal */}
      {showRecommendationModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          onClick={() => {
            setShowRecommendationModal(false);
            setSendStatus(null);
            setRecommendationForm({ name: '', email: '', message: '' });
          }}
        >
          <div 
            className="relative bg-card-bg border-4 border-neon-purple p-8 max-w-lg w-full mx-4 rounded-lg shadow-[0_0_48px_rgba(211,0,197,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowRecommendationModal(false);
                setSendStatus(null);
                setRecommendationForm({ name: '', email: '', message: '' });
              }}
              className="absolute top-4 right-4 text-white hover:text-neon-pink transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="font-pixel text-3xl text-neon-purple mb-6 text-center drop-shadow-[0_0_16px_rgba(211,0,197,0.8)]">
              Send Recommendation
            </h3>

            {sendStatus ? (
              <div className="text-center py-8">
                <div className={`font-pixel text-2xl mb-4 ${sendStatus.success ? 'text-neon-cyan' : 'text-neon-pink'}`}>
                  {sendStatus.success ? '✓ Sent!' : '✗ Error'}
                </div>
                <p className="font-body text-gray-300 mb-6">{sendStatus.message}</p>
                <button
                  onClick={() => {
                    setShowRecommendationModal(false);
                    setSendStatus(null);
                    setRecommendationForm({ name: '', email: '', message: '' });
                  }}
                  className="font-pixel px-6 py-2 bg-neon-purple hover:bg-neon-purple/80 text-white rounded-lg transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSending(true);
                  setSendStatus(null);

                  try {
                    const response = await fetch('/api/recommendations', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(recommendationForm),
                    });

                    const data = await response.json();

                    if (response.ok) {
                      setSendStatus({ success: true, message: 'Thank you! Your recommendation has been sent.' });
                      setRecommendationForm({ name: '', email: '', message: '' });
                    } else {
                      setSendStatus({ success: false, message: data.error || 'Failed to send. Please try again.' });
                    }
                  } catch (error) {
                    setSendStatus({ success: false, message: 'An error occurred. Please try again later.' });
                  } finally {
                    setSending(false);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block font-pixel text-sm text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={recommendationForm.name}
                    onChange={(e) => setRecommendationForm({ ...recommendationForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-bg border-2 border-gray-700 text-white rounded-lg focus:border-neon-purple focus:outline-none font-body"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block font-pixel text-sm text-gray-300 mb-2">Your Email</label>
                  <input
                    type="email"
                    required
                    value={recommendationForm.email}
                    onChange={(e) => setRecommendationForm({ ...recommendationForm, email: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-bg border-2 border-gray-700 text-white rounded-lg focus:border-neon-purple focus:outline-none font-body"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block font-pixel text-sm text-gray-300 mb-2">Your Recommendation</label>
                  <textarea
                    required
                    value={recommendationForm.message}
                    onChange={(e) => setRecommendationForm({ ...recommendationForm, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 bg-dark-bg border-2 border-gray-700 text-white rounded-lg focus:border-neon-purple focus:outline-none font-body resize-none"
                    placeholder="Share your recommendation here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full font-pixel px-6 py-3 bg-neon-purple hover:bg-neon-purple/80 text-white rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(211,0,197,0.6)]"
                >
                  {sending ? 'Sending...' : 'Send Recommendation'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
