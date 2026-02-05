import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="font-pixel text-4xl md:text-6xl text-neon-cyan mb-8 text-center drop-shadow-[0_0_24px_rgba(5,217,232,0.8)]">
          CONTACT <span className="text-neon-pink">US</span>
        </h1>

        <div className="bg-card-bg border-2 border-gray-800 p-8 rounded-lg shadow-xl">
          <p className="font-body text-gray-300 text-lg mb-8 text-center">
            Have a question, feedback, or a business inquiry? We'd love to hear from you.
          </p>

          <div className="space-y-8">
            <div className="flex flex-col items-center p-6 bg-dark-bg/50 rounded-lg border border-gray-700 hover:border-neon-pink transition-all">
              <h3 className="font-pixel text-2xl text-neon-cyan mb-2">Social Media</h3>
              <div className="flex gap-6 mt-2">
                <a href="https://x.com/SaidAhrikenchi2" target="_blank" className="hover:text-neon-pink transition-all scale-110">Twitter</a>
                <a href="https://www.instagram.com/said_ahriken/" target="_blank" className="hover:text-neon-cyan transition-all scale-110">Instagram</a>
                <a href="https://www.tiktok.com/@noxzx_kb" target="_blank" className="hover:text-white transition-all scale-110">TikTok</a>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-500 font-body text-sm">
            We typically respond to emails within 24-48 hours.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
