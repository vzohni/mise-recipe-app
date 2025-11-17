'use client';

import { useEffect, useState } from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchQuery);

  // Debounce: only update parent after 300ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className="relative max-w-2xl flex-1">
      <input
        type="text"
        placeholder="Search recipes..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E4442]"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        🔍
      </button>
    </div>
  );
}