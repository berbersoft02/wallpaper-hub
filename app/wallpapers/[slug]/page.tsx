"use client";

import { getCharacterBySlug, getAllCharacters, slugify } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Heart, Maximize2, BookOpen } from 'lucide-react';
import { useState, use, useMemo } from 'react';
import Lightbox from '@/app/components/Lightbox';
import { getPostByCharacterName } from '@/lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CharacterWallpapersPage({ params }: Props) {
  const { slug } = use(params);
  const character = getCharacterBySlug(slug);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const name = character?.name.replace(' ♡', '') || '';
  const blogPost = character ? getPostByCharacterName(character.name) : undefined;

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
      .sort(() => Math.random() - 0.5)
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

          {blogPost && (
            <Link 
              href={`/blog/${blogPost.slug}`}
              className="inline-flex items-center gap-3 px-6 py-3 bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/30 hover:border-neon-cyan rounded-xl transition-all duration-300 mb-8 group"
            >
              <BookOpen className="text-neon-cyan group-hover:scale-110 transition-transform" size={24} />
              <div className="text-left">
                <p className="text-[10px] font-pixel text-neon-cyan/60 uppercase tracking-widest leading-none mb-1">Deep Dive Article</p>
                <p className="font-pixel text-sm text-white group-hover:text-neon-cyan transition-colors line-clamp-1">{blogPost.title}</p>
              </div>
            </Link>
          )}

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
                <Heart size={18} className="text-gray-600 hover:text-neon-pink transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <section className="mt-32 prose prose-invert max-w-none">
          <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-2xl">
            <h2 className="font-pixel text-3xl text-neon-cyan mb-8 uppercase tracking-widest">
              About the <span className="text-neon-pink">{name}</span> Collection
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-body text-gray-300 leading-relaxed text-lg">
              <div>
                <h3 className="text-white font-pixel text-xl mb-4">The Character & Aesthetic</h3>
                <p className="mb-6">
                  {name} is more than just a character; they represent a specific visual energy in the anime world. Whether it&apos;s the sharp, aggressive lines of a Shonen battle or the soft, ethereal glow of a slice-of-life masterpiece, our collection captures every nuance. This gallery is specifically curated to highlight the emotional weight and iconic scenes that fans associate with {name}.
                </p>
                <p>
                  From the intricate details of their outfit to the atmospheric lighting of their signature environment, these edits are designed to evoke the same feelings you got while watching the series. We focus on color harmony, ensuring that your desktop or mobile setup feels unified and professional.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-pixel text-xl mb-4">Technical Excellence: 4K & Beyond</h3>
                <p className="mb-6">
                  Every image in this {name} archive has undergone a rigorous restoration process. We start with high-bitrate source material and use custom <strong>AI Upscaling models (Real-ESRGAN and Topaz Photo AI)</strong> to reach true 3840x2160 resolution without the typical "waxiness" of cheap filters.
                </p>
                <ul className="space-y-4 text-sm font-mono bg-black/30 p-4 rounded-lg border border-gray-800">
                  <li className="flex gap-3"><span className="text-neon-cyan">▶</span> <strong>Custom Color Grading:</strong> Adjusted for modern OLED and High-Refresh Rate displays.</li>
                  <li className="flex gap-3"><span className="text-neon-pink">▶</span> <strong>Denoising:</strong> Cleaned artifacts while preserving the original animation grain.</li>
                  <li className="flex gap-3"><span className="text-neon-cyan">▶</span> <strong>Display Optimization:</strong> Verified for both 16:9 desktop and 9:16 mobile viewing.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-white font-pixel text-xl mb-6">Pro Tip: Optimizing for Your Display</h3>
              <div className="bg-neon-cyan/5 p-6 rounded-xl border border-neon-cyan/20">
                <p className="text-gray-300 italic mb-0">
                  To get the most out of these {name} wallpapers, we recommend setting your display brightness to 80% and ensuring HDR is enabled if supported. For mobile users, these 4K PNGs are perfect for "Depth Effect" on iOS 16+, where the character can slightly overlap the clock for a premium 3D look.
                </p>
              </div>
            </div>
          </div>
        </section>

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