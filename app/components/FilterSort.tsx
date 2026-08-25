"use client";

import { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterSortProps {
  onSortChange: (sort: string) => void;
  onFilterChange: (filters: string[]) => void;
  currentSort: string;
  currentFilters: string[];
  availableCategories: string[];
}

export default function FilterSort({
  onSortChange,
  onFilterChange,
  currentSort,
  currentFilters,
  availableCategories
}: FilterSortProps) {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
  ];

  const toggleFilter = (category: string) => {
    if (currentFilters.includes(category)) {
      onFilterChange(currentFilters.filter(f => f !== category));
    } else {
      onFilterChange([...currentFilters, category]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="relative">
        <label htmlFor="sort-select" className="sr-only">Sort by</label>
        <select
          id="sort-select"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-card-bg/60 border border-gray-700 rounded-lg px-4 py-2 text-white font-body focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan appearance-none pr-10"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
      </div>

      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 bg-neon-purple/10 hover:bg-neon-purple/20 border border-neon-purple/50 rounded-lg font-pixel text-sm text-neon-purple transition-all hover:shadow-[0_0_20px_rgba(211,0,197,0.4)] focus:outline-none focus:ring-2 focus:ring-neon-purple"
        aria-expanded={showFilters}
        aria-label="Toggle filters"
      >
        <SlidersHorizontal size={16} />
        FILTERS {currentFilters.length > 0 && `(${currentFilters.length})`}
      </button>

      {showFilters && (
        <div className="absolute mt-12 bg-card-bg border border-gray-700 rounded-lg shadow-xl z-50 p-4 min-w-[200px]">
          <h3 className="font-pixel text-sm text-neon-cyan mb-3">Categories</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {availableCategories.map(category => (
              <label
                key={category}
                className="flex items-center gap-2 text-sm text-white hover:text-neon-cyan cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={currentFilters.includes(category)}
                  onChange={() => toggleFilter(category)}
                  className="w-4 h-4 rounded border-gray-600 text-neon-cyan focus:ring-neon-cyan focus:ring-offset-gray-900"
                />
                <span className="font-body">{category}</span>
              </label>
            ))}
          </div>
          {currentFilters.length > 0 && (
            <button
              onClick={() => onFilterChange([])}
              className="mt-4 w-full text-center text-xs text-neon-pink hover:text-white font-pixel"
            >
              CLEAR ALL
            </button>
          )}
        </div>
      )}
    </div>
  );
}
