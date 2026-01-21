import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function IconsPage() {
  // Using some images from the public folder as "Profile Pictures"
  const iconIndices = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="font-pixel text-4xl md:text-6xl text-center mb-4 text-neon-cyan drop-shadow-[0_0_24px_rgba(5,217,232,0.8)]">
          ICONS & <span className="text-neon-pink">PFPS</span>
        </h1>
        <p className="font-body text-gray-400 text-center text-xl mb-12 max-w-2xl mx-auto">
          High-quality square profile pictures for Discord, TikTok, and more.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {iconIndices.map((num) => (
            <div 
              key={num}
              className="group relative aspect-square bg-card-bg border-2 border-gray-800 rounded-xl overflow-hidden hover:border-neon-cyan transition-all hover:scale-105"
            >
              <Image 
                src={`/${num}.png`}
                alt={`PFP ${num}`}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a 
                  href={`/${num}.png`}
                  download
                  className="bg-neon-cyan text-dark-bg font-pixel px-4 py-2 rounded text-sm hover:bg-white transition-colors"
                >
                  DOWNLOAD
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
