import { ArrowDown, Gamepad2 } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      {/* Background Decor Icons */}
        <div 
          className="absolute top-[50%] left-[3%] w-16 h-16 md:w-20 md:h-20 opacity-48 hover:opacity-58 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-3 20s ease-in-out infinite'
          }}
        >
          <Image 
            src="/3.png" 
            alt="Anime character" 
            width={80} 
            height={80}
            className="w-full h-full object-cover rounded-full shadow-[0_0_24px_rgba(5,217,232,0.6)] ring-2 ring-neon-cyan/50"
            unoptimized
          />
        </div>

        {/* Anime Image 4 - Random Position */}
        <div 
          className="absolute top-[45%] right-[10%] w-14 h-14 md:w-18 md:h-18 opacity-45 hover:opacity-55 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-4 16s ease-in-out infinite'
          }}
        >
          <Image 
            src="/4.png" 
            alt="Anime character" 
            width={72} 
            height={72}
            className="w-full h-full object-cover rounded-full"
            unoptimized
          />
        </div>

        {/* Anime Image 5 - Random Position */}
        <div 
          className="absolute bottom-[20%] left-[6%] w-12 h-12 md:w-16 md:h-16 opacity-50 hover:opacity-60 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-5 19s ease-in-out infinite'
          }}
        >
          <Image 
            src="/5.png" 
            alt="Anime character" 
            width={64} 
            height={64}
            className="w-full h-full object-cover rounded-full"
            unoptimized
          />
        </div>

        {/* Anime Image 6 - Random Position */}
        <div 
          className="absolute bottom-[25%] right-[4%] w-16 h-16 md:w-20 md:h-20 opacity-48 hover:opacity-58 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-6 17s ease-in-out infinite'
          }}
        >
          <Image 
            src="/6.png" 
            alt="Anime character" 
            width={80} 
            height={80}
            className="w-full h-full object-cover rounded-full"
            unoptimized
          />
        </div>

        {/* Anime Image 7 - Random Position */}
        <div 
          className="absolute top-[30%] left-[25%] w-12 h-12 md:w-16 md:h-16 opacity-40 hover:opacity-50 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-7 21s ease-in-out infinite'
          }}
        >
          <Image 
            src="/7.png" 
            alt="Anime character" 
            width={64} 
            height={64}
            className="w-full h-full object-cover rounded-full"
            unoptimized
          />
        </div>

        {/* Anime Image 8 - Random Position */}
        <div 
          className="absolute bottom-[35%] right-[20%] w-14 h-14 md:w-18 md:h-18 opacity-42 hover:opacity-52 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-8 14s ease-in-out infinite'
          }}
        >
          <Image 
            src="/8.png" 
            alt="Anime character" 
            width={72} 
            height={72}
            className="w-full h-full object-cover rounded-full"
            unoptimized
          />
        </div>

        {/* More random anime images scattered around */}
        <div 
          className="absolute top-[5%] left-[50%] w-12 h-12 md:w-16 md:h-16 opacity-45 hover:opacity-55 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-1 15s ease-in-out 2s infinite'
          }}
        >
          <Image 
            src="/9.png" 
            alt="Anime character" 
            width={64} 
            height={64}
            className="w-full h-full object-cover rounded-full"
            unoptimized
          />
        </div>

        <div 
          className="absolute top-[70%] left-[40%] w-14 h-14 md:w-18 md:h-18 opacity-43 hover:opacity-53 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-2 18s ease-in-out 3s infinite'
          }}
        >
          <Image 
            src="/10.png" 
            alt="Anime character" 
            width={72} 
            height={72}
            className="w-full h-full object-cover rounded-full"
            unoptimized
          />
        </div>

        <div 
          className="absolute top-[25%] right-[35%] w-12 h-12 md:w-16 md:h-16 opacity-46 hover:opacity-56 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-3 20s ease-in-out 1.5s infinite'
          }}
        >
          <Image 
            src="/11.png" 
            alt="Anime character" 
            width={64} 
            height={64}
            className="w-full h-full object-cover rounded-full"
            unoptimized
          />
        </div>

        <div 
          className="absolute bottom-[10%] left-[30%] w-14 h-14 md:w-18 md:h-18 opacity-44 hover:opacity-54 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-4 16s ease-in-out 2.5s infinite'
          }}
        >
          <Image 
            src="/12.png" 
            alt="Anime character" 
            width={72} 
            height={72}
            className="w-full h-full object-cover rounded-full"
            unoptimized
          />
        </div>

        {/* Additional anime images 13-31 scattered around */}
        <div 
          className="absolute top-[8%] left-[15%] w-12 h-12 md:w-16 md:h-16 opacity-43 hover:opacity-53 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-5 19s ease-in-out 0.5s infinite'
          }}
        >
          <Image src="/13.png" alt="Anime character" width={104} height={104} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[60%] right-[15%] w-14 h-14 md:w-18 md:h-18 opacity-46 hover:opacity-56 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-6 17s ease-in-out 1s infinite'
          }}
        >
          <Image src="/14.png" alt="Anime character" width={120} height={120} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[40%] left-[20%] w-12 h-12 md:w-16 md:h-16 opacity-44 hover:opacity-54 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-7 21s ease-in-out 1.2s infinite'
          }}
        >
          <Image src="/15.png" alt="Anime character" width={96} height={96} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute bottom-[15%] right-[25%] w-14 h-14 md:w-18 md:h-18 opacity-45 hover:opacity-55 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-8 14s ease-in-out 0.8s infinite'
          }}
        >
          <Image src="/16.png" alt="Anime character" width={128} height={128} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[20%] right-[45%] w-12 h-12 md:w-16 md:h-16 opacity-42 hover:opacity-52 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-1 15s ease-in-out 2.2s infinite'
          }}
        >
          <Image src="/17.png" alt="Anime character" width={112} height={112} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute bottom-[40%] left-[15%] w-14 h-14 md:w-18 md:h-18 opacity-47 hover:opacity-57 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-2 18s ease-in-out 1.8s infinite'
          }}
        >
          <Image src="/18.png" alt="Anime character" width={120} height={120} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[75%] right-[30%] w-12 h-12 md:w-16 md:h-16 opacity-41 hover:opacity-51 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-3 20s ease-in-out 0.3s infinite'
          }}
        >
          <Image src="/19.png" alt="Anime character" width={104} height={104} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[12%] left-[60%] w-14 h-14 md:w-18 md:h-18 opacity-48 hover:opacity-58 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-4 16s ease-in-out 1.4s infinite'
          }}
        >
          <Image src="/20.png" alt="Anime character" width={128} height={128} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute bottom-[30%] right-[12%] w-12 h-12 md:w-16 md:h-16 opacity-43 hover:opacity-53 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-5 19s ease-in-out 2.8s infinite'
          }}
        >
          <Image src="/21.png" alt="Anime character" width={112} height={112} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[55%] left-[45%] w-14 h-14 md:w-18 md:h-18 opacity-46 hover:opacity-56 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-6 17s ease-in-out 0.7s infinite'
          }}
        >
          <Image src="/22.png" alt="Anime character" width={120} height={120} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute bottom-[50%] right-[40%] w-12 h-12 md:w-16 md:h-16 opacity-44 hover:opacity-54 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-7 21s ease-in-out 1.6s infinite'
          }}
        >
          <Image src="/23.png" alt="Anime character" width={96} height={96} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[35%] left-[35%] w-14 h-14 md:w-18 md:h-18 opacity-45 hover:opacity-55 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-8 14s ease-in-out 2.3s infinite'
          }}
        >
          <Image src="/24.png" alt="Anime character" width={128} height={128} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute bottom-[18%] left-[22%] w-12 h-12 md:w-16 md:h-16 opacity-42 hover:opacity-52 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-1 15s ease-in-out 1.1s infinite'
          }}
        >
          <Image src="/25.png" alt="Anime character" width={112} height={112} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[65%] left-[28%] w-14 h-14 md:w-18 md:h-18 opacity-47 hover:opacity-57 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-2 18s ease-in-out 0.4s infinite'
          }}
        >
          <Image src="/26.png" alt="Anime character" width={120} height={120} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[18%] right-[22%] w-12 h-12 md:w-16 md:h-16 opacity-41 hover:opacity-51 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-3 20s ease-in-out 2.6s infinite'
          }}
        >
          <Image src="/27.png" alt="Anime character" width={104} height={104} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute bottom-[45%] left-[38%] w-14 h-14 md:w-18 md:h-18 opacity-48 hover:opacity-58 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-4 16s ease-in-out 0.9s infinite'
          }}
        >
          <Image src="/28.png" alt="Anime character" width={128} height={128} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[45%] right-[18%] w-12 h-12 md:w-16 md:h-16 opacity-43 hover:opacity-53 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-5 19s ease-in-out 1.7s infinite'
          }}
        >
          <Image src="/29.png" alt="Anime character" width={112} height={112} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute bottom-[12%] right-[35%] w-14 h-14 md:w-18 md:h-18 opacity-46 hover:opacity-56 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-6 17s ease-in-out 2.4s infinite'
          }}
        >
          <Image src="/30.png" alt="Anime character" width={120} height={120} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

        <div 
          className="absolute top-[28%] left-[55%] w-12 h-12 md:w-16 md:h-16 opacity-44 hover:opacity-54 transition-opacity duration-500 z-5"
          style={{
            animation: 'float-random-7 21s ease-in-out 0.6s infinite'
          }}
        >
          <Image src="/31.png" alt="Anime character" width={96} height={96} className="w-full h-full object-cover rounded-full" unoptimized />
        </div>

      {/* Background Decor Icons */}
      <div className="absolute top-20 left-10 text-neon-pink/15 animate-bounce z-10">
        <Gamepad2 size={64} />
      </div>
      <div className="absolute bottom-20 right-10 text-neon-cyan/15 animate-pulse z-10">
        <Gamepad2 size={80} />
      </div>

      <div className="relative z-10 max-w-4xl space-y-6">
        <div className="inline-block bg-neon-purple/30 px-6 py-2 rounded-full border-2 border-neon-purple mb-4 shadow-[0_0_20px_rgba(211,0,197,0.5)] animate-fade-in">
          <span className="font-pixel text-neon-pink text-sm md:text-base drop-shadow-[0_0_8px_rgba(255,42,109,0.8)]">✨ WELCOME TO MY WORLD</span>
        </div>
        
        <h1 className="font-pixel text-5xl md:text-8xl leading-tight animate-glow-hero drop-shadow-[0_0_24px_var(--color-neon-pink)]">
          LEVEL UP YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-orange-400 to-neon-cyan animate-sparkle">
            SCREENS
          </span>
        </h1>
        
        <p className="font-body text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto animate-fade-in-delay">
          Welcome here! Dive into my ocean of exclusive wallpapers. Follow me <span className="text-orange-400 font-bold animate-glow-orange drop-shadow-[0_0_12px_rgba(251,146,60,0.8)]">Only_dias</span> on TikTok!
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
          <a href="#gallery" className="group relative px-8 py-4 bg-neon-pink font-pixel text-xl text-white overflow-hidden transition-all hover:scale-110 shadow-[0_0_32px_rgba(255,42,109,0.6)] hover:shadow-[0_0_48px_rgba(255,42,109,0.9)] rounded-lg border-2 border-neon-pink/50">
            <span className="relative z-10 group-hover:tracking-wider transition-all">BROWSE GALLERY</span>
            <div className="absolute inset-0 h-full w-full bg-neon-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </a>
          
          <a href="https://www.tiktok.com/@noxzx_kb" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white font-pixel text-xl text-white hover:bg-white hover:text-dark-bg transition-all hover:scale-110 shadow-[0_0_24px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.7)] rounded-lg">
             TIKTOK CHANNEL
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ArrowDown className="text-neon-cyan w-8 h-8" />
      </div>
    </section>
  );
}
