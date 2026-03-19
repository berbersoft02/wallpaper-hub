import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/90 py-12 border-t-4 border-neon-pink/60 shadow-[0_-8px_32px_rgba(255,42,109,0.3)] relative overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/5 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        <div className="text-center md:text-left">
           <Link href="https://www.tiktok.com/@noxzx_kb" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 group">
             <div className="bg-white p-1 rounded-sm group-hover:bg-neon-cyan transition-colors duration-300">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.14.96.13 1.98.74 2.73.61.77 1.55 1.24 2.52 1.33 1.05.08 2.14-.26 2.89-1.01.76-.73 1.21-1.77 1.25-2.83.03-4.13.01-8.26.02-12.39Z"/></svg>
             </div>
             <span className="font-pixel text-2xl text-white drop-shadow-[0_0_12px_rgba(5,217,232,0.6)] group-hover:text-neon-cyan transition-colors">ONLY<span className="text-neon-cyan animate-pulse">_DIAS</span></span>
           </Link>
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
             title="X (Twitter)"
           >
             <Twitter size={28} />
           </a>
           <a 
             href="https://www.tiktok.com/@noxzx_kb" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-gray-400 hover:text-white transition-all hover:scale-125 hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]"
             title="TikTok"
           >
             <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.14.96.13 1.98.74 2.73.61.77 1.55 1.24 2.52 1.33 1.05.08 2.14-.26 2.89-1.01.76-.73 1.21-1.77 1.25-2.83.03-4.13.01-8.26.02-12.39Z"/></svg>
           </a>
           <a href="#" className="text-gray-400 hover:text-white transition-all hover:scale-125 hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]" title="GitHub"><Github size={28} /></a>
        </div>

      </div>
    </footer>
  );
}
