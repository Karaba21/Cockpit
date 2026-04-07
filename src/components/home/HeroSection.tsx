import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="relative w-full bg-black overflow-hidden">
            {/* Mobile Background Image */}
            <div className="md:hidden absolute inset-0 w-full h-full z-0">
                <img
                    src="/fotosim.png"
                    alt="Simracing Background"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] md:min-h-[600px] relative z-10">
                {/* Left Content */}
                <div className="flex flex-col justify-center items-center md:items-start px-4 md:px-16 lg:px-24 py-20 md:py-12 z-10 relative text-center md:text-left">
                    {/* Orange vertical bar - from middle of logo to end of button */}
                    <div className="hidden md:block absolute left-8 md:left-16 lg:left-24 w-1 bg-primary"
                        style={{ top: 'calc(50% - 100px)', bottom: 'calc(50% - 100px)' }}>
                    </div>

                    <div className="flex flex-col items-center md:items-start md:pl-6 w-full">
                        <div className="mb-2 relative w-[280px] md:w-full max-w-[350px] h-28 sm:h-32 md:h-40 lg:h-48">
                            <img
                                src="/logocockpitpng.png"
                                alt="Cockpit UY Logo"
                                className="w-full h-full object-contain object-center md:object-left"
                            />
                        </div>

                        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-300 mb-10 font-bold italic font-outfit uppercase mt-4 md:mt-0 leading-tight">
                            Lideres en simracing
                        </p>

                        <Link
                            href="/catalogo"
                            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-hover text-negro font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(246,146,30,0.4)] hover:shadow-[0_0_30px_rgba(246,146,30,0.7)] uppercase tracking-wider overflow-hidden w-full max-w-[280px] md:w-auto md:max-w-none"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                            <span className="relative z-10">Ver Catalogo</span>
                        </Link>
                    </div>

                    {/* Decorative element for "Soportes" if needed based on design, 
                        but keeping it clean for now matching the main request */}
                </div>

                {/* Right Image */}
                <div className="hidden md:block relative h-[400px] md:h-auto w-full overflow-hidden">
                    <img
                        src="/fotosim.png"
                        alt="Simracing Setup"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Gradient overlay for better text readability if they overlap on mobile, 
                        or just for style blending */}
                    <div className="absolute inset-0 md:bg-gradient-to-r md:from-black md:via-transparent md:to-transparent opacity-100 pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
