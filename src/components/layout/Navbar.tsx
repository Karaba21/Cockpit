'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart, User, Facebook, Instagram } from 'lucide-react';
import { useCart } from '@/context/CartContext';

import SearchBar from '@/components/ui/SearchBar';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <header className="bg-black sticky top-0 z-50">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/logocockpit.png"
                        alt="Cockpit UY"
                        width={120}
                        height={40}
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-foreground hover:text-primary transition-all duration-300 font-bold italic uppercase text-sm tracking-wide hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                        Home
                    </Link>
                    <Link href="/catalogo" className="text-foreground hover:text-primary transition-all duration-300 font-bold italic uppercase text-sm tracking-wide hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                        Catalogo
                    </Link>
                    <Link href="/#reviews" className="text-foreground hover:text-primary transition-all duration-300 font-bold italic uppercase text-sm tracking-wide hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                        Reseñas
                    </Link>
                    <Link href="/#pickup" className="text-foreground hover:text-primary transition-all duration-300 font-bold italic uppercase text-sm tracking-wide hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                        Pickup
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="hidden md:block w-64">
                        <SearchBar />
                    </div>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative text-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]"
                    >
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-negro text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-[0_0_12px_rgba(246,146,30,0.8)] animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute w-full left-0 top-20 bg-black shadow-[0_30px_60px_rgba(0,0,0,0.9)] border-b border-white/5 transition-all duration-300 ease-in-out origin-top z-40 rounded-b-3xl ${isMenuOpen ? 'opacity-100 scale-y-100 py-6 visible' : 'opacity-0 scale-y-0 py-0 invisible'
                    }`}
            >
                <div className="flex flex-col px-6 space-y-1">
                    <Link
                        href="/"
                        className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold italic uppercase py-3 px-4 rounded-lg hover:bg-white/5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide">Home</span>
                    </Link>
                    <Link
                        href="/catalogo"
                        className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold italic uppercase py-3 px-4 rounded-lg hover:bg-white/5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide">Catalogo</span>
                    </Link>
                    <Link
                        href="/#reviews"
                        className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold italic uppercase py-3 px-4 rounded-lg hover:bg-white/5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide">Reseñas</span>
                    </Link>
                    <Link
                        href="/#pickup"
                        className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold italic uppercase py-3 px-4 rounded-lg hover:bg-white/5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide">Pickup</span>
                    </Link>

                    <div className="flex items-center space-x-6 px-4 pt-5 pb-2">
                        <a href="https://facebook.com/cockpituy" target="_blank" rel="noopener noreferrer" className="text-arena hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                            <Facebook size={22} />
                        </a>
                        <a href="https://www.instagram.com/cockpit.uy" target="_blank" rel="noopener noreferrer" className="text-arena hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                            <Instagram size={22} />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
