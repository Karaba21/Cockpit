import React from 'react';

const PaymentCarousel = () => {
    const images = [
        { src: '/carrusel/masterr.webp', alt: 'Mastercard' },
        { src: '/carrusel/VISA-Logo.webp', alt: 'Visa' },
        { src: '/carrusel/mercadopagoo.webp', alt: 'Mercado Pago' },
        { src: '/carrusel/abitab-removebg-preview.webp', alt: 'Abitab' },
    ];

    // Let's make a set of items that is reasonably long.
    const longSet = [...images, ...images, ...images, ...images, ...images, ...images];

    return (
        <div className="w-full bg-primary overflow-hidden py-3 relative z-20">
            {/* Text Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-primary px-4 py-1 shadow-[0_0_15px_15px_rgba(246,146,30,1)]">
                <span className="block md:inline text-negro font-bold text-xs md:text-base text-center uppercase tracking-wider leading-tight font-dm-sans">
                    Hasta 12 cuotas <br className="md:hidden" /> sin intereses
                </span>
            </div>

            {/* Container for the scrolling content */}
            <div className="flex w-max animate-scroll-infinite">
                {/* First set */}
                {longSet.map((img, index) => (
                    <div key={`set1-${index}`} className="flex items-center justify-center mx-4 md:mx-10 select-none opacity-80">
                        <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            decoding="async"
                            className="h-8 md:h-9 w-auto object-contain"
                        />
                    </div>
                ))}
                {/* Second set (duplicate for looping) */}
                {longSet.map((img, index) => (
                    <div key={`set2-${index}`} className="flex items-center justify-center mx-4 md:mx-10 select-none opacity-80">
                        <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            decoding="async"
                            className="h-8 md:h-9 w-auto object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentCarousel;
