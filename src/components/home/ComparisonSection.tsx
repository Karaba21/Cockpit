import React from 'react';
import Image from 'next/image';
import { Check, X } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Estabilidad',
    escritorio: 'se mueve y se afloja',
    soporte: 'firme y estable'
  },
  {
    feature: 'Posición',
    escritorio: 'incómoda',
    soporte: 'natural'
  },
  {
    feature: 'Preparación',
    escritorio: 'armar todo',
    soporte: 'listo para jugar'
  },
  {
    feature: 'Experiencia',
    escritorio: 'menos real',
    soporte: 'inmersivo'
  },
  {
    feature: 'Control en pista',
    escritorio: 'menos precisión',
    soporte: 'mayor control'
  }
];

export default function ComparisonSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center text-primary mb-12 tracking-tight uppercase">
          Soporte Cockpit vs Escritorio
        </h2>

        <div className="bg-[#111] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl ring-1 ring-white/10 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50" />

          {/* Header Images Row */}
          <div className="grid grid-cols-[1fr_1.3fr_1.3fr] md:grid-cols-[1fr_1.5fr_1.5fr] border-b border-white/5 relative z-10">
            <div className="p-4 md:p-8 flex items-end">
              {/* Empty Space for feature column */}
            </div>

            <div className="p-4 md:p-8 flex flex-col items-center justify-end text-center border-r border-white/5">
              <div className="relative w-28 h-28 md:w-52 md:h-52 mb-6 rounded-2xl overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <Image
                  src="/comparison1.jpeg"
                  alt="Escritorio"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xs md:text-xl font-bold text-white/50 uppercase tracking-widest">Escritorio</h3>
            </div>

            <div className="p-4 md:p-8 flex flex-col items-center justify-end text-center bg-white/[0.02]">
              <div className="relative w-32 h-32 md:w-60 md:h-60 mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="/comparison2.jpeg"
                  alt="Soporte Cockpit"
                  fill
                  className="object-cover drop-shadow-2xl"
                />
              </div>
              <h3 className="text-xs md:text-xl font-black text-white uppercase tracking-widest">Soporte Cockpit</h3>
            </div>
          </div>

          {/* Features Rows */}
          <div className="flex flex-col relative z-10">
            {comparisonData.map((row, idx) => (
              <div key={idx} className={`grid grid-cols-[1fr_1.3fr_1.3fr] md:grid-cols-[1fr_1.5fr_1.5fr] group hover:bg-white/[0.02] transition-colors duration-300 ${idx !== comparisonData.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="p-3 md:p-8 flex flex-col justify-center border-r border-transparent">
                  <span className="font-medium text-white/70 text-xs md:text-xl font-dm-sans">{row.feature}</span>
                </div>

                <div className="p-3 md:p-8 flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 border-r border-white/5 text-center md:text-left">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 mb-1 md:mb-0">
                    <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" strokeWidth={3} />
                  </div>
                  <span className="text-white/50 text-[10px] md:text-base font-medium leading-tight font-dm-sans uppercase">
                    {row.escritorio}
                  </span>
                </div>

                <div className="p-3 md:p-8 flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 bg-white/[0.02] text-center md:text-left">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 mb-1 md:mb-0">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500" strokeWidth={3} />
                  </div>
                  <span className="text-white text-[10px] md:text-base font-semibold leading-tight font-dm-sans uppercase">
                    {row.soporte}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
