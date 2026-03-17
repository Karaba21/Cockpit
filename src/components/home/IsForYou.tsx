import React from 'react';

const stats = [
  { p: 97, text: <>Una <strong className="text-white font-semibold">estructura sólida</strong> que no se mueve al frenar o girar fuerte.</> },
  { p: 85, text: <>Sentir cada curva con mucha más <strong className="text-white font-semibold">precisión y control</strong>.</> },
  { p: 85, text: <>Aprovechar al máximo la <strong className="text-white font-semibold">fuerza del volante y los pedales</strong>.</> },
  { p: 93, text: <>Una experiencia de conducción mucho <strong className="text-white font-semibold">más inmersiva</strong>.</> },
  { p: 75, text: <><strong className="text-white font-semibold">Más estabilidad</strong> que jugar con el volante en el escritorio.</> }
];

export default function IsForYou() {
  return (
    <section className="py-12 md:py-16 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-center text-primary mb-10 tracking-tight uppercase">
          ESTE SOPORTE ES PARA VOS SI QUERÉS...
        </h2>

        <div className="flex flex-col border-t border-white/10">
          {stats.map((stat, idx) => {
            const circumference = 2 * Math.PI * 40;
            const strokeDashoffset = circumference - (circumference * stat.p) / 100;

            return (
              <div key={idx} className="flex items-center gap-5 md:gap-8 py-6 border-b border-white/10">
                {/* Progress Circle */}
                <div className="relative flex-shrink-0 w-[64px] h-[64px] md:w-[76px] md:h-[76px]">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-asfalto/40"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="text-primary transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg md:text-xl font-black text-white font-dm-sans">{stat.p}%</span>
                  </div>
                </div>

                {/* Text */}
                <p className="text-base md:text-xl text-arena leading-snug font-dm-sans">
                  {stat.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
