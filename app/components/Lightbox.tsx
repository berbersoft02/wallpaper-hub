"use client";

import { X, Download, ChevronLeft, ChevronRight, Smartphone, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface LightboxProps {
  images: string[];
  titles: string[];
  selectedIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onDownload: (url: string, title: string) => void;
}

export default function Lightbox({ 
  images, 
  titles, 
  selectedIndex, 
  onClose, 
  onPrev, 
  onNext, 
  onDownload 
}: LightboxProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    // Set a static appealing time for the mockup, or live time
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setCurrentDate(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
  }, []);

  const currentUrl = images[selectedIndex];
  const currentTitle = titles[selectedIndex];
  const isVideo = currentUrl?.match(/\.(mp4|webm|mov)/i);

  if (!currentUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-neon-pink transition-all z-30 group"
      >
        <X size={28} className="group-hover:rotate-90 transition-transform" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-cyan hover:scale-110 transition-all z-30"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-cyan hover:scale-110 transition-all z-30"
      >
        <ChevronRight size={32} />
      </button>
      
      <div 
        className="relative flex flex-col items-center justify-center w-full h-full p-4 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Container */}
        <div className="flex-1 w-full min-h-0 flex items-center justify-center overflow-hidden">
          {isPreviewMode ? (
            // --- SMARTPHONE PREVIEW FRAME ---
            <div className="relative h-[80vh] aspect-[9/19.5] border-[10px] md:border-[14px] border-black rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(255,42,109,0.2)] bg-black ring-1 ring-gray-800 transition-all duration-500 animate-slide-up">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[4%] bg-black rounded-b-3xl z-20"></div>
              
              {/* Lock Screen UI */}
              <div className="absolute top-[12%] left-0 w-full text-center z-20 text-white font-body drop-shadow-lg pointer-events-none select-none">
                <div className="text-5xl md:text-7xl font-light tracking-tight text-shadow-neon">{currentTime}</div>
                <div className="text-sm md:text-base mt-2 font-medium opacity-90 drop-shadow-md">{currentDate}</div>
              </div>
              
              {/* Bottom Swipe Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 md:h-1.5 bg-white/50 rounded-full z-20"></div>

              {/* Wallpaper Media */}
              {isVideo ? (
                <video key={currentUrl} src={currentUrl} className="w-full h-full object-cover scale-105" autoPlay loop muted playsInline />
              ) : (
                <img key={currentUrl} src={currentUrl} className="w-full h-full object-cover scale-105" alt={currentTitle} />
              )}
            </div>
          ) : (
            // --- NORMAL FULLSCREEN VIEW ---
            isVideo ? (
              <video
                key={currentUrl}
                src={currentUrl}
                className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-300"
                controls
                autoPlay
                loop
              />
            ) : (
              <img 
                key={currentUrl}
                src={currentUrl} 
                alt={currentTitle}
                className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
              />
            )
          )}
        </div>
        
        {/* Control Bar */}
        <div className="mt-6 shrink-0 bg-black/70 backdrop-blur-md px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-4 md:gap-6 border border-white/10 z-20 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <h3 className="hidden md:block font-pixel text-xl text-white tracking-widest max-w-[200px] lg:max-w-[400px] truncate">
            {currentTitle}
          </h3>
          
          <div className="h-8 w-px bg-white/20 hidden md:block"></div>

          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-pixel text-sm transition-all ${
              isPreviewMode 
                ? "bg-neon-pink text-white shadow-[0_0_15px_rgba(255,42,109,0.5)]" 
                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            {isPreviewMode ? <ImageIcon size={18} /> : <Smartphone size={18} />}
            <span className="hidden sm:inline">{isPreviewMode ? "RAW IMAGE" : "DEVICE PREVIEW"}</span>
          </button>

          <button
            onClick={() => onDownload(currentUrl, currentTitle)}
            className="p-3 bg-neon-cyan/20 hover:bg-neon-cyan text-neon-cyan hover:text-dark-bg rounded-full transition-all shadow-[0_0_15px_rgba(5,217,232,0.3)]"
            title="Download Wallpaper"
          >
            <Download size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}