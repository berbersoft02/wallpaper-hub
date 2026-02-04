import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
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
        
        {/* --- Content Description Section (For SEO & AdSense) --- */}
        <section className="py-16 px-4 max-w-7xl mx-auto text-center">
          <h2 className="font-pixel text-3xl md:text-4xl text-white mb-8">
            The Ultimate <span className="text-neon-cyan">Anime Wallpaper</span> Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <h3 className="font-pixel text-2xl text-neon-pink">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Only_dias Ocean isn't just another wallpaper site. It's a curated gallery of high-resolution, hand-picked anime art designed to elevate your desktop and mobile screens. 
                We specialize in <strong>4K upscaled backgrounds</strong>, color-graded edits, and exclusive static artwork from the most popular series like <em>Demon Slayer</em>, <em>Jujutsu Kaisen</em>, and <em>Chainsaw Man</em>.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-pixel text-2xl text-neon-pink">Why Choose Us?</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Unlike automated scraper sites, every image here is verified for quality. No blurry JPEGs, no watermarks. 
                Whether you're looking for a moody cyberpunk city or a vibrant character portrait, our <strong>"Special Collections"</strong> filter helps you find the perfect aesthetic instantly. 
                Join our community on TikTok to request new drops!
              </p>
            </div>
          </div>
        </section>

        <Gallery />

        {/* --- Blog Preview Section (Increases Content Value) --- */}
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

        {/* --- Featured Guides Section (New for AdSense) --- */}
        <section className="py-20 px-4 bg-dark-bg border-b border-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-pixel text-3xl md:text-4xl text-white mb-12 text-center">
              Essential <span className="text-neon-purple">Guides</span> for Your Setup
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {getAllPosts()
                .filter(p => p.slug === 'anime-wallpaper-setup-guide' || p.slug === 'anime-wallpaper-editing-workflow-pro')
                .map((post) => (
                  <article key={post.slug} className="flex flex-col md:flex-row bg-card-bg rounded-xl overflow-hidden border border-gray-700 hover:border-neon-purple transition-all group">
                    <div className="p-8 flex flex-col justify-center">
                      <span className="text-xs font-mono text-neon-purple mb-3 uppercase tracking-wider">Guide</span>
                      <h3 className="font-pixel text-2xl text-white mb-4 group-hover:text-neon-purple transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-white font-bold hover:text-neon-purple transition-colors">
                        Read Guide <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </article>
              ))}
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
                <p>Absolutely! Most of our "Exclusive Drops" come from community requests on TikTok. You can use the "Contact" page or drop a comment on our latest video to suggest the next collection.</p>
              </div>

              <div className="bg-card-bg p-6 rounded-xl border border-gray-800">
                <h3 className="font-pixel text-xl text-white mb-2">Why do some images look different from the anime?</h3>
                <p>We often apply color grading and lighting effects to match our "Neon Ocean" aesthetic. This might include enhancing the glow of a magic spell, shifting the color palette to be cooler or warmer, or adding atmospheric depth.</p>
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
              I'm a 23-year-old engineer with a deep passion for digital art and programming. By day, I solve complex engineering problems; by night, I dive into the world of anime editing and web development.
            </p>
            <p>
              I've always been fascinated by how color and light can change the mood of a scene. This fascination led me to start my TikTok channel, <strong>@noxzx_kb</strong>, where I share my editing process and speed-edits with over thousands of followers. Only_dias Ocean is the natural extension of that community—a place where you can finally download the art you see in my videos.
            </p>
          </div>
          
          <a 
            href="mailto:berbersoft@gmail.com" 
            className="font-body text-gray-300 text-lg md:text-xl mb-8 relative z-10 hover:text-neon-cyan transition-all hover:drop-shadow-[0_0_12px_rgba(5,217,232,0.8)] underline decoration-neon-cyan/50 hover:decoration-neon-cyan"
          >
            berbersoft@gmail.com
          </a>

          <div className="flex justify-center gap-6 my-8 relative z-10">
            <a href="https://x.com/SaidAhrikenchi2" target="_blank" rel="noopener noreferrer" className="hover:text-neon-pink transition-all hover:scale-125 hover:drop-shadow-[0_0_16px_rgba(255,42,109,0.8)]" title="Twitter">
               <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.818 1.61-2 2c0 0-.6-1-1.5-1.5s-2.167-.764-3.5 0-2.053 2.857-2 4 .698 4.292 5 5c2.441.5 5-2 5-2s-1.64 2.357-5 2.5C7 18.5 2 14 2 14S7.5 18 13.5 17c3.505-.652 4.854-4.059 5-7 .033-.705-.019-1.405-.146-2.083C21.076 9.336 22 4 22 4Z"></path></svg>
            </a>
            <a href="https://www.instagram.com/said_ahriken/" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-all hover:scale-125 hover:drop-shadow-[0_0_16px_rgba(5,217,232,0.8)]" title="Instagram">
               <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16.24 7.76a6 6 0 1 1-8.48 8.48 6 6 0 0 1 8.48-8.48z" /><circle cx="17.5" cy="6.5" r=".5"/></svg>
            </a>
            <a href="https://www.tiktok.com/@noxzx_kb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-125 hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]" title="TikTok">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.8 10.47a5.13 5.13 0 0 1-2.89-.89V15a5 5 0 1 1-5-5 .76.76 0 0 1 .76.76V13a2.25 2.25 0 1 0 2.25 2.25V3.36A8.61 8.61 0 0 0 19 4.62c0 2.79 1.93 5.15 4.59 5.37V10.3a.18.18 0 0 1-.18.17Z"></path></svg>
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
