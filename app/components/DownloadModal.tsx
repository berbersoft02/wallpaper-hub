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
      // Auto trigger the confirm (download) after 1 second of "Ready" state
      const autoTimer = setTimeout(() => {
        onConfirm();
        onClose();
      }, 1000);
      return () => clearTimeout(autoTimer);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown, ready, onConfirm, onClose]);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setReady(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-gray-900 border-2 border-neon-cyan rounded-2xl p-8 shadow-[0_0_60px_rgba(5,217,232,0.4)] overflow-hidden">
        {/* Adsterra Banner inside Modal (High Visibility) */}
        <div className="mb-8 min-h-[150px] flex flex-col items-center justify-center bg-black/40 rounded-xl border border-gray-800 p-2">
           <div id="container-771ab3dea3f70f996da234efbf13d803" className="w-full"></div>
        </div>

        <div className="text-center">
          <h3 className="font-pixel text-2xl text-white mb-2 uppercase tracking-widest">
            {ready ? "Starting Download..." : "Generating Link..."}
          </h3>
          <p className="text-gray-500 font-body text-xs mb-6 truncate px-4 italic">{fileName}</p>
          
          <div className="flex justify-center mb-8">
            {!ready ? (
              <div className="relative flex items-center justify-center w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-gray-800"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray="263.9"
                    strokeDashoffset={263.9 - (263.9 * (5 - countdown)) / 5}
                    className="text-neon-pink transition-all duration-1000"
                  />
                </svg>
                <span className="absolute font-pixel text-4xl text-white">{countdown}s</span>
              </div>
            ) : (
              <div className="w-24 h-24 bg-neon-cyan/20 rounded-full flex items-center justify-center animate-bounce">
                <Download className="text-neon-cyan" size={48} />
              </div>
            )}
          </div>

          <div className="space-y-4">
            {!ready ? (
              <div className="w-full py-4 bg-gray-800 text-neon-cyan/50 font-pixel text-xl rounded-xl border border-gray-700 animate-pulse">
                WAITING FOR SERVER...
              </div>
            ) : (
              <div className="w-full py-4 bg-neon-cyan text-dark-bg font-pixel text-2xl rounded-xl shadow-[0_0_20px_rgba(5,217,232,0.5)]">
                GETTING FILE...
              </div>
            )}
            
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-white font-pixel text-sm transition-colors uppercase tracking-widest"
            >
              [ Cancel ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
