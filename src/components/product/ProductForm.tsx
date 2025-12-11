'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import VariantSelector from './VariantSelector';
import AddToCartButton from './AddToCartButton';
import { Check } from 'lucide-react';

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
            <div className={!selectedVariant ? 'opacity-50 pointer-events-none' : ''}>
                <AddToCartButton product={productForCart} />
            </div>
            {!selectedVariant && (
                <p className="text-red-500 mt-2 text-sm">Combinación no disponible</p>
            )}
        </div>
    );
};

export default ProductForm;
