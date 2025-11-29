import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-surface-light">
                {/* Replace with actual image */}
                <div className="w-full h-full bg-gradient-to-b from-transparent to-surface opacity-90 z-10 absolute" />
                <div
                    className="w-full h-full bg-cover bg-center opacity-50"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547754980-3df97fed72a8?auto=format&fit=crop&q=80)' }} // Simracing/Gaming placeholder
                ></div>
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold italic tracking-tighter mb-4 text-white drop-shadow-lg">
                    COCKPIT UY
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light tracking-wide uppercase">
                    Lideres en simracing
                </p>
                <Link
                    href="/catalogo"
                    className="inline-block bg-primary hover:bg-primary-hover text-surface font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg uppercase tracking-wider"
                >
                    Ver Catalogo
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
