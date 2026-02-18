'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import VariantSelector from './VariantSelector';
import AddToCartButton from './AddToCartButton';
import { Check, CreditCard, CircleHelp } from 'lucide-react';

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
            <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">
                    ${price.toLocaleString('es-UY')}
                </span>
                {isOnSale && (
                    <span className="text-xl text-gray-400 line-through mb-1">
                        ${compareAtPrice?.toLocaleString('es-UY')}
                    </span>
                )}
            </div>

            {/* Installments Display */}
            <div className="flex items-center gap-2 text-foreground/80 mb-6">
                <CreditCard size={20} className="text-primary" />
                <span className="font-medium">
                    Hasta <span className="font-bold text-primary">12 cuotas</span> de <span className="font-bold text-primary">${(price / 12).toLocaleString('es-UY', { maximumFractionDigits: 2 })}</span>
                </span>
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
            <div className="flex items-center gap-2 text-green-500 mb-8 font-medium">
                <Check size={20} />
                <span>{selectedVariant?.availableForSale !== false ? 'Stock disponible' : 'Agotado'}</span>
            </div>

            {/* Add to Cart */}
            <div ref={mainButtonRef} className={!selectedVariant ? 'opacity-50 pointer-events-none' : ''}>
                <AddToCartButton product={productForCart} />
            </div>

            {/* Shipping Banner */}
            {/* Shipping Banner */}
            <div className="mt-4 mb-6 relative z-10 bg-neutral-900 border border-neutral-800 text-white p-3 rounded-md flex items-center gap-3 w-full shadow-sm">
                <CircleHelp className="text-white shrink-0" size={24} />
                <span className="text-sm">
                    <span className="font-bold">Envío rápido</span> de 1 a 3 días hábiles.
                </span>
            </div>
            {!selectedVariant && (
                <p className="text-red-500 mt-2 text-sm">Combinación no disponible</p>
            )}

            {/* Guarantee Image */}
            <div className="mt-6 flex justify-center w-full">
                <img
                    src="/garantia-compra.png"
                    alt="Garantía de compra"
                    className="w-3/4 h-auto object-contain"
                />
            </div>

            {/* Sticky Footer */}
            <div className={`fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-white/10 p-4 transition-transform duration-300 transform ${showStickyFooter ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <div className="hidden md:block text-sm font-medium text-gray-300 max-w-[200px] truncate">
                            {product.title}
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-primary">
                                ${price.toLocaleString('es-UY')}
                            </span>
                            {isOnSale && (
                                <span className="text-sm text-gray-400 line-through">
                                    ${compareAtPrice?.toLocaleString('es-UY')}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={`flex-shrink-0 ${!selectedVariant ? 'opacity-50 pointer-events-none' : ''}`}>
                        <AddToCartButton product={productForCart} compact={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
