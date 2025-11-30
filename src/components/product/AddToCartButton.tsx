'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface AddToCartButtonProps {
    product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const { addToCart } = useCart();

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
