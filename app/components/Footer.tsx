import { Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/90 py-12 border-t-4 border-neon-pink/60 shadow-[0_-8px_32px_rgba(255,42,109,0.3)] relative overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/5 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        <div className="text-center md:text-left">
           <span className="font-pixel text-2xl text-white drop-shadow-[0_0_12px_rgba(5,217,232,0.6)]">ONLY<span className="text-neon-cyan animate-pulse">_DIAS</span></span>
           <p className="font-mono text-gray-400 mt-2 text-sm">© 2026. All rights reserved.</p>
           
           {/* Navigation Links */}
           <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
             <Link href="/about" className="text-gray-400 hover:text-neon-pink text-sm transition-colors">About Us</Link>
             <Link href="/contact" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">Contact</Link>
             <Link href="/guide" className="text-gray-400 hover:text-neon-purple text-sm transition-colors">Install Guide</Link>
             <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link>
           </div>

           {/* Legal Links */}
           <div className="flex gap-4 mt-3 justify-center md:justify-start">
             <Link 
               href="/privacy" 
               className="text-gray-500 hover:text-neon-cyan text-xs transition-colors"
             >
               Privacy Policy
             </Link>
             <span className="text-gray-600">|</span>
             <Link 
               href="/terms" 
               className="text-gray-500 hover:text-neon-cyan text-xs transition-colors"
             >
               Terms of Service
             </Link>
           </div>
        </div>

        <div className="flex gap-6">
           <a 
             href="https://x.com/SaidAhrikenchi2" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-gray-400 hover:text-neon-pink transition-all hover:scale-125 hover:drop-shadow-[0_0_16px_rgba(255,42,109,0.8)]"
           >
             <Twitter size={28} />
           </a>
           <a 
             href="https://www.instagram.com/said_ahriken/" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-gray-400 hover:text-neon-cyan transition-all hover:scale-125 hover:drop-shadow-[0_0_16px_rgba(5,217,232,0.8)]"
           >
             <Instagram size={28} />
           </a>
           <a href="#" className="text-gray-400 hover:text-white transition-all hover:scale-125 hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]"><Github size={28} /></a>
        </div>

      </div>
    </footer>
  );
}
