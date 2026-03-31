"use client";

import { getCharacterBySlug, getAllCharacters, slugify } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Heart, Maximize2, BookOpen } from 'lucide-react';
import { useState, use, useMemo } from 'react';
import Script from 'next/script';
import Lightbox from '@/app/components/Lightbox';
import { getPostByCharacterName } from '@/lib/blog';
import { GlowCard } from '@/app/components/ui/spotlight-card';
import { getCharacterDescription } from '@/lib/character-descriptions';
import DownloadModal from '@/app/components/DownloadModal';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CharacterWallpapersPage({ params }: Props) {
  const { slug } = use(params);
  const character = getCharacterBySlug(slug);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // State for Download Modal
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{url: string, title: string} | null>(null);

  const name = character?.name.replace(' ♡', '') || '';
  const blogPost = character ? getPostByCharacterName(character.name) : undefined;
  const description = getCharacterDescription(name);

  const triggerDownload = (url: string, title: string) => {
    const isVideo = url.match(/\.(mp4|webm|mov)/i);
    const ext = isVideo ? 'mp4' : 'jpg';
    const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${ext}`;
    const downloadUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${filename}`;
    
    // Using window.location.assign is more reliable for triggering downloads in response to async events
    window.location.assign(downloadUrl);
  };

  const handleDownloadClick = (url: string, title: string) => {
    setPendingDownload({ url, title });
    setIsDownloadModalOpen(true);
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
          {character.wallpapers.map((url, index) => {
            const glowColor = character.category === 'Special' ? 'purple' : 'blue';
            
            return (
              <GlowCard 
                key={index}
                glowColor={glowColor}
                customSize={true}
                onClick={() => setSelectedIndex(index)}
                className="group relative bg-card-bg/40 border-gray-800 hover:border-neon-cyan/50 transition-all duration-500 rounded-lg overflow-hidden cursor-pointer"
              >
                <div className="aspect-[9/16] relative overflow-hidden rounded-t-lg">
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
                      handleDownloadClick(url, wpTitles[index]);
                    }}
                    className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-neon-pink z-10"
                  >
                    <Download size={20} />
                  </button>
                </div>
                <div className="p-4 bg-dark-bg/60 backdrop-blur-md border-t border-white/5 flex justify-between items-center rounded-b-lg">
                  <h3 className="font-pixel text-sm text-gray-300 tracking-wider">{wpTitles[index]}</h3>
                  <Heart size={18} className="text-gray-600 hover:text-neon-pink transition-colors" />
                </div>
              </GlowCard>
            );
          })}
        </div>

        <section className="mt-32 prose prose-invert max-w-none">
          <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-2xl">
            <h2 className="font-pixel text-3xl text-neon-cyan mb-8 uppercase tracking-widest">
              About the <span className="text-neon-pink">{name}</span> Collection
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-body text-gray-300 leading-relaxed text-lg">
              <div>
                <h3 className="text-white font-pixel text-xl mb-4">Character Overview</h3>
                <p className="mb-6">{description.overview}</p>
                
                <h3 className="text-white font-pixel text-xl mb-4">Personality & Role</h3>
                <p className="mb-6">{description.personality}</p>
                <p>{description.role}</p>
              </div>
              
              <div>
                <h3 className="text-white font-pixel text-xl mb-4">Collection Details</h3>
                <p className="mb-6">{description.collectionDetails}</p>
                
                <h3 className="text-white font-pixel text-xl mb-4">Technical Specifications</h3>
                <ul className="space-y-4 text-sm font-mono bg-black/30 p-4 rounded-lg border border-gray-800">
                  <li className="flex gap-3"><span className="text-neon-cyan">▶</span> <strong>Resolution:</strong> True 4K (3840x2160) for Desktop and Mobile.</li>
                  <li className="flex gap-3"><span className="text-neon-pink">▶</span> <strong>Enhancement:</strong> AI-Upscaled using Real-ESRGAN models.</li>
                  <li className="flex gap-3"><span className="text-neon-cyan">▶</span> <strong>Color Space:</strong> DCI-P3 optimized for modern smartphone displays.</li>
                  <li className="flex gap-3"><span className="text-neon-pink">▶</span> <strong>File Format:</strong> High-quality PNG/WebP for maximum detail retention.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-800">
              <h2 className="font-pixel text-3xl text-white mb-8 uppercase tracking-widest text-center">
                Frequently Asked <span className="text-neon-cyan">Questions</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300 font-body">
                <div className="bg-black/20 p-6 rounded-xl border border-gray-800/50">
                  <h4 className="text-neon-cyan font-pixel text-lg mb-2">Are these {name} wallpapers free to download?</h4>
                  <p className="text-sm">Yes, all wallpapers in our {name} collection are completely free for personal use as backgrounds for your devices.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-xl border border-gray-800/50">
                  <h4 className="text-neon-cyan font-pixel text-lg mb-2">What is the best way to apply these as backgrounds?</h4>
                  <p className="text-sm">For the best results, download the high-resolution file and use your device&apos;s system settings to apply it. Avoid using "set as wallpaper" directly from the browser to ensure full 4K quality.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-xl border border-gray-800/50">
                  <h4 className="text-neon-cyan font-pixel text-lg mb-2">Do you have {name} live wallpapers?</h4>
                  <p className="text-sm">We frequently update our archive. Check the collection for video formats (.mp4) which can be used as live backgrounds on most Android and some iOS devices.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-xl border border-gray-800/50">
                  <h4 className="text-neon-cyan font-pixel text-lg mb-2">How are these images enhanced?</h4>
                  <p className="text-sm">We use advanced AI upscaling and custom color grading to transform standard animation frames into high-fidelity 4K digital assets while preserving the original art style.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Adsterra Native Banner (High Visibility) */}
        <section className="mt-20 max-w-5xl mx-auto p-6 bg-card-bg/40 border border-gray-800 rounded-2xl overflow-hidden text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <p className="font-pixel text-xs text-neon-cyan/60 uppercase tracking-[0.2em] mb-6">Discovery Network</p>
          <div id="container-771ab3dea3f70f996da234efbf13d803"></div>
          <Script 
            src="https://pl29025162.profitablecpmratenetwork.com/771ab3dea3f70f996da234efbf13d803/invoke.js" 
            strategy="afterInteractive"
            data-cfasync="false"
          />
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
          onDownload={handleDownloadClick}
        />
      )}

      <DownloadModal 
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onConfirm={() => pendingDownload && triggerDownload(pendingDownload.url, pendingDownload.title)}
        fileName={pendingDownload?.title || ""}
      />

      <Footer />
    </div>
  );
}
