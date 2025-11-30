import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-surface-light">
                {/* Replace with actual image */}
                <div className="w-full h-full bg-gradient-to-b from-asfalto/30 via-negro/80 to-negro z-10 absolute" />
                <div
                    className="w-full h-full bg-cover bg-center opacity-40"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547754980-3df97fed72a8?auto=format&fit=crop&q=80)' }} // Simracing/Gaming placeholder
                ></div>
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold italic tracking-tighter mb-4 text-white drop-shadow-[0_0_30px_rgba(246,146,30,0.3)]">
                    COCKPIT UY
                </h1>
                <p className="text-xl md:text-2xl text-arena mb-8 font-light tracking-wide uppercase drop-shadow-lg">
                    Lideres en simracing
                </p>
                <Link
                    href="/catalogo"
                    className="group relative inline-block bg-gradient-to-r from-primary to-primary-hover text-negro font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(246,146,30,0.4)] hover:shadow-[0_0_30px_rgba(246,146,30,0.7)] uppercase tracking-wider overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    <span className="relative z-10">Ver Catalogo</span>
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
