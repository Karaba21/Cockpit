'use client';

import React, { useRef } from 'react';
import { Product } from '@/types';
import RelatedProductCard from './RelatedProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RelatedProductsCarouselProps {
    products: Product[];
}

const RelatedProductsCarousel: React.FC<RelatedProductsCarouselProps> = ({ products }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = React.useState(false);

    // Create an infinite-like buffer by duplicating products
    // We utilize 4 sets: [Buffer Start] [Main A] [Main B] [Buffer End]
    const displayProducts = React.useMemo(() => {
        if (!products || products.length === 0) return [];
        return [...products, ...products, ...products, ...products];
    }, [products]);

    if (!products || products.length < 2) {
        return null;
    }

    // Initial positioning to the middle (start of 2nd set)
    // We use a separate effect that attempts to set the position once layout is stable
    React.useEffect(() => {
        const setInitialPosition = () => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                if (container.scrollWidth > container.clientWidth) {
                    const oneSetWidth = container.scrollWidth / 4;
                    // Only set if we are at 0 (to avoid resetting on re-renders if not needed)
                    if (container.scrollLeft === 0) {
                        container.scrollLeft = oneSetWidth;
                    }
                }
            }
        };

        // Attempt immediately and after a short delay to ensure layout
        setInitialPosition();
        const timeoutId = setTimeout(setInitialPosition, 100);
        return () => clearTimeout(timeoutId);
    }, [displayProducts]);

    // Continuous Auto Scroll
    React.useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            if (scrollContainerRef.current && !isPaused) {
                const container = scrollContainerRef.current;

                // Guard: If content is not wide enough to scroll, do nothing
                if (container.scrollWidth > container.clientWidth) {
                    // Move 0.5 pixel every frame for a very slow, smooth glide
                    container.scrollLeft += 0.5;

                    const totalWidth = container.scrollWidth;
                    const oneSetWidth = totalWidth / 4;

                    // Teleport logic for infinite loop
                    // If we've scrolled past the 3rd set (near end), jump back to 2nd set
                    if (container.scrollLeft >= oneSetWidth * 3) {
                        container.scrollLeft = container.scrollLeft - oneSetWidth;
                    }
                    // If we're at the very start (1st set), jump forward to 2nd set
                    else if (container.scrollLeft <= 5) {
                        container.scrollLeft = container.scrollLeft + oneSetWidth;
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, displayProducts]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.75;

            if (direction === 'left') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section
            className="py-12 border-t border-border/50"
            aria-labelledby="related-products-heading"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 id="related-products-heading" className="text-2xl text-primary font-bold italic tracking-tighter uppercase mx-auto">
                        También te podría interesar
                    </h2>


                </div>

                <div
                    ref={scrollContainerRef}
                    // Removed snap classes for smooth continuous flow
                    className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {displayProducts.map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            // Removed snap-start
                            className="shrink-0 w-[45%] sm:w-[33%] md:w-[25%] lg:w-[20%]"
                        >
                            <RelatedProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedProductsCarousel;
