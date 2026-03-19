'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { logEvent } from '@/lib/fpixel';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
    compact?: boolean;
    availableForSale?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className = '', compact = false, availableForSale }) => {
    const { addToCart, buyNow } = useCart();
    const [isLoading, setIsLoading] = React.useState(false);

    const isAvailable = availableForSale ?? (product.variants && product.variants.length > 0 
        ? product.variants.some(v => v.availableForSale)
        : true);

    const isSoporte = product.collections?.some(c => c === 'soportes' || c === 'soporte') ||
        product.tags?.some(tag => tag.toLowerCase().includes('soporte')) ||
        product.productType?.toLowerCase().includes('soporte');

    const handleBuyNow = async () => {
        if (!isAvailable) return;
        setIsLoading(true);
        logEvent('AddToCart', {
            content_ids: [product.id],
            content_name: product.title,
            content_type: 'product',
            value: product.price,
            currency: 'UYU'
        });
        const url = await buyNow(product);
        if (url) {
            window.location.href = url;
        } else {
            setIsLoading(false);
        }
    };

    if (isSoporte) {
        return (
            <button
                onClick={handleBuyNow}
                disabled={isLoading || !isAvailable}
                className={`group relative w-full ${compact ? '' : 'md:w-auto'} ${!isAvailable ? 'bg-neutral-600 text-neutral-400 opacity-70 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-primary-hover text-negro shadow-[0_4px_20px_rgba(246,146,30,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(246,146,30,0.6)] cursor-pointer'} font-bold ${compact ? 'py-3 px-6 text-sm' : 'py-4 px-12'} rounded-full transition-all duration-300 transform uppercase tracking-wider flex items-center justify-center gap-3 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
            >
                {!isAvailable ? null : <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>}
                <ShoppingCart size={compact ? 18 : 24} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">{!isAvailable ? 'Agotado' : (isLoading ? 'Procesando...' : 'Comprar')}</span>
            </button>
        );
    }

    const handleAddToCart = () => {
        if (!isAvailable) return;
        logEvent('AddToCart', {
            content_ids: [product.id],
            content_name: product.title,
            content_type: 'product',
            value: product.price,
            currency: 'UYU'
        });
        addToCart(product);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={`group relative w-full ${compact ? '' : 'md:w-auto'} ${!isAvailable ? 'bg-neutral-600 text-neutral-400 opacity-70 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-primary-hover text-negro shadow-[0_4px_20px_rgba(246,146,30,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(246,146,30,0.6)] cursor-pointer'} font-bold ${compact ? 'py-3 px-6 text-sm' : 'py-4 px-12'} rounded-full transition-all duration-300 transform uppercase tracking-wider flex items-center justify-center gap-3 overflow-hidden ${className}`}
        >
            {!isAvailable ? null : <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>}
            <ShoppingCart size={compact ? 18 : 24} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">{!isAvailable ? 'Agotado' : 'Agregar al carrito'}</span>
        </button>
    );
};

export default AddToCartButton;
