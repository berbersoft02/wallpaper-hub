import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import IconsPFPs from "./components/IconsPFPs";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import RecommendationButton from "./components/RecommendationButton";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        {/* --- 1. WALLPAPERS SECTION --- */}
        <Gallery />

        {/* --- 2. BLOG SECTIONS --- */}
        {/* Blog Preview Section (Increases Content Value) */}
        <section className="py-20 px-4 bg-dark-bg/50 border-y border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-pixel text-3xl md:text-5xl text-white">
                Latest from the <span className="text-neon-cyan">Blog</span>
              </h2>
              <Link href="/blog" className="hidden md:inline-block text-neon-pink hover:text-white font-pixel text-xl transition-colors">
                View All Posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <article key={post.slug} className="bg-card-bg p-6 rounded-lg border border-gray-700 hover:border-neon-cyan transition-all group">
                  <span className="text-xs font-mono text-neon-pink mb-2 block">{post.date}</span>
                  <h3 className="font-pixel text-xl text-white mb-3 group-hover:text-neon-cyan transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-sm text-gray-300 hover:text-white underline decoration-neon-cyan/50">
                    Read Article
                  </Link>
                </article>
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link href="/blog" className="inline-block px-6 py-3 border border-neon-pink text-neon-pink font-pixel hover:bg-neon-pink hover:text-white transition-colors">
                View All Posts
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Guides Section (High Value Content) */}
        <section className="py-20 px-4 bg-dark-bg border-b border-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-pixel text-3xl md:text-4xl text-white mb-12 text-center">
              Essential <span className="text-neon-purple">Guides</span> & Workflow
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
                  <article key={post.slug} className="flex flex-col bg-card-bg rounded-xl overflow-hidden border border-gray-700 hover:border-neon-purple transition-all group p-6">
                    <span className="text-xs font-mono text-neon-purple mb-3 uppercase tracking-wider">Expert Guide</span>
                    <h3 className="font-pixel text-xl text-white mb-4 group-hover:text-neon-purple transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center text-white text-sm font-bold hover:text-neon-purple transition-colors">
                      Learn More <span className="ml-2">→</span>
                    </Link>
                  </article>
              ))}
            </div>
          </div>
        </section>

        {/* Character Stories Section */}
        <section className="py-20 px-4 bg-dark-bg/30 border-b border-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-pixel text-3xl md:text-4xl text-white mb-12 text-center">
              Character <span className="text-neon-pink">Stories</span> & Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getAllPosts()
                .filter(p => [
                  'frieren-story-analysis',
                  'violet-evergarden-story',
                  'shikimori-4k-wallpapers-guide',
                  'shiina-mahiru-4k-wallpapers-guide',
                  'alya-kujou-tsundere-editing-guide',
                  'tenka-izumo-guide'
                ].includes(p.slug))
                .map((post) => (
                  <article key={post.slug} className="bg-card-bg p-8 rounded-xl border border-gray-700 hover:border-neon-pink transition-all group">
                    <h3 className="font-pixel text-2xl text-white mb-4 group-hover:text-neon-pink transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-white font-bold hover:text-neon-pink transition-colors">
                      Read Story <span className="ml-2">→</span>
                    </Link>
                  </article>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/blog" className="inline-block px-10 py-4 bg-neon-pink/10 border-2 border-neon-pink text-neon-pink font-pixel text-xl hover:bg-neon-pink hover:text-white transition-all rounded-lg">
                EXPLORE ALL ARTICLES
              </Link>
            </div>
          </div>
        </section>

        {/* --- 3. ICONS & PFPS SECTION --- */}
        <IconsPFPs />

        {/* --- Content Description Section (For SEO & AdSense) --- */}
        <section className="py-16 px-4 max-w-7xl mx-auto text-center border-t border-gray-800">
          <h2 className="font-pixel text-3xl md:text-4xl text-white mb-8">
            The Ultimate <span className="text-neon-cyan">Anime Wallpaper</span> Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <h3 className="font-pixel text-2xl text-neon-pink">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Only_dias Ocean isn&apos;t just another wallpaper site. It&apos;s a curated gallery of high-resolution, hand-picked anime art designed to elevate your desktop and mobile screens. 
                We specialize in <strong>4K upscaled backgrounds</strong>, color-graded edits, and exclusive static artwork from the most popular series like <em>Demon Slayer</em>, <em>Jujutsu Kaisen</em>, and <em>Chainsaw Man</em>.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-pixel text-2xl text-neon-pink">Why Choose Us?</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Unlike automated scraper sites, every image here is verified for quality. No blurry JPEGs, no watermarks. 
                Whether you&apos;re looking for a moody cyberpunk city or a vibrant character portrait, our <strong>&quot;Special Collections&quot;</strong> filter helps you find the perfect aesthetic instantly. 
                Join our community on TikTok to request new drops!
              </p>
            </div>
          </div>
        </section>

        {/* --- FAQ Section (High Value Text Content) --- */}
        <section className="py-20 px-4 bg-dark-bg border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-pixel text-3xl md:text-4xl text-neon-cyan mb-12 text-center">
              Frequently Asked <span className="text-white">Questions</span>
            </h2>
            
            <div className="space-y-8 font-body text-gray-300">
              <div className="bg-card-bg p-6 rounded-xl border border-gray-800">
                <h3 className="font-pixel text-xl text-neon-pink mb-2">Are these wallpapers free to use?</h3>
                <p>Yes, all wallpapers on Only_dias Ocean are free for personal use. You can use them on your phone, desktop, or tablet. However, you cannot sell them or use them for commercial projects without permission from the original rights holders.</p>
              </div>

              <div className="bg-card-bg p-6 rounded-xl border border-gray-800">
                <h3 className="font-pixel text-xl text-neon-cyan mb-2">How do you achieve 4K quality?</h3>
                <p>We use a multi-step process involving AI upscaling (Real-ESRGAN) and manual retouching in Adobe Photoshop. This allows us to take standard 1080p anime frames and enhance them to 3840x2160 resolution without losing the original art style.</p>
              </div>

              <div className="bg-card-bg p-6 rounded-xl border border-gray-800">
                <h3 className="font-pixel text-xl text-neon-purple mb-2">Can I request a specific character?</h3>
                <p>Absolutely! Most of our &quot;Exclusive Drops&quot; come from community requests on TikTok. You can use the &quot;Contact&quot; page or drop a comment on our latest video to suggest the next collection.</p>
              </div>

              <div className="bg-card-bg p-6 rounded-xl border border-gray-800">
                <h3 className="font-pixel text-xl text-white mb-2">Why do some images look different from the anime?</h3>
                <p>We often apply color grading and lighting effects to match our &quot;Neon Ocean&quot; aesthetic. This might include enhancing the glow of a magic spell, shifting the color palette to be cooler or warmer, or adding atmospheric depth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- About Me section --- */}
        <section id="about" className="bg-dark-bg/90 py-20 px-4 flex flex-col items-center text-center relative overflow-hidden">
          {/* Gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent"></div>
          
          <h2 className="font-pixel text-4xl md:text-5xl text-neon-cyan mb-6 relative z-10 drop-shadow-[0_0_24px_rgba(5,217,232,0.8)] animate-glow-cyan">Meet the Editor</h2>
          <div className="font-body text-gray-200 text-lg md:text-xl max-w-3xl mx-auto mb-8 relative z-10 space-y-4">
            <p>
              HI I&apos;m DIAS with a deep passion for digital art and programming. By day, I solve complex engineering problems; by night, I dive into the world of anime editing and web development.
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
            
            <RecommendationButton />
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
