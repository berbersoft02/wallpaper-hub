"use client";

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  itemId: string;
  itemType: 'wallpaper' | 'icon';
  className?: string;
}

export default function FavoriteButton({ itemId, itemType, className = '' }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{"wallpapers":[],"icons":[]}');
    const key = itemType === 'wallpaper' ? 'wallpapers' : 'icons';
    setIsFavorited(favorites[key]?.includes(itemId) || false);
  }, [itemId, itemType]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{"wallpapers":[],"icons":[]}');
    const key = itemType === 'wallpaper' ? 'wallpapers' : 'icons';

    if (!favorites[key]) {
      favorites[key] = [];
    }

    if (favorites[key].includes(itemId)) {
      favorites[key] = favorites[key].filter((id: string) => id !== itemId);
      setIsFavorited(false);
    } else {
      favorites[key].push(itemId);
      setIsFavorited(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', isFavorited ? 'remove_from_favorites' : 'add_to_favorites', {
        content_type: itemType,
        item_id: itemId,
      });
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-pink ${
        isFavorited
          ? 'bg-neon-pink/20 text-neon-pink'
          : 'bg-gray-800/50 text-gray-400 hover:text-neon-pink hover:bg-gray-800'
      } ${className}`}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorited}
    >
      <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
    </button>
  );
}
