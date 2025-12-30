import React from 'react';

const PaymentCarousel = () => {
    const images = [
        { src: '/carrusel/masterr.webp', alt: 'Mastercard' },
        { src: '/carrusel/VISA-Logo.png', alt: 'Visa' },
        { src: '/carrusel/mercadopagoo.png', alt: 'Mercado Pago' },
        { src: '/carrusel/abitab-removebg-preview.png', alt: 'Abitab' },
    ];

    // Let's make a set of items that is reasonably long.
    const longSet = [...images, ...images, ...images, ...images, ...images, ...images];

    return (
        <div className="w-full bg-primary overflow-hidden py-3 relative z-20">
            {/* Text Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-primary px-4 py-1 shadow-[0_0_15px_15px_rgba(246,146,30,1)]">
                <span className="text-negro font-bold text-sm md:text-base whitespace-nowrap uppercase tracking-wider">
                    Hasta 12 cuotas sin recargo
                </span>
            </div>

            {/* Container for the scrolling content */}
            <div className="flex w-max animate-scroll-infinite">
                {/* First set */}
                {longSet.map((img, index) => (
                    <div key={`set1-${index}`} className="flex items-center justify-center mx-6 md:mx-10 select-none opacity-80">
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="h-6 md:h-8 w-auto object-contain"
                        />
                    </div>
                ))}
                {/* Second set (duplicate for looping) */}
                {longSet.map((img, index) => (
                    <div key={`set2-${index}`} className="flex items-center justify-center mx-6 md:mx-10 select-none opacity-80">
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="h-6 md:h-8 w-auto object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentCarousel;
