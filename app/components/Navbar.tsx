"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
          <a 
            href="/#gallery" 
            onClick={handleWallpapersClick}
            className="hover:text-neon-cyan hover:underline decoration-wavy underline-offset-4 transition-all cursor-pointer"
          >
            WALLPAPERS
          </a>
          <Link
            href="/icons"
            className="hover:text-neon-cyan hover:underline decoration-wavy underline-offset-4 transition-all"
          >
            ICONS PFPS
          </Link>
          <button 
            onClick={() => handleSoonClick("APPS")}
            className="hover:text-neon-pink hover:underline decoration-wavy underline-offset-4 transition-all"
          >
            APPS
          </button>
          <Link
            href="/blog"
            className="hover:text-neon-pink hover:underline decoration-wavy underline-offset-4 transition-all"
          >
            BLOG
          </Link>
          <Link
            href="/about"
            className="hover:text-white hover:underline decoration-wavy underline-offset-4 transition-all"
          >
            ABOUT
          </Link>
          <Link
            href="/guide"
            className="hover:text-neon-cyan hover:underline decoration-wavy underline-offset-4 transition-all"
          >
            GUIDE
          </Link>
          <Link 
            href="/contact" 
            className="hover:text-orange-400 hover:underline decoration-wavy underline-offset-4 transition-all"
          >
            CONTACT
          </Link>
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
            <a 
              href="/#gallery" 
              onClick={handleWallpapersClick}
              className="font-pixel text-2xl text-white hover:text-neon-cyan transition-all hover:underline decoration-wavy underline-offset-4"
            >
              WALLPAPERS
            </a>
            <Link
              href="/icons"
              onClick={() => setShowMobileMenu(false)}
              className="font-pixel text-2xl text-white hover:text-neon-cyan transition-all hover:underline decoration-wavy underline-offset-4"
            >
              ICONS PFPS
            </Link>
            <button 
              onClick={() => handleSoonClick("APPS")}
              className="font-pixel text-2xl text-white hover:text-neon-pink transition-all hover:underline decoration-wavy underline-offset-4"
            >
              APPS
            </button>
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
