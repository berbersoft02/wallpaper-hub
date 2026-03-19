"use client";

import { X, Download, ChevronLeft, ChevronRight, Smartphone, Image as ImageIcon, ZoomIn, ZoomOut, RotateCcw, Share2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [scale, setScale] = useState(1);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const constraintsRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') { onPrev(); setScale(1); }
      if (e.key === 'ArrowRight') { onNext(); setScale(1); }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setCurrentDate(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
  }, []);

  const currentUrl = images[selectedIndex];
  const currentTitle = titles[selectedIndex];
  const isVideo = currentUrl?.match(/\.(mp4|webm|mov)/i);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const resetZoom = () => setScale(1);

  if (!currentUrl) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl" onClick={onClose}>
      <div className="absolute top-4 right-4 flex items-center gap-2 z-[10001]">
        {!isVideo && !isPreviewMode && (
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-full p-1 border border-white/10 mr-4">
            <button onClick={(e) => { e.stopPropagation(); handleZoomOut(); }} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"><ZoomOut size={20} /></button>
            <span className="text-[10px] font-pixel text-white/50 w-8 text-center">{Math.round(scale * 100)}%</span>
            <button onClick={(e) => { e.stopPropagation(); handleZoomIn(); }} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"><ZoomIn size={20} /></button>
            <button onClick={(e) => { e.stopPropagation(); resetZoom(); }} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"><RotateCcw size={20} /></button>
          </div>
        )}
        <button onClick={onClose} className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-neon-pink transition-all group"><X size={28} className="group-hover:rotate-90 transition-transform" /></button>
      </div>

      <button onClick={(e) => { e.stopPropagation(); onPrev(); setScale(1); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-cyan hover:scale-110 transition-all z-30"><ChevronLeft size={32} /></button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); setScale(1); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/70 backdrop-blur-md rounded-full text-white hover:bg-neon-cyan hover:scale-110 transition-all z-30"><ChevronRight size={32} /></button>
      
      <div className="relative flex flex-col items-center justify-center w-full h-full p-4 md:p-12" onClick={(e) => e.stopPropagation()} ref={constraintsRef}>
        <div className="flex-1 w-full min-h-0 flex items-center justify-center overflow-hidden">
          {isPreviewMode ? (
            <motion.div layoutId="device-preview" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="relative h-[80vh] aspect-[9/19.5] border-[10px] md:border-[14px] border-black rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(255,42,109,0.2)] bg-black ring-1 ring-gray-800">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[4%] bg-black rounded-b-3xl z-20"></div>
              <div className="absolute top-[12%] left-0 w-full text-center z-20 text-white font-body drop-shadow-lg pointer-events-none select-none">
                <div className="text-5xl md:text-7xl font-light tracking-tight text-shadow-neon">{currentTime}</div>
                <div className="text-sm md:text-base mt-2 font-medium opacity-90 drop-shadow-md">{currentDate}</div>
              </div>
              {isVideo ? <video key={currentUrl} src={currentUrl} className="w-full h-full object-cover scale-105" autoPlay loop muted playsInline /> : <img key={currentUrl} src={currentUrl} className="w-full h-full object-cover scale-105" alt={currentTitle} />}
            </motion.div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {isVideo ? (
                <video key={currentUrl} src={currentUrl} className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl" controls autoPlay loop />
              ) : (
                <motion.div drag={scale > 1} dragConstraints={constraintsRef} animate={{ scale }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
                  <img key={currentUrl} src={currentUrl} alt={currentTitle} className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none pointer-events-none" draggable={false} />
                </motion.div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-6 shrink-0 bg-black/70 backdrop-blur-md px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-4 md:gap-6 border border-white/10 z-20 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <h3 className="hidden md:block font-pixel text-xl text-white tracking-widest max-w-[200px] lg:max-w-[400px] truncate">{currentTitle}</h3>
          <div className="h-8 w-px bg-white/20 hidden md:block"></div>
          <button onClick={() => { setIsPreviewMode(!isPreviewMode); setScale(1); }} className={`flex items-center gap-2 px-4 py-2 rounded-full font-pixel text-sm transition-all ${isPreviewMode ? "bg-neon-pink text-white shadow-[0_0_15px_rgba(255,42,109,0.5)]" : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"}`}>
            {isPreviewMode ? <ImageIcon size={18} /> : <Smartphone size={18} />} <span className="hidden sm:inline">{isPreviewMode ? "RAW IMAGE" : "DEVICE PREVIEW"}</span>
          </button>
          <button onClick={() => onDownload(currentUrl, currentTitle)} className="p-3 bg-neon-cyan/20 hover:bg-neon-cyan text-neon-cyan hover:text-dark-bg rounded-full transition-all shadow-[0_0_15px_rgba(5,217,232,0.3)]" title="Download Wallpaper"><Download size={24} /></button>
          <button onClick={async () => {
            if (navigator.share) {
              try {
                await navigator.share({
                  title: currentTitle,
                  text: 'Check out this awesome anime wallpaper from Only_dias Ocean!',
                  url: window.location.href,
                });
              } catch (err) {
                console.error('Error sharing:', err);
              }
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }
          }} className="p-3 bg-neon-pink/20 hover:bg-neon-pink text-neon-pink hover:text-white rounded-full transition-all shadow-[0_0_15px_rgba(255,42,109,0.3)]" title="Share Wallpaper">
            <Share2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
