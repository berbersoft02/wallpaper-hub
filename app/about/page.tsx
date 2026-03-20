import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import { Terminal, Cpu, Camera, Palette, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-20">
        <header className="text-center mb-16">
          <h1 className="font-pixel text-4xl md:text-6xl text-neon-cyan mb-6 drop-shadow-[0_0_20px_rgba(5,217,232,0.5)]">
            BEHIND THE <span className="text-neon-pink">LENS</span>
          </h1>
          <p className="font-body text-gray-400 text-xl tracking-wide">
            From Blida to the World: My Journey in Anime Art Curation.
          </p>
        </header>

        <section className="prose prose-invert max-w-none font-body text-lg leading-relaxed text-gray-300">
          <div className="bg-card-bg border-2 border-gray-800 p-8 rounded-2xl mb-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <h2 className="font-pixel text-2xl text-neon-pink mb-6 flex items-center gap-3">
              <Globe className="text-neon-cyan" /> THE ORIGIN STORY
            </h2>
            <p>
              My journey didn&apos;t start in a high-tech studio. It started in <strong>Blida, Algeria</strong>, with a passion for anime and a very slow internet connection. Back then, finding high-quality wallpapers for my favorite series like <em>Demon Slayer</em> or <em>Jujutsu Kaisen</em> was a struggle. Most images were compressed, blurry, or watermarked.
            </p>
            <p>
              I began experimenting with basic upscaling techniques, trying to fix the images I loved. This hobby turned into an obsession when I moved to <strong>France</strong>. Surrounded by a vibrant tech and art scene, I realized that many others shared my frustration. They wanted their desktops to look as crisp as the original animation frames.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
              <h3 className="font-pixel text-neon-cyan mb-4 flex items-center gap-2">
                <Cpu size={20} /> THE TECH STACK
              </h3>
              <ul className="space-y-3 text-sm font-mono">
                <li className="flex justify-between"><span>Upscaling:</span> <span className="text-neon-pink">Real-ESRGAN / Topaz</span></li>
                <li className="flex justify-between"><span>Editing:</span> <span className="text-neon-pink">Adobe Photoshop 2024</span></li>
                <li className="flex justify-between"><span>Color Grading:</span> <span className="text-neon-pink">Lightroom Classic</span></li>
                <li className="flex justify-between"><span>Frontend:</span> <span className="text-neon-pink">Next.js 15 / Tailwind</span></li>
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
              <h3 className="font-pixel text-neon-pink mb-4 flex items-center gap-2">
                <Heart size={20} /> THE MISSION
              </h3>
              <p className="text-sm">
                To create the ultimate archive of 4K anime art. Every image on this site is manually curated, upscaled using custom AI models, and color-corrected to ensure it looks perfect on high-end OLED and IPS monitors.
              </p>
            </div>
          </div>

          <h2 className="font-pixel text-2xl text-white mb-6">WHY I DO THIS</h2>
          <p>
            Anime is more than just entertainment; it&apos;s a visual language. The way Ufotable handles light in <em>Fate/stay night</em> or the way MAPPA handles grit in <em>Chainsaw Man</em> deserves to be seen in full 2160p glory. 
          </p>
          <p>
            This website is my contribution to the community. No ads that cover the content, no hidden subscription fees—just pure, high-resolution art for fans, by a fan.
          </p>

          <div className="mt-16 p-8 bg-gradient-to-r from-neon-cyan/10 to-neon-pink/10 border border-white/10 rounded-2xl text-center">
            <h3 className="font-pixel text-xl mb-4 text-white">WANT TO COLLABORATE?</h3>
            <p className="mb-6">I&apos;m always looking for talented artists and editors to feature.</p>
            <a 
              href="https://www.tiktok.com/@only_dias" 
              className="inline-block bg-white text-black font-pixel px-8 py-3 rounded-full hover:bg-neon-cyan hover:text-white transition-all transform hover:scale-105"
            >
              CONTACT VIA TIKTOK
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}