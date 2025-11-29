'use client';

import React from 'react';
import { Star } from 'lucide-react';

const ReviewsCarousel = () => {
    // Mock reviews
    const reviews = [
        { id: 1, name: "Juan P.", text: "Excelente calidad y atención. El cockpit cambió totalmente mi experiencia.", rating: 5 },
        { id: 2, name: "Martin S.", text: "Muy recomendados. El envío fue rápido y todo llegó perfecto.", rating: 5 },
        { id: 3, name: "Diego M.", text: "Los mejores precios del mercado. Sin duda volveré a comprar.", rating: 5 },
    ];

    return (
        <section className="py-16 container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold italic tracking-tighter mb-12 text-center uppercase">
                RESEÑAS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-surface-light p-8 rounded-lg border border-border shadow-lg">
                        <div className="flex mb-4 text-primary">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={20} fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-gray-300 mb-6 italic">"{review.text}"</p>
                        <p className="font-bold text-white uppercase tracking-wide">- {review.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ReviewsCarousel;
