'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import VariantSelector from './VariantSelector';
import AddToCartButton from './AddToCartButton';
import { Check, CreditCard, ShoppingCart, Gift, X } from 'lucide-react';

interface ProductFormProps {
    product: Product;
}

type ProductVariant = NonNullable<Product['variants']>[number];

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

    // Initialize defaults based on first variant or first options
    useEffect(() => {
        if (product.variants && product.variants.length > 0) {
            const initialVariant = product.variants[0];
            const initialOptions: Record<string, string> = {};

            initialVariant.selectedOptions.forEach(opt => {
                initialOptions[opt.name] = opt.value;
            });

            setSelectedOptions(initialOptions);
            setSelectedVariant(initialVariant);
        } else if (product.options && product.options.length > 0) {
            const initialOptions: Record<string, string> = {};
            product.options.forEach(opt => {
                initialOptions[opt.name] = opt.values[0];
            });
            setSelectedOptions(initialOptions);
        }
    }, [product]);

    // Update variant based on selection
    useEffect(() => {
        if (!product.variants) return;

        const variant = product.variants.find(v => {
            return v.selectedOptions.every(opt => selectedOptions[opt.name] === opt.value);
        });

        setSelectedVariant(variant || null);
    }, [selectedOptions, product.variants]);

    const handleOptionChange = (name: string, value: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Calculate display price
    const price = selectedVariant
        ? parseFloat(selectedVariant.price.amount)
        : product.price;

    const compareAtPrice = selectedVariant?.compareAtPrice
        ? parseFloat(selectedVariant.compareAtPrice.amount)
        : product.compareAtPrice;

    const isOnSale = compareAtPrice && compareAtPrice > price;

    // Create a product object that matches the selected variant for the cart
    const productForCart: Product = {
        ...product,
        variantId: selectedVariant?.id || product.variantId,
        price: price, // Update price to match variant
        title: selectedVariant ? `${product.title} - ${selectedVariant.title}` : product.title
    };


    const mainButtonRef = React.useRef<HTMLDivElement>(null);
    const [showStickyFooter, setShowStickyFooter] = useState(false);
    const [viewersCount, setViewersCount] = useState(4);
    const [deliveryDates, setDeliveryDates] = useState({ order: '', delivery: '' });

    useEffect(() => {
        const today = new Date();
        const formatDayMonth = (date: Date) => {
            const d = date.getDate();
            const m = new Intl.DateTimeFormat('es-UY', { month: 'short' }).format(date);
            return `${d} ${m.charAt(0).toUpperCase() + m.slice(1).replace('.', '')}`;
        };

        const addBusinessDays = (startDate: Date, days: number) => {
            const result = new Date(startDate);
            let added = 0;
            while (added < days) {
                result.setDate(result.getDate() + 1);
                if (result.getDay() !== 0 && result.getDay() !== 6) {
                    added++;
                }
            }
            return result;
        };

        setDeliveryDates({
            order: formatDayMonth(today),
            delivery: `${formatDayMonth(addBusinessDays(today, 1))} - ${formatDayMonth(addBusinessDays(today, 3))}`
        });
    }, []);

    useEffect(() => {
        // Prevent hydration mismatch by setting the initial random number
        // only on the client side after the first render.
        setViewersCount(Math.floor(Math.random() * (9 - 4 + 1)) + 4);

        const interval = setInterval(() => {
            setViewersCount(Math.floor(Math.random() * (9 - 4 + 1)) + 4);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show sticky footer only when the button is not intersecting AND it's above the viewport (scrolled past)
                const shouldShow = !entry.isIntersecting && entry.boundingClientRect.top < 0;
                setShowStickyFooter(shouldShow);

                if (shouldShow) {
                    document.body.classList.add('sticky-footer-visible');
                } else {
                    document.body.classList.remove('sticky-footer-visible');
                }
            },
            {
                threshold: 0,
                rootMargin: '0px 0px -100px 0px' // Add some offset to prevent flickering
            }
        );

        if (mainButtonRef.current) {
            observer.observe(mainButtonRef.current);
        }

        return () => {
            if (mainButtonRef.current) {
                observer.unobserve(mainButtonRef.current);
            }
            document.body.classList.remove('sticky-footer-visible');
        };
    }, []);

    return (
        <div>
            {/* Price Display */}
            <div className="flex flex-col items-start gap-2 mb-6">
                {isOnSale && (
                    <div className="bg-primary text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-dm-sans">
                        OFERTA
                    </div>
                )}
                <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-primary tracking-tight font-dm-sans">
                        ${price.toLocaleString('es-UY')}
                    </span>
                    {isOnSale && (
                        <span className="text-2xl text-foreground/40 line-through mb-1 font-dm-sans">
                            ${compareAtPrice?.toLocaleString('es-UY')}
                        </span>
                    )}
                </div>
            </div>

            {/* Installments Display */}
            <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-full border border-primary/40 flex items-center justify-center shrink-0 mt-1">
                    <CreditCard size={22} className="text-primary" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-widest text-foreground/60 uppercase mb-1 font-dm-sans">
                        Financiación
                    </span>
                    <span className="font-bold text-primary md:text-lg leading-tight uppercase font-dm-sans">
                        Hasta 12 cuotas sin recargo<br />
                        de ${(price / 12).toLocaleString('es-UY', { maximumFractionDigits: 0 })}
                    </span>
                </div>
            </div>

            {/* Description or other info can go here if moved from parent, 
                but keeping it minimal as requested */}

            {/* Variant Selector */}
            {product.options && product.options.length > 0 && (
                <VariantSelector
                    options={product.options}
                    selectedOptions={selectedOptions}
                    onOptionChange={handleOptionChange}
                />
            )}

            {/* Stock Indicator */}
            <div className={`flex items-center gap-2 mb-6 font-medium font-dm-sans ${selectedVariant?.availableForSale !== false ? 'text-green-500' : 'text-red-500'}`}>
                {selectedVariant?.availableForSale !== false ? <Check size={20} /> : <X size={20} />}
                <span>{selectedVariant?.availableForSale !== false ? 'Stock disponible' : 'Agotado'}</span>
            </div>

            {/* Viewer Count */}
            <div className="mb-4 bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-md flex items-center gap-3 w-full shadow-sm font-dm-sans">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-bold text-sm transition-all duration-300">{viewersCount}</span>
                </div>
                <span className="text-sm text-foreground/90 font-medium">personas están viendo este producto</span>
            </div>

            {/* Add to Cart */}
            <div ref={mainButtonRef} className={!selectedVariant ? 'opacity-50 pointer-events-none' : ''}>
                <AddToCartButton product={productForCart} availableForSale={selectedVariant?.availableForSale} />
            </div>

            {/* Shipping Timeline Banner */}
            <div className="mt-4 mb-6 relative z-10 w-full py-2">
                {deliveryDates.order ? (
                    <div className="flex items-start w-full relative max-w-sm mx-auto">
                        {/* Connecting Line */}
                        <div className="absolute top-6 left-[calc(25%+1.5rem)] right-[calc(25%+1.5rem)] h-[2px] bg-primary/30 z-0" />

                        {/* Lo pedis */}
                        <div className="flex-1 flex flex-col items-center relative z-10">
                            <div className="w-12 h-12 rounded-full relative flex items-center justify-center mb-3">
                                <div className="absolute inset-0 bg-black rounded-full" />
                                <div className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full" />
                                <ShoppingCart className="text-primary relative z-10" size={20} />
                            </div>
                            <span className="font-bold text-foreground text-[15px] font-dm-sans">{deliveryDates.order}</span>
                            <span className="text-sm text-foreground/80 mt-1 font-dm-sans">Lo pedís</span>
                        </div>

                        {/* Te llega */}
                        <div className="flex-1 flex flex-col items-center relative z-10">
                            <div className="w-12 h-12 rounded-full relative flex items-center justify-center mb-3">
                                <div className="absolute inset-0 bg-black rounded-full" />
                                <div className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full" />
                                <Gift className="text-primary relative z-10" size={20} />
                            </div>
                            <span className="font-bold text-foreground text-[15px] font-dm-sans">{deliveryDates.delivery}</span>
                            <span className="text-sm text-foreground/80 mt-1 font-dm-sans">Te llega 🤝</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[104px]">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-neutral-800 h-10 w-10"></div>
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-2 bg-neutral-800 rounded w-24"></div>
                                <div className="h-2 bg-neutral-800 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {!selectedVariant && (
                <p className="text-red-500 mt-2 text-sm">Combinación no disponible</p>
            )}

            {/* Guarantee Image */}
            <div className="mt-4 flex justify-center w-full">
                <img
                    src="/garantia-compra.png"
                    alt="Garantía de compra"
                    className="w-3/4 h-auto object-contain"
                />
            </div>

            {/* Sticky Footer */}
            <div className={`fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-white/10 p-4 transition-transform duration-300 transform ${showStickyFooter ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="container mx-auto max-w-6xl flex items-center justify-between gap-2 sm:gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-4 flex-1 min-w-0">
                        <div className="text-[11px] sm:text-sm font-medium text-white truncate max-w-full">
                            {product.title}
                        </div>
                        <div className="flex items-baseline gap-1 sm:gap-2">
                            <span className="text-lg sm:text-xl font-bold text-primary">
                                ${price.toLocaleString('es-UY')}
                            </span>
                            {isOnSale && (
                                <span className="text-xs sm:text-sm text-gray-400 line-through">
                                    ${compareAtPrice?.toLocaleString('es-UY')}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={`flex-shrink-0 ${!selectedVariant ? 'opacity-50 pointer-events-none' : ''}`}>
                        <AddToCartButton product={productForCart} compact={true} availableForSale={selectedVariant?.availableForSale} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
