"use client";

import { getCharacterBySlug, getAllCharacters, slugify } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Heart, Maximize2 } from 'lucide-react';
import { useState, use, useMemo } from 'react';
import Lightbox from '@/app/components/Lightbox';
import { useFavorites } from '@/lib/hooks/useFavorites';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CharacterWallpapersPage({ params }: Props) {
  const { slug } = use(params);
  const character = getCharacterBySlug(slug);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites<Record<string, unknown>>("wallpapers-favs");

  const name = character?.name.replace(' ♡', '') || '';

  const handleDownload = (url: string, title: string) => {
    const isVideo = url.match(/\.(mp4|webm|mov)/i);
    const ext = isVideo ? 'mp4' : 'jpg';
    const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${ext}`;
    const downloadUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${filename}`;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const otherCharacters = useMemo(() => {
    const allCharacters = getAllCharacters();
    return allCharacters
      .filter(c => slugify(c.name) !== slug)
      // Filter out characters that only have videos or no wallpapers
      .filter(c => c.wallpapers.length > 0 && !c.wallpapers[0].match(/\.(mp4|webm|mov)/i))
      .slice(0, 6);
  }, [slug]);

  if (!character) {
    notFound();
  }

  const wpTitles = character.wallpapers.map((_, i) => `${name} - 4K Edit #${i + 1}`);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-20">
        <header className="mb-12 text-center">
          <Link 
            href="/#gallery"
            className="inline-block mb-8 font-pixel text-neon-cyan hover:text-neon-pink transition-colors"
          >
            ← Back to Gallery
          </Link>
          
          <h1 className="font-pixel text-4xl md:text-6xl text-white mb-6 drop-shadow-[0_0_20px_rgba(5,217,232,0.5)] uppercase tracking-tighter">
            {character.name} <span className="text-neon-pink">Collection</span>
          </h1>
          
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {character.tags?.map(tag => (
              <span key={tag} className="font-pixel text-sm bg-gray-800 text-neon-cyan px-3 py-1 rounded-full border border-neon-cyan/30">
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-gray-400 max-w-2xl mx-auto font-body text-lg leading-relaxed">
            Premium 4K upscaled wallpapers of <span className="text-white font-bold">{name}</span>. Optimized for all screen sizes with custom color grading.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {character.wallpapers.map((url, index) => (
            <div 
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="group relative bg-card-bg border-2 border-gray-800 hover:border-neon-cyan transition-all duration-500 rounded-lg overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(5,217,232,0.3)] cursor-pointer"
            >
              <div className="aspect-[9/16] relative overflow-hidden">
                {url.match(/\.(mp4|webm|mov)/i) ? (
                  <video
                    src={url}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : (
                  <Image 
                    src={url}
                    alt={`${name} 4K Wallpaper - ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                )}
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 pointer-events-none">
                  <div className="p-4 bg-neon-cyan text-dark-bg rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 size={32} />
                  </div>
                  <span className="font-pixel text-neon-cyan text-xl tracking-widest">VIEW FULLSCREEN</span>
                </div>


                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(url, wpTitles[index]);
                  }}
                  className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-neon-pink z-10"
                >
                  <Download size={20} />
                </button>
              </div>
              <div className="p-4 bg-dark-bg/90 border-t border-gray-800 flex justify-between items-center">
                <h3 className="font-pixel text-sm text-gray-300 tracking-wider">{wpTitles[index]}</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite({
                      id: `${character.name}-${index}`,
                      url,
                      character: character.name,
                      title: wpTitles[index],
                      category: character.category || 'Anime'
                    });
                  }}
                  className="p-2 hover:scale-125 transition-transform"
                >
                  <Heart 
                    size={18} 
                    className={isFavorite(`${character.name}-${index}`) ? "text-neon-pink fill-neon-pink drop-shadow-[0_0_8px_rgba(255,42,109,0.8)]" : "text-gray-600 hover:text-neon-pink"} 
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-32">
          <h2 className="font-pixel text-3xl text-white mb-12 text-center">
            Explore More <span className="text-neon-cyan">Characters</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherCharacters.map((char) => (
              <Link 
                key={char.name}
                href={`/wallpapers/${slugify(char.name)}`}
                className="group relative aspect-[9/16] rounded-xl overflow-hidden border border-gray-800 hover:border-neon-cyan transition-all"
              >
                <Image 
                  src={char.wallpapers[0]}
                  alt={char.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="font-pixel text-[10px] text-white truncate">{char.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {selectedIndex !== null && (
        <Lightbox 
          images={character.wallpapers}
          titles={wpTitles}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex(prev => prev! > 0 ? prev! - 1 : character.wallpapers.length - 1)}
          onNext={() => setSelectedIndex(prev => prev! < character.wallpapers.length - 1 ? prev! + 1 : 0)}
          onDownload={handleDownload}
        />
      )}

      <Footer />
    </div>
  );
}
