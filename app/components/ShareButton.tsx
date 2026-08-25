"use client";

import { useState } from 'react';
import { Share2, Twitter, Facebook, MessageCircle, Check } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  url: string;
  description?: string;
  className?: string;
}

export default function ShareButton({ title, url, description, className = '' }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://saidahriken.site${url}`;

  const handleShare = async (platform: string) => {
    const text = description || title;

    switch(platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}&via=SaidAhrikenchi2`,
          '_blank',
          'width=550,height=420'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=550,height=420'
        );
        break;
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(title + ' - ' + shareUrl)}`,
          '_blank'
        );
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: platform,
        content_type: 'wallpaper',
        item_id: url,
      });
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/50 rounded-lg font-pixel text-sm text-neon-cyan transition-all hover:shadow-[0_0_20px_rgba(5,217,232,0.4)] focus:outline-none focus:ring-2 focus:ring-neon-cyan"
        aria-label="Share"
        aria-expanded={showMenu}
      >
        <Share2 size={16} />
        SHARE
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-48 bg-card-bg border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
            <button
              onClick={() => handleShare('twitter')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left text-white"
              aria-label="Share on Twitter"
            >
              <Twitter size={18} className="text-[#1DA1F2]" />
              <span className="font-body text-sm">Twitter</span>
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left text-white"
              aria-label="Share on Facebook"
            >
              <Facebook size={18} className="text-[#4267B2]" />
              <span className="font-body text-sm">Facebook</span>
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left text-white"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle size={18} className="text-[#25D366]" />
              <span className="font-body text-sm">WhatsApp</span>
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left text-white border-t border-gray-700"
              aria-label="Copy link"
            >
              {copied ? (
                <>
                  <Check size={18} className="text-green-500" />
                  <span className="font-body text-sm text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={18} className="text-neon-pink" />
                  <span className="font-body text-sm">Copy Link</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
