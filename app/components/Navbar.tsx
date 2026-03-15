"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [showSoonModal, setShowSoonModal] = useState(false);
  const [soonTitle, setSoonTitle] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSoonClick = (title: string) => {
    setSoonTitle(title);
    setShowSoonModal(true);
    setShowMobileMenu(false); // Close mobile menu when opening modal
  };

  const handleWallpapersClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#gallery');
    }
    setShowMobileMenu(false);
  };

  const handleIconsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      document.getElementById('icons')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#icons');
    }
    setShowMobileMenu(false);
  };

  return (
    <>
      <nav className="w-full py-6 px-4 md:px-12 flex justify-between items-center sticky top-0 z-50 bg-dark-bg/60 backdrop-blur-lg border-b-2 border-neon-pink/20 shadow-lg shadow-neon-cyan/10">
        <div className="flex items-center gap-2">
          <Magnetic>
            <Link href="/" className="rotate-3 hover:rotate-12 transition-transform duration-300 rounded-full bg-black/10 p-1 flex items-center justify-center">
              <Image src="/4.png" alt="Profile" width={48} height={48} className="rounded-full object-cover w-12 h-12 shadow-[0_0_16px_4px_rgba(5,217,232,0.6)] ring-4 ring-neon-cyan bg-black/30" />
            </Link>
          </Magnetic>
          <a href="https://www.tiktok.com/@noxzx_kb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
            <div className="bg-white p-1 rounded-sm group-hover:bg-neon-pink transition-colors duration-300">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.14.96.13 1.98.74 2.73.61.77 1.55 1.24 2.52 1.33 1.05.08 2.14-.26 2.89-1.01.76-.73 1.21-1.77 1.25-2.83.03-4.13.01-8.26.02-12.39Z"/></svg>
            </div>
            <span className="font-pixel text-3xl text-white tracking-widest group-hover:text-neon-cyan animate-glow-nav transition-all">ONLY<span className="text-neon-pink">_DIAS</span></span>
          </a>
        </div>

        <div className="hidden md:flex gap-8 font-pixel text-xl tracking-wide">
          <Magnetic>
            <a 
              href="/#gallery" 
              onClick={handleWallpapersClick}
              className="hover:text-neon-cyan hover:underline decoration-wavy underline-offset-4 transition-all cursor-pointer p-2"
            >
              WALLPAPERS
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="/#icons"
              onClick={handleIconsClick}
              className="hover:text-neon-cyan hover:underline decoration-wavy underline-offset-4 transition-all cursor-pointer p-2"
            >
              ICONS PFPS
            </a>
          </Magnetic>
          <Magnetic>
            <Link
              href="/wallpapers/desktop-wallpapers"
              className="hover:text-neon-pink hover:underline decoration-wavy underline-offset-4 transition-all text-left p-2"
            >
              Desktop Wallpapers
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/blog"
              className="hover:text-neon-pink hover:underline decoration-wavy underline-offset-4 transition-all p-2"
            >
              BLOG
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/about"
              className="hover:text-white hover:underline decoration-wavy underline-offset-4 transition-all p-2"
            >
              ABOUT
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/guide"
              className="hover:text-neon-cyan hover:underline decoration-wavy underline-offset-4 transition-all p-2"
            >
              GUIDE
            </Link>
          </Magnetic>
          <Magnetic>
            <Link 
              href="/contact" 
              className="hover:text-orange-400 hover:underline decoration-wavy underline-offset-4 transition-all p-2"
            >
              CONTACT
            </Link>
          </Magnetic>
        </div>

        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-white hover:text-neon-pink transition-colors"
        >
          {showMobileMenu ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        <Magnetic>
          <a 
            href="https://www.tiktok.com/@noxzx_kb" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:block font-pixel text-lg bg-neon-cyan text-dark-bg px-6 py-2 hover:bg-white hover:scale-105 transition-all pixel-border-pink"
          >
            TIKTOK
          </a>
        </Magnetic>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 z-[90] bg-black/90 backdrop-blur-lg">
          <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
            <a 
              href="/#gallery" 
              onClick={handleWallpapersClick}
              className="font-pixel text-2xl text-white hover:text-neon-cyan transition-all hover:underline decoration-wavy underline-offset-4"
            >
              WALLPAPERS
            </a>
            <a
              href="/#icons"
              onClick={handleIconsClick}
              className="font-pixel text-2xl text-white hover:text-neon-cyan transition-all hover:underline decoration-wavy underline-offset-4"
            >
              ICONS PFPS
            </a>
            <Link
              href="/wallpapers/desktop-wallpapers"
              onClick={() => setShowMobileMenu(false)}
              className="font-pixel text-2xl text-white hover:text-neon-pink transition-all hover:underline decoration-wavy underline-offset-4"
            >
              Desktop Wallpapers
            </Link>
            <Link
              href="/blog"
              onClick={() => setShowMobileMenu(false)}
              className="font-pixel text-2xl text-white hover:text-neon-pink transition-all hover:underline decoration-wavy underline-offset-4"
            >
              BLOG
            </Link>
            <Link
              href="/about"
              onClick={() => setShowMobileMenu(false)}
              className="font-pixel text-2xl text-white hover:text-white transition-all hover:underline decoration-wavy underline-offset-4"
            >
              ABOUT
            </Link>
            <Link
              href="/guide"
              onClick={() => setShowMobileMenu(false)}
              className="font-pixel text-2xl text-white hover:text-neon-cyan transition-all hover:underline decoration-wavy underline-offset-4"
            >
              GUIDE
            </Link>
            <Link
              href="/contact"
              onClick={() => setShowMobileMenu(false)}
              className="font-pixel text-2xl text-white hover:text-orange-400 transition-all hover:underline decoration-wavy underline-offset-4"
            >
              CONTACT
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
