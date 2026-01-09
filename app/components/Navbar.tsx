"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [showSoonModal, setShowSoonModal] = useState(false);
  const [soonTitle, setSoonTitle] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSoonClick = (title: string) => {
    setSoonTitle(title);
    setShowSoonModal(true);
    setShowMobileMenu(false); // Close mobile menu when opening modal
  };

  return (
    <>
      <nav className="w-full py-6 px-4 md:px-12 flex justify-between items-center sticky top-0 z-50 bg-dark-bg/60 backdrop-blur-lg border-b-2 border-neon-pink/20 shadow-lg shadow-neon-cyan/10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="rotate-3 group-hover:rotate-12 transition-transform duration-300 rounded-full bg-black/10 p-1 flex items-center justify-center">
            <Image src="/4.png" alt="TikTok Logo" width={48} height={48} className="rounded-full object-cover w-12 h-12 shadow-[0_0_16px_4px_rgba(5,217,232,0.6)] ring-4 ring-neon-cyan bg-black/30" />
          </div>
          <span className="font-pixel text-3xl text-white tracking-widest group-hover:text-neon-cyan animate-glow-nav transition-all">ONLY<span className="text-neon-pink">_DIAS</span></span>
        </Link>

        <div className="hidden md:flex gap-8 font-pixel text-xl tracking-wide">
          <Link href="#gallery" className="hover:text-neon-cyan hover:underline decoration-wavy underline-offset-4 transition-all">WALLPAPERS</Link>
          <button 
            onClick={() => handleSoonClick("APPS")}
            className="hover:text-neon-pink hover:underline decoration-wavy underline-offset-4 transition-all"
          >
            APPS
          </button>
          <button 
            onClick={() => handleSoonClick("GAMES")}
            className="hover:text-neon-cyan hover:underline decoration-wavy underline-offset-4 transition-all"
          >
            GAMES
          </button>
          <Link href="#about" className="hover:text-orange-400 hover:underline decoration-wavy underline-offset-4 transition-all">About me</Link>
        </div>

        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-white hover:text-neon-pink transition-colors"
        >
          {showMobileMenu ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        <a 
          href="https://www.tiktok.com/@noxzx_kb" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:block font-pixel text-lg bg-neon-cyan text-dark-bg px-6 py-2 hover:bg-white hover:scale-105 transition-all pixel-border-pink"
        >
          TIKTOK
        </a>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 z-[90] bg-black/90 backdrop-blur-lg">
          <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
            <Link 
              href="#gallery" 
              onClick={() => setShowMobileMenu(false)}
              className="font-pixel text-2xl text-white hover:text-neon-cyan transition-all hover:underline decoration-wavy underline-offset-4"
            >
              WALLPAPERS
            </Link>
            <button 
              onClick={() => handleSoonClick("APPS")}
              className="font-pixel text-2xl text-white hover:text-neon-pink transition-all hover:underline decoration-wavy underline-offset-4"
            >
              APPS
            </button>
            <button 
              onClick={() => handleSoonClick("GAMES")}
              className="font-pixel text-2xl text-white hover:text-neon-cyan transition-all hover:underline decoration-wavy underline-offset-4"
            >
              GAMES
            </button>
            <Link 
              href="#about" 
              onClick={() => setShowMobileMenu(false)}
              className="font-pixel text-2xl text-white hover:text-orange-400 transition-all hover:underline decoration-wavy underline-offset-4"
            >
              About me
            </Link>
            <a 
              href="https://www.tiktok.com/@noxzx_kb" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setShowMobileMenu(false)}
              className="font-pixel text-xl bg-neon-cyan text-dark-bg px-8 py-3 hover:bg-white hover:scale-105 transition-all pixel-border-pink mt-4"
            >
              TIKTOK
            </a>
          </div>
        </div>
      )}

      {/* Soon Modal */}
      {showSoonModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowSoonModal(false)}
        >
          <div 
            className="relative bg-card-bg border-4 border-neon-pink p-12 max-w-md mx-4 transform animate-pulse"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSoonModal(false)}
              className="absolute top-4 right-4 text-white hover:text-neon-pink transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center space-y-4">
              <h3 className="font-pixel text-4xl text-neon-cyan mb-4">{soonTitle}</h3>
              <div className="font-pixel text-6xl text-neon-pink tracking-widest">
                SOON
              </div>
              <p className="font-body text-gray-400 text-sm mt-4">
                Cette section arrive bientôt !
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
