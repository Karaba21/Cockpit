import React from 'react';
import Link from 'next/link';

const FeaturedSection = () => {
    return (
        <section className="py-16 bg-surface-light border-y border-border">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image */}
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 shadow-2xl border border-border">
                            {/* Placeholder for Featured Image */}
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                Featured Product Image
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-bold italic tracking-tighter mb-6 uppercase">
                            Iniciate con el mejor volante del mercado
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Descubre la experiencia definitiva de simracing con nuestra selección de volantes de alta gama.
                            Precisión, realismo y durabilidad para llevar tu conducción al siguiente nivel.
                        </p>
                        <Link
                            href="/catalogo"
                            className="inline-block bg-primary hover:bg-primary-hover text-surface font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg uppercase tracking-wider"
                        >
                            Más información
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
