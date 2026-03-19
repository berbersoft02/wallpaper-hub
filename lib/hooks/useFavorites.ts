"use client";

import { useState, useEffect } from 'react';

export function useFavorites<T extends { id: string | number }>(key: string) {
  const [favorites, setFavorites] = useState<T[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, [key]);

  const toggleFavorite = (item: T) => {
    setFavorites((prev) => {
      const isFavorited = prev.some((f) => f.id === item.id);
      let next;
      if (isFavorited) {
        next = prev.filter((f) => f.id !== item.id);
      } else {
        next = [...prev, item];
      }
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (id: string | number) => favorites.some((f) => f.id === id);

  return { favorites, toggleFavorite, isFavorite };
}
