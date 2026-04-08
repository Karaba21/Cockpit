'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, Facebook, Instagram, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';

import SearchBar from '@/components/ui/SearchBar';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState(false);
    const [isMobileSoportesOpen, setIsMobileSoportesOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();

    // Close all submenus when the main mobile menu closes (with a slight delay for the transition)
    useEffect(() => {
        if (!isMenuOpen) {
            const timer = setTimeout(() => {
                setIsMobileCatalogOpen(false);
                setIsMobileSoportesOpen(false);
            }, 300); // 300ms matches the transition duration
            return () => clearTimeout(timer);
        }
    }, [isMenuOpen]);

    return (
        <header className="bg-black z-40 relative">
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
                <Link href="/" prefetch={false} className="flex-shrink-0">
                    <img
                        src="/logocockpit.webp"
                        alt="Cockpit UY"
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/" prefetch={false} className="text-foreground hover:text-primary transition-all duration-300 font-bold uppercase text-sm tracking-wide hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                        Home
                    </Link>

                    <div className="relative group py-2">
                        <Link href="/catalogo" prefetch={false} className="flex items-center gap-1 text-foreground hover:text-primary transition-all duration-300 font-bold uppercase text-sm tracking-wide hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                            Catalogo
                            <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
                        </Link>
                        {/* Desktop Dropdown Menu */}
                        <div className="absolute left-0 top-full -mt-2 w-56 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-black/95 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                            <div className="py-2 flex flex-col">
                                <Link href="/catalogo" prefetch={false} className="px-5 py-2.5 text-sm font-bold text-foreground hover:bg-primary/20 hover:text-primary transition-colors uppercase tracking-wide">Todos los productos</Link>
                                <div className="h-px w-full bg-white/10 my-1"></div>
                                <Link href="/catalogo?category=soportes" prefetch={false} className="px-5 py-2 text-sm font-bold text-foreground hover:bg-primary/20 hover:text-primary transition-colors uppercase tracking-wide">Soportes</Link>
                                <Link href="/catalogo?category=plegables" prefetch={false} className="px-5 py-2 text-xs text-gray-400 hover:text-primary transition-colors uppercase tracking-wide pl-8">• Plegables</Link>
                                <Link href="/catalogo?category=soportes-rigidos" prefetch={false} className="px-5 py-2 text-xs text-gray-400 hover:text-primary transition-colors uppercase tracking-wide pl-8">• Rígidos</Link>
                                <Link href="/catalogo?category=volantes-1" prefetch={false} className="px-5 py-2 text-sm font-bold text-foreground hover:bg-primary/20 hover:text-primary transition-colors uppercase tracking-wide">Volantes</Link>
                                <Link href="/catalogo?category=accesorios" prefetch={false} className="px-5 py-2 text-sm font-bold text-foreground hover:bg-primary/20 hover:text-primary transition-colors uppercase tracking-wide">Accesorios</Link>
                            </div>
                        </div>
                    </div>

                    <Link href="/#reviews" prefetch={false} className="text-foreground hover:text-primary transition-all duration-300 font-bold uppercase text-sm tracking-wide hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
                        Reseñas
                    </Link>
                    <Link href="/#pickup" prefetch={false} className="text-foreground hover:text-primary transition-all duration-300 font-bold uppercase text-sm tracking-wide hover:drop-shadow-[0_0_8px_rgba(246,146,30,0.6)]">
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
                        prefetch={false}
                        className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold uppercase py-3 px-4 rounded-lg hover:bg-white/5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide">Home</span>
                    </Link>

                    <div className="flex flex-col">
                        <button
                            className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/5 group cursor-pointer transition-all duration-300 w-full text-left"
                            onClick={() => setIsMobileCatalogOpen(!isMobileCatalogOpen)}
                            aria-expanded={isMobileCatalogOpen}
                        >
                            <span className="text-foreground group-hover:text-primary transition-all duration-300 font-bold uppercase transform group-hover:translate-x-2 tracking-wide block">
                                Catalogo
                            </span>
                            <span className="text-foreground group-hover:text-primary p-1 transition-transform duration-300">
                                <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileCatalogOpen ? 'rotate-180' : ''}`} />
                            </span>
                        </button>

                        {/* Mobile Submenu */}
                        <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isMobileCatalogOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <Link href="/catalogo" prefetch={false} className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold uppercase py-3 pl-8 pr-4 rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                                <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide text-sm opacity-90">Todos los productos</span>
                            </Link>

                            <div className="flex flex-col">
                                <button
                                    className="flex items-center justify-between py-3 pl-8 pr-4 rounded-lg hover:bg-white/5 group cursor-pointer transition-all duration-300 w-full text-left"
                                    onClick={() => setIsMobileSoportesOpen(!isMobileSoportesOpen)}
                                    aria-expanded={isMobileSoportesOpen}
                                >
                                    <span className="text-foreground group-hover:text-primary transition-all duration-300 font-bold uppercase transform group-hover:translate-x-2 tracking-wide block text-sm opacity-90">
                                        Soportes
                                    </span>
                                    <span className="text-foreground group-hover:text-primary p-1 transition-transform duration-300">
                                        <ChevronDown size={18} className={`transition-transform duration-300 ${isMobileSoportesOpen ? 'rotate-180' : ''}`} />
                                    </span>
                                </button>

                                <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isMobileSoportesOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <Link href="/catalogo?category=plegables" prefetch={false} className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold uppercase py-2 pl-12 pr-4 rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                                        <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide text-xs text-gray-400">Plegables</span>
                                    </Link>
                                    <Link href="/catalogo?category=soportes-rigidos" prefetch={false} className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold uppercase py-2 pl-12 pr-4 rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                                        <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide text-xs text-gray-400">Rígidos</span>
                                    </Link>
                                </div>
                            </div>

                            <Link href="/catalogo?category=volantes-1" prefetch={false} className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold uppercase py-3 pl-8 pr-4 rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                                <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide text-sm opacity-90">Volantes</span>
                            </Link>
                            <Link href="/catalogo?category=accesorios" prefetch={false} className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold uppercase py-3 pl-8 pr-4 rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                                <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide text-sm opacity-90">Accesorios</span>
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/#reviews"
                        prefetch={false}
                        className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold uppercase py-3 px-4 rounded-lg hover:bg-white/5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="transform transition-transform duration-300 group-hover:translate-x-2 tracking-wide">Reseñas</span>
                    </Link>
                    <Link
                        href="/#pickup"
                        prefetch={false}
                        className="group flex items-center text-foreground hover:text-primary transition-all duration-300 font-bold uppercase py-3 px-4 rounded-lg hover:bg-white/5"
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
