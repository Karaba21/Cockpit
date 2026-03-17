import React from 'react';

const StatsStrip = () => {
    return (
        <section className="py-6 bg-primary text-surface">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24 text-center">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                            +200
                        </h3>
                        <p className="font-bold uppercase tracking-wide text-sm md:text-base font-dm-sans">
                            Simuladores Vendidos
                        </p>
                    </div>
                    <div className="hidden md:block w-px h-16 bg-surface/20"></div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                            4 AÑOS
                        </h3>
                        <p className="font-bold uppercase tracking-wide text-sm md:text-base font-dm-sans">
                            En el rubro
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsStrip;
