'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';

import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;

    return (
        <div className="group bg-surface-light rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50">
            <Link href={`/producto/${product.handle}`} className="block relative aspect-square overflow-hidden bg-white/5">
                {/* Image Placeholder */}
                {product.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={product.images[0].url}
                        alt={product.images[0].altText}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}

                {isOnSale && (
                    <span className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">
                        OFERTA
                    </span>
                )}
            </Link>

            <div className="p-4">
                <h3 className="text-lg font-bold mb-2 line-clamp-2 h-14 group-hover:text-primary transition-colors">
                    <Link href={`/producto/${product.handle}`}>
                        {product.title}
                    </Link>
                </h3>

                <div className="flex items-end justify-between mb-4">
                    <div className="flex flex-col">
                        {isOnSale && (
                            <span className="text-sm text-gray-400 line-through">
                                ${product.compareAtPrice?.toLocaleString('es-UY')}
                            </span>
                        )}
                        <span className="text-xl font-bold text-primary">
                            ${product.price.toLocaleString('es-UY')}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-white/10 hover:bg-primary hover:text-surface text-foreground font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    aria-label="Agregar al carrito"
                >
                    <ShoppingCart size={18} />
                    <span>Agregar</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
