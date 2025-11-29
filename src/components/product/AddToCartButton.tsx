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
            className="w-full md:w-auto bg-primary hover:bg-primary-hover text-surface font-bold py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-lg uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer"
        >
            <ShoppingCart size={24} />
            <span>Agregar al carrito</span>
        </button>
    );
};

export default AddToCartButton;
