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
    } else if (countdown === 0) {
      setReady(true);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

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
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={ready ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-gray-900 border-2 border-neon-cyan rounded-2xl p-8 shadow-[0_0_50px_rgba(5,217,232,0.3)] overflow-hidden">
        {/* Adsterra Banner inside Modal (High Visibility) */}
        <div className="mb-8 min-h-[100px] flex flex-col items-center justify-center bg-black/40 rounded-xl border border-gray-800 p-2">
           <p className="text-[10px] font-pixel text-gray-500 mb-2 uppercase">Sponsored Content</p>
           {/* Replace this div id with your specific Adsterra Banner ID if different */}
           <div id="container-771ab3dea3f70f996da234efbf13d803"></div>
        </div>

        <div className="text-center">
          <h3 className="font-pixel text-2xl text-white mb-2">Preparing Download</h3>
          <p className="text-gray-400 font-body text-sm mb-6 truncate px-4">{fileName}</p>
          
          <div className="flex justify-center mb-8">
            {!ready ? (
              <div className="relative flex items-center justify-center w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-gray-800"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="226.2"
                    strokeDashoffset={226.2 - (226.2 * (5 - countdown)) / 5}
                    className="text-neon-pink transition-all duration-1000"
                  />
                </svg>
                <span className="absolute font-pixel text-3xl text-white">{countdown}</span>
              </div>
            ) : (
              <div className="w-20 h-20 bg-neon-cyan/20 rounded-full flex items-center justify-center animate-pulse">
                <Download className="text-neon-cyan" size={40} />
              </div>
            )}
          </div>

          <div className="space-y-4">
            {!ready ? (
              <button disabled className="w-full py-4 bg-gray-800 text-gray-500 font-pixel text-xl rounded-xl cursor-not-allowed border border-gray-700">
                PLEASE WAIT...
              </button>
            ) : (
              <button 
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="w-full py-4 bg-neon-cyan text-dark-bg font-pixel text-2xl rounded-xl hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(5,217,232,0.5)]"
              >
                DOWNLOAD NOW
              </button>
            )}
            
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-white font-pixel text-sm transition-colors"
            >
              CANCEL
            </button>
          </div>
        </div>

        {/* Info bar */}
        <div className="mt-8 flex items-start gap-3 p-3 bg-neon-pink/5 border border-neon-pink/20 rounded-lg text-left text-[10px] text-gray-400 font-body">
          <AlertCircle className="text-neon-pink shrink-0" size={14} />
          <p>This automated verification ensures our high-quality 4K archives remain free for the community. Thank you for your support!</p>
        </div>
      </div>
    </div>
  );
}
