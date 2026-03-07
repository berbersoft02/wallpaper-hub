import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Only_dias Ocean",
  description: "Get in touch with Only_dias Ocean for wallpaper requests, business inquiries, or feedback.",
  alternates: {
    canonical: '/contact',
  },
};

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
              <div className="flex gap-8 mt-2">
                <a href="https://x.com/SaidAhrikenchi2" target="_blank" className="flex items-center gap-2 hover:text-neon-pink transition-all scale-110" title="X (Twitter)">
                  <Twitter size={20} />
                  <span>Twitter</span>
                </a>
                <a href="https://www.tiktok.com/@noxzx_kb" target="_blank" className="flex items-center gap-2 hover:text-white transition-all scale-110" title="TikTok">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.14.96.13 1.98.74 2.73.61.77 1.55 1.24 2.52 1.33 1.05.08 2.14-.26 2.89-1.01.76-.73 1.21-1.77 1.25-2.83.03-4.13.01-8.26.02-12.39Z"/></svg>
                  <span>TikTok</span>
                </a>
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
