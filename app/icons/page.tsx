"use client";

import { Download, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface IconData {
  icons: string[];
}

export default function IconsPage() {
  const [icons, setIcons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDownloadSuccessModal, setShowDownloadSuccessModal] = useState(false);

  useEffect(() => {
    const loadIcons = async () => {
      try {
        // We can fetch from a local JSON or just use the data
        const response = await fetch('/api/icons'); // I will create this API route
        if (!response.ok) {
          // Fallback to static data if API is not ready
          const data = { icons: Array.from({ length: 20 }, (_, i) => `/${i + 1}.png`) };
          setIcons(data.icons);
        } else {
          const data = await response.json();
          setIcons(data.icons || []);
        }
      } catch (error) {
        console.error('Error loading icons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadIcons();
  }, []);

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      
      const fileName = url.split('/').pop() || 'icon.png';
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      setShowDownloadSuccessModal(true);
    } catch (error) {
      console.error('Error downloading icon:', error);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="font-pixel text-4xl md:text-6xl text-center mb-4 text-neon-cyan drop-shadow-[0_0_24px_rgba(5,217,232,0.8)]">
          ICONS & <span className="text-neon-pink">PFPS</span>
        </h1>
        <p className="font-body text-gray-400 text-center text-xl mb-12 max-w-2xl mx-auto">
          Exclusive anime profile pictures and icons created with Photoshop and Canva.
        </p>

        {loading ? (
          <div className="text-center py-20 font-pixel text-2xl text-neon-cyan animate-pulse">
            LOADING ICONS...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {icons.map((url, index) => (
              <div 
                key={index}
                className="group relative aspect-square bg-card-bg border-2 border-gray-800 rounded-xl overflow-hidden hover:border-neon-cyan transition-all hover:scale-105"
              >
                <Image 
                  src={url}
                  alt={`Icon ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleDownload(url)}
                    className="bg-neon-cyan text-dark-bg font-pixel px-4 py-2 rounded text-sm hover:bg-white transition-colors shadow-[0_0_12px_rgba(5,217,232,0.6)]"
                  >
                    DOWNLOAD
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Download Success Modal */}
      {showDownloadSuccessModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          onClick={() => setShowDownloadSuccessModal(false)}
        >
          <div 
            className="relative bg-card-bg border-4 border-neon-pink p-8 max-w-md w-full mx-4 rounded-lg shadow-[0_0_64px_rgba(255,42,109,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDownloadSuccessModal(false)}
              className="absolute top-4 right-4 text-white hover:text-neon-pink transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-neon-pink/20 rounded-full flex items-center justify-center shadow-[0_0_32px_rgba(255,42,109,0.6)]">
                 <Download size={40} className="text-neon-pink animate-bounce" />
              </div>
              
              <h3 className="font-pixel text-2xl md:text-3xl text-neon-cyan drop-shadow-[0_0_16px_rgba(5,217,232,0.8)]">
                ICON SAVED!
              </h3>
              
              <p className="font-body text-gray-200 text-lg">
                Follow @noxzx_kb on TikTok for more edits!
              </p>
              
              <a 
                href="https://www.tiktok.com/@noxzx_kb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-pixel text-xl bg-neon-cyan text-dark-bg px-8 py-3 hover:bg-white hover:scale-105 transition-all pixel-border-pink rounded-md w-full"
              >
                VISIT TIKTOK
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}