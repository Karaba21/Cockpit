'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface AddToCartButtonProps {
    product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const { addToCart, buyNow } = useCart();
    const [isLoading, setIsLoading] = React.useState(false);

    const isSoporte = product.collections?.some(c => c === 'soportes' || c === 'soporte') ||
        product.tags?.some(tag => tag.toLowerCase().includes('soporte')) ||
        product.productType?.toLowerCase().includes('soporte');

    const handleBuyNow = async () => {
        setIsLoading(true);
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
                disabled={isLoading}
                className="group relative w-full md:w-auto bg-gradient-to-r from-primary to-primary-hover text-negro font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(246,146,30,0.6)] shadow-[0_4px_20px_rgba(246,146,30,0.3)] uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                <ShoppingCart size={24} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">{isLoading ? 'Procesando...' : 'Comprar'}</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => addToCart(product)}
            className="group relative w-full md:w-auto bg-gradient-to-r from-primary to-primary-hover text-negro font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(246,146,30,0.6)] shadow-[0_4px_20px_rgba(246,146,30,0.3)] uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            <ShoppingCart size={24} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Agregar al carrito</span>
        </button>
    );
};

export default AddToCartButton;
