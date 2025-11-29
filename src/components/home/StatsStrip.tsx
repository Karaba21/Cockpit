import React from 'react';

const StatsStrip = () => {
    return (
        <section className="py-12 bg-primary text-surface">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24 text-center">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">
                            +200
                        </h3>
                        <p className="font-bold uppercase tracking-wide text-sm md:text-base">
                            Simuladores Vendidos
                        </p>
                    </div>
                    <div className="hidden md:block w-px h-16 bg-surface/20"></div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">
                            4 AÑOS
                        </h3>
                        <p className="font-bold uppercase tracking-wide text-sm md:text-base">
                            En el rubro
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsStrip;
