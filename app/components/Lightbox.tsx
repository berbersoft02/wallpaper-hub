"use client";

import { X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback } from "react";

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
        className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-neon-pink transition-all z-20 group"
      >
        <X size={28} className="group-hover:rotate-90 transition-transform" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-cyan hover:scale-110 transition-all z-20"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-cyan hover:scale-110 transition-all z-20"
      >
        <ChevronRight size={32} />
      </button>
      
      <div 
        className="relative flex flex-col items-center justify-center w-full h-full p-4 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Container */}
        <div className="flex-1 w-full min-h-0 flex items-center justify-center overflow-hidden">
          {isVideo ? (
            <video
              key={currentUrl}
              src={currentUrl}
              className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              controls
              autoPlay
              loop
            />
          ) : (
            <img 
              key={currentUrl}
              src={currentUrl} 
              alt={currentTitle}
              className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            />
          )}
        </div>
        
        {/* Title & Download Button */}
        <div className="mt-6 shrink-0 bg-black/70 backdrop-blur-md px-8 py-4 rounded-full flex items-center gap-6 border border-white/10 z-10">
          <h3 className="font-pixel text-xl text-white tracking-widest">{currentTitle}</h3>
          <button
            onClick={() => onDownload(currentUrl, currentTitle)}
            className="p-3 bg-neon-cyan/20 hover:bg-neon-cyan text-neon-cyan hover:text-dark-bg rounded-full transition-all shadow-[0_0_15px_rgba(5,217,232,0.3)]"
          >
            <Download size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}