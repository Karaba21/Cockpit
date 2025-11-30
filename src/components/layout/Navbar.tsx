'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, Facebook, Instagram } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();

    return (
        <header className="glass-effect border-b border-border sticky top-0 z-50 backdrop-blur-md">
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
                    <div className="h-10 w-32 bg-white/10 flex items-center justify-center text-foreground font-bold italic tracking-tighter">
                        {/* Placeholder for Logo */}
                        COCKPIT UY
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-foreground hover:text-primary transition-all duration-300 font-medium uppercase text-sm tracking-wide hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                        Home
                    </Link>
                    <Link href="/catalogo" className="text-foreground hover:text-primary transition-all duration-300 font-medium uppercase text-sm tracking-wide hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                        Catalogo
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="hidden md:flex items-center space-x-4 border-r border-border pr-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-arena hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                            <Facebook size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-arena hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                            <Instagram size={20} />
                        </a>
                    </div>

                    <Link href="/account/login" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                        <User size={24} />
                    </Link>

                    <Link href="/cart" className="relative text-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-negro text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-[0_0_12px_rgba(246,146,30,0.8)] animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass-effect border-t border-border absolute w-full left-0 top-20 p-4 flex flex-col space-y-4 shadow-xl backdrop-blur-md">
                    <Link
                        href="/"
                        className="text-foreground hover:text-primary transition-all duration-300 font-medium uppercase py-2 border-b border-border hover:pl-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/catalogo"
                        className="text-foreground hover:text-primary transition-all duration-300 font-medium uppercase py-2 border-b border-border hover:pl-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Catalogo
                    </Link>
                    <div className="flex items-center space-x-6 pt-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-arena hover:text-primary transition-all duration-300 hover:scale-110">
                            <Facebook size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-arena hover:text-primary transition-all duration-300 hover:scale-110">
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
