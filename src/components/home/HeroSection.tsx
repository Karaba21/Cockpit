import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
                {/* Left Content */}
                <div className="flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 py-12 z-10 relative">
                    {/* Orange vertical bar - from middle of logo to end of button */}
                    <div className="absolute left-8 md:left-16 lg:left-24 w-1 bg-primary"
                        style={{ top: 'calc(50% - 100px)', bottom: 'calc(50% - 100px)' }}>
                    </div>

                    <div className="flex flex-col pl-6">
                        <div className="mb-2 relative w-full max-w-[350px] h-32 md:h-40 lg:h-48">
                            <Image
                                src="/logomain.png"
                                alt="Cockpit UY Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>

                        <p className="text-xl md:text-5xl text-gray-300 mb-10 font-bold italic">
                            Lideres en simracing
                        </p>

                        <Link
                            href="/catalogo"
                            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-hover text-negro font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(246,146,30,0.4)] hover:shadow-[0_0_30px_rgba(246,146,30,0.7)] uppercase tracking-wider overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                            <span className="relative z-10">Ver Catalogo</span>
                        </Link>
                    </div>

                    {/* Decorative element for "Soportes" if needed based on design, 
                        but keeping it clean for now matching the main request */}
                </div>

                {/* Right Image */}
                <div className="relative h-[400px] md:h-auto w-full">
                    <Image
                        src="/fotosim.png"
                        alt="Simracing Setup"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient overlay for better text readability if they overlap on mobile, 
                        or just for style blending */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent md:bg-gradient-to-r md:from-black md:via-transparent md:to-transparent opacity-50 md:opacity-100 pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
