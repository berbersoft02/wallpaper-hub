"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WallpaperShowcase from "./components/WallpaperShowcase";
import Gallery from "./components/Gallery";
import IconsPFPs from "./components/IconsPFPs";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import RecommendationButton from "./components/RecommendationButton";
import { getAllPosts } from "@/lib/blog";
import { GlowCard } from "./components/ui/spotlight-card";
import RecommendationModal from "./components/RecommendationModal";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        {/* --- 1. BLOG SECTION --- */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-pixel text-4xl md:text-6xl text-white mb-6">
                Anime <span className="text-neon-pink">Analysis</span> & Editing
              </h2>
              <p className="font-body text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                Deep dives into the technical artistry of modern anime, from color grading to AI-assisted restoration techniques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <GlowCard key={post.slug} glowColor="blue" customSize={true} className="flex flex-col bg-card-bg/40 p-8 rounded-xl border-gray-700 hover:border-neon-cyan/50 transition-all group min-h-[400px]">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-mono text-neon-pink bg-neon-pink/10 px-3 py-1 rounded-full">{post.date}</span>
                    <span className="text-[10px] font-pixel text-gray-500 uppercase tracking-widest">Article #0{recentPosts.indexOf(post) + 1}</span>
                  </div>
                  <h3 className="font-pixel text-2xl text-white mb-4 group-hover:text-neon-cyan transition-colors leading-tight">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 text-lg line-clamp-4 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-md font-pixel text-neon-cyan hover:text-white mt-auto flex items-center gap-2 group/link">
                    CONTINUE READING <span className="group-hover/link:translate-x-2 transition-transform">→</span>
                  </Link>
                </GlowCard>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/blog" className="inline-block px-12 py-5 bg-white text-black font-pixel text-xl hover:bg-neon-cyan hover:text-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                VIEW ALL ARTISTIC GUIDES
              </Link>
            </div>
          </div>
        </section>

        {/* --- 2. WALLPAPERS SECTION --- */}
        <Gallery onRecommendClick={() => setIsModalOpen(true)} />

        {/* --- 3. ICONS & PFPS SECTION --- */}
        <IconsPFPs />

        {/* --- 4. FEATURED GUIDES SECTION --- */}
        <section className="py-20 px-4 bg-dark-bg border-b border-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-pixel text-3xl md:text-4xl text-white mb-12 text-center uppercase tracking-widest italic">
              Technical <span className="text-neon-purple">Workflows</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getAllPosts()
                .filter(p => [
                  'workflow-guide',
                  'live-wallpapers-4k-guide',
                  'anime-car-wallpapers-guide',
                  'pixel-art-anime-guide'
                ].includes(p.slug))
                .map((post) => (
                  <GlowCard key={post.slug} glowColor="purple" customSize={true} className="flex flex-col bg-card-bg/40 rounded-xl overflow-hidden border-gray-700 hover:border-neon-purple/50 transition-all group p-6">
                    <span className="text-[10px] font-pixel text-neon-purple mb-3 uppercase tracking-wider">Expert Protocol</span>
                    <h3 className="font-pixel text-xl text-white mb-4 group-hover:text-neon-purple transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center text-white text-xs font-pixel hover:text-neon-purple transition-colors">
                      LOAD DATA <span className="ml-2">_</span>
                    </Link>
                  </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5. CONTENT DESCRIPTION SECTION (Critical for SEO & AdSense) --- */}
        <section className="py-24 px-4 max-w-7xl mx-auto border-t border-gray-800 relative overflow-hidden">
          <div className="absolute -right-24 top-24 w-64 h-64 bg-neon-pink/5 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="font-pixel text-3xl md:text-5xl text-white mb-16 text-center">
            Digital <span className="text-neon-cyan">Preservation</span> Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 bg-gray-900/30 rounded-2xl border border-gray-800/50">
              <h3 className="font-pixel text-2xl text-neon-pink">01. Curated Archive</h3>
              <p className="text-gray-400 leading-relaxed text-lg font-body">
                Unlike automated scrapper websites, Only_dias Ocean is a hand-picked repository. Every piece of art is selected based on its emotional impact and compositional quality, ensuring your device gets more than just a picture—it gets a masterpiece.
              </p>
            </div>
            <div className="space-y-4 p-8 bg-gray-900/30 rounded-2xl border border-gray-800/50">
              <h3 className="font-pixel text-2xl text-neon-pink">02. 4K Restoration</h3>
              <p className="text-gray-400 leading-relaxed text-lg font-body">
                We bridge the gap between broadcast quality and modern display technology. Using proprietary AI upscaling workflows and manual color grading, we restore classic and modern anime frames to true 4K resolution (3840x2160).
              </p>
            </div>
            <div className="space-y-4 p-8 bg-gray-900/30 rounded-2xl border border-gray-800/50">
              <h3 className="font-pixel text-2xl text-neon-pink">03. Community First</h3>
              <p className="text-gray-400 leading-relaxed text-lg font-body">
                Our content strategy is driven by the community. Most of our exclusive drops are inspired by direct requests from our TikTok followers, making this a living, breathing project that evolves with the fans.
              </p>
            </div>
          </div>
        </section>

        {/* --- 6. FAQ SECTION --- */}
        <section className="py-24 px-4 bg-dark-bg border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-pixel text-4xl text-neon-cyan mb-16 text-center">
              System <span className="text-white">F.A.Q.</span>
            </h2>

            <div className="grid grid-cols-1 gap-6 font-body text-gray-300">
              <div className="bg-card-bg/60 p-8 rounded-xl border border-gray-800 hover:border-neon-pink transition-colors group">
                <h3 className="font-pixel text-xl text-neon-pink mb-3 group-hover:text-white transition-colors">Are these wallpapers legally compliant?</h3>
                <p className="text-md leading-relaxed">Yes, all wallpapers on Only_dias Ocean are provided for personal, non-commercial use as digital desktop/mobile backgrounds. We encourage users to support the original animation studios by purchasing official merchandise and streaming from licensed platforms.</p>
              </div>

              <div className="bg-card-bg/60 p-8 rounded-xl border border-gray-800 hover:border-neon-cyan transition-colors group">
                <h3 className="font-pixel text-xl text-neon-cyan mb-3 group-hover:text-white transition-colors">How do you achieve true 4K quality?</h3>
                <p className="text-md leading-relaxed">Our workflow involves custom-trained Real-ESRGAN AI models specifically optimized for line-art and cel-shading. This is followed by manual retouching in Photoshop to fix compression artifacts and custom LUT color grading for HDR-ready displays.</p>
              </div>

              <div className="bg-card-bg/60 p-8 rounded-xl border border-gray-800 hover:border-neon-purple transition-colors group">
                <h3 className="font-pixel text-xl text-neon-purple mb-3 group-hover:text-white transition-colors">Can I request a specific anime character?</h3>
                <p className="text-md leading-relaxed">Absolutely! Most of our collections are born from TikTok community requests. Join our channel and drop a comment on the latest video with your character request. We prioritize characters with high-resolution source availability.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 7. ABOUT ME SECTION --- */}
        <section id="about" className="bg-dark-bg/90 py-20 px-4 flex flex-col items-center text-center relative overflow-hidden">
          {/* Gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent"></div>

          <h2 className="font-pixel text-4xl md:text-5xl text-neon-cyan mb-6 relative z-10 drop-shadow-[0_0_24px_rgba(5,217,232,0.8)] animate-glow-cyan">Meet the Editor</h2>
          <div className="font-body text-gray-200 text-lg md:text-xl max-w-3xl mx-auto mb-8 relative z-10 space-y-4">
            <p>
              HI I'm DIAS with a deep passion for digital art and programming. By day, I solve complex engineering problems; by night, I dive into the world of anime editing and web development.
            </p>
            <p>
              This project started as a simple way to share better wallpapers with my TikTok community, but it has grown into something much bigger.
            </p>
            <Link href="/about" className="inline-block text-neon-pink hover:text-white underline decoration-neon-pink/50 hover:decoration-white transition-all">
              Read my full story here →
            </Link>
          </div>

          <div className="flex justify-center gap-6 my-8 relative z-10">
            <a href="https://x.com/SaidAhrikenchi2" target="_blank" rel="noopener noreferrer" className="hover:text-neon-pink transition-all hover:scale-125 hover:drop-shadow-[0_0_16px_rgba(255,42,109,0.8)]" title="X (Twitter)">
               <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@noxzx_kb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-125 hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]" title="TikTok">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.14.96.13 1.98.74 2.73.61.77 1.55 1.24 2.52 1.33 1.05.08 2.14-.26 2.89-1.01.76-.73 1.21-1.77 1.25-2.83.03-4.13.01-8.26.02-12.39Z"/></svg>
            </a>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center relative z-10">
            <a
              href="https://ugccreatorportfoliobyyous.my.canva.site/algerian-sign-language"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-neon-cyan hover:bg-neon-cyan/80 text-white font-pixel text-xl px-10 py-4 rounded-full shadow-[0_0_32px_rgba(5,217,232,0.6)] hover:shadow-[0_0_48px_rgba(5,217,232,0.9)] transition-all hover:scale-110 border-2 border-neon-cyan/50"
            >
              My App: Algerian Sign Language
            </a>

            <a
              href="https://www.paypal.com/ncp/payment/ZLNFBVUXYBFK2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-pixel text-xl px-10 py-4 rounded-full shadow-[0_0_32px_rgba(249,115,22,0.6)] hover:shadow-[0_0_48px_rgba(249,115,22,0.9)] transition-all hover:scale-110 border-2 border-orange-400/50"
            >
              Donate with PayPal
            </a>

            <RecommendationButton onClick={() => setIsModalOpen(true)} />
          </div>
        </section>
        <Footer />
        <RecommendationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
