"use client";

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search...', className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center gap-3 bg-card-bg/60 border rounded-xl px-4 py-3 transition-all ${
        isFocused ? 'border-neon-cyan shadow-[0_0_20px_rgba(5,217,232,0.3)]' : 'border-gray-700'
      }`}>
        <Search size={20} className={isFocused ? 'text-neon-cyan' : 'text-gray-400'} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 font-body"
          aria-label="Search"
        />
        {query && (
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-neon-pink rounded"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
