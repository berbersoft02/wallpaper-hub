import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import RecommendationButton from "./components/RecommendationButton";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Gallery />
        {/* --- About Me section --- */}
        <section id="about" className="bg-dark-bg/90 py-20 px-4 flex flex-col items-center text-center relative overflow-hidden">
          {/* Gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent"></div>
          
          <h2 className="font-pixel text-4xl md:text-5xl text-neon-cyan mb-6 relative z-10 drop-shadow-[0_0_24px_rgba(5,217,232,0.8)] animate-glow-cyan">About Me</h2>
          <p className="font-body text-gray-200 text-lg md:text-2xl max-w-xl mx-auto mb-8 relative z-10">
            23 yo engineer, interested in programming and design.<br/>
            Always passionate about creating digital experiences and learning new things.
          </p>
          
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
