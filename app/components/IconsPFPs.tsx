"use client";

import { Download, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SpotlightCard from "./SpotlightCard";

export default function IconsPFPs() {
  const [displayCount, setDisplayCount] = useState(12);
  
  // Array of images from 1 to 69
  const icons = Array.from({ length: 69 }, (_, i) => ({
    id: i + 1,
    url: `/${i + 1}.png`,
    title: `Matching PFP #${i + 1}`,
  }));

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="icons" className="py-20 px-4 md:px-12 bg-dark-bg/30 relative overflow-hidden border-t border-gray-800">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-pixel text-4xl md:text-5xl text-center mb-12 text-neon-purple drop-shadow-[0_0_24px_rgba(211,0,197,0.8)] animate-glow-purple">
          <span className="text-white">ICONS</span> & PFPS
        </h2>

        <p className="text-center text-gray-400 font-body mb-12 max-w-2xl mx-auto">
          Elevate your social media profile with our hand-picked collection of matching anime icons and profile pictures. High-quality, aesthetic, and ready for use.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {icons.slice(0, displayCount).map((icon) => (
            <SpotlightCard 
              key={icon.id}
              className="group relative bg-card-bg border border-gray-800 hover:border-neon-purple transition-all duration-500 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(211,0,197,0.3)]"
              spotlightColor="rgba(211, 0, 197, 0.1)"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image 
                  src={icon.url}
                  alt={icon.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={() => handleDownload(icon.url, icon.title)}
                    className="p-3 bg-neon-purple text-white rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(211,0,197,0.5)]"
                  >
                    <Download size={20} />
                  </button>
                  <button className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:scale-110 transition-transform">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-dark-bg/50 backdrop-blur-sm border-t border-gray-800">
                <h3 className="font-pixel text-sm text-gray-200 truncate">{icon.title}</h3>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {displayCount < icons.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setDisplayCount(prev => prev + 12)}
              className="font-pixel px-8 py-4 border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all rounded-lg hover:shadow-[0_0_24px_rgba(211,0,197,0.6)]"
            >
              Load More Icons
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
