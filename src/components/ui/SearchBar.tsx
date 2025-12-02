'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-xs md:max-w-sm">
            <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"
                aria-label="Buscar"
            >
                <Search size={18} />
            </button>
        </form>
    );
};

export default SearchBar;
