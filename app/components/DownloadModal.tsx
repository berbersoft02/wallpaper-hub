"use client";

import { useState, useEffect } from "react";
import { X, Download, Timer, AlertCircle } from "lucide-react";
import Script from "next/script";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fileName: string;
}

export default function DownloadModal({ isOpen, onClose, onConfirm, fileName }: DownloadModalProps) {
  const [countdown, setCountdown] = useState(5);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && !ready) {
      setReady(true);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown, ready]);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setReady(false);
    }
  }, [isOpen]);

  const handleFinalDownload = () => {
    window.open("https://widthwidowzoology.com/bu8z5ayi?k", "_blank");
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md" 
        onClick={ready ? onClose : undefined} 
      />
      
      {/* Modal - Added scroll support and max height for mobile */}
      <div className="relative w-full max-w-md bg-gray-900 border-2 border-neon-cyan rounded-2xl flex flex-col shadow-[0_0_60px_rgba(5,217,232,0.4)] overflow-hidden max-h-[90vh]">
        
        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
          
          {/* Adsterra Banner Container - Better handled height */}
          <div className="mb-6 min-h-[100px] flex flex-col items-center justify-center bg-black/40 rounded-xl border border-gray-800 p-2 relative overflow-hidden">
             <div id="container-771ab3dea3f70f996da234efbf13d803" className="w-full"></div>
             <Script 
              key={`ad-script-${isOpen}`}
              src="https://pl29025162.profitablecpmratenetwork.com/771ab3dea3f70f996da234efbf13d803/invoke.js" 
              strategy="afterInteractive"
              data-cfasync="false"
            />
          </div>

          <div className="text-center">
            <h3 className="font-pixel text-xl md:text-2xl text-white mb-2 uppercase tracking-widest">
              {ready ? "Link Ready!" : "Generating Link..."}
            </h3>
            <p className="text-gray-500 font-body text-[10px] mb-6 truncate px-4 italic">{fileName}</p>
            
            <div className="flex justify-center mb-6">
              {!ready ? (
                <div className="relative flex items-center justify-center w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-gray-800"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray="213.6"
                      strokeDashoffset={213.6 - (213.6 * (5 - countdown)) / 5}
                      className="text-neon-pink transition-all duration-1000"
                    />
                  </svg>
                  <span className="absolute font-pixel text-2xl text-white">{countdown}s</span>
                </div>
              ) : (
                <div className="w-20 h-20 bg-neon-cyan/20 rounded-full flex items-center justify-center animate-bounce border border-neon-cyan/50">
                  <Download className="text-neon-cyan" size={32} />
                </div>
              )}
            </div>

            <div className="space-y-4">
              {!ready ? (
                <div className="w-full py-4 bg-gray-800 text-neon-cyan/50 font-pixel text-lg rounded-xl border border-gray-700 animate-pulse cursor-not-allowed uppercase">
                  Wait: {countdown}s
                </div>
              ) : (
                <button 
                  onClick={handleFinalDownload}
                  className="w-full py-4 bg-neon-cyan text-dark-bg font-pixel text-2xl rounded-xl shadow-[0_0_30px_rgba(5,217,232,0.6)] hover:bg-white transition-all transform hover:scale-105"
                >
                  DOWNLOAD NOW
                </button>
              )}
              
              <button 
                onClick={onClose}
                className="text-gray-600 hover:text-white font-pixel text-xs transition-colors uppercase tracking-widest py-2"
              >
                [ Cancel ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
