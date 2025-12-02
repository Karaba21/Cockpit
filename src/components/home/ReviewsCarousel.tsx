'use client';

import React from 'react';
import Image from 'next/image';

const reviewImages = [
    '/reseñas/WhatsApp Image 2025-12-02 at 16.25.47.jpeg',
    '/reseñas/WhatsApp Image 2025-12-02 at 16.25.49.jpeg',
    '/reseñas/WhatsApp Image 2025-12-02 at 16.25.52.jpeg',
    '/reseñas/WhatsApp Image 2025-12-02 at 16.25.56.jpeg',
    '/reseñas/WhatsApp Image 2025-12-02 at 16.25.58 (1).jpeg',
    '/reseñas/WhatsApp Image 2025-12-02 at 16.25.58.jpeg',
    '/reseñas/WhatsApp Image 2025-12-02 at 16.26.01.jpeg',
    '/reseñas/WhatsApp Image 2025-12-02 at 16.26.04.jpeg',
    '/reseñas/WhatsApp Image 2025-12-02 at 16.26.07 (1).jpeg',
    '/reseñas/WhatsApp Image 2025-12-02 at 16.26.07.jpeg',
    '/reseñas/WhatsApp Image 2025-12-02 at 16.26.08.jpeg',
];

const ReviewsCarousel = () => {
    // Duplicamos las imágenes para crear un loop infinito sin saltos
    // Al mover exactamente el 50%, cuando se reinicia la animación es imperceptible
    const duplicatedImages = [...reviewImages, ...reviewImages];

    return (
        <section id="reviews" className="py-16 container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold italic tracking-tighter mb-12 text-center uppercase">
                RESEÑAS
            </h2>

            <div className="relative overflow-hidden">
                <div className="flex gap-4 animate-scroll-infinite" style={{ width: 'fit-content' }}>
                    {duplicatedImages.map((src, index) => (
                        <div key={`review-${index}`} className="flex-shrink-0 w-[200px] md:w-[250px]">
                            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                                <Image
                                    src={src}
                                    alt={`Reseña cliente ${(index % reviewImages.length) + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="250px"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsCarousel;
