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
        <div className="group relative bg-surface-light rounded-lg overflow-hidden shadow-lg hover:shadow-[0_8px_30px_rgba(246,146,30,0.3)] transition-all duration-500 border border-asfalto hover:border-primary/70 before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-br before:from-asfalto before:via-primary/30 before:to-asfalto before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:-z-10">
            <Link href={`/producto/${product.handle}`} className="block relative aspect-square overflow-hidden bg-white/5">
                {/* Image Placeholder */}
                {product.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={product.images[0].url}
                        alt={product.images[0].altText}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-arena">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-negro/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {isOnSale && (
                    <span className="absolute top-2 right-2 bg-gradient-to-r from-primary to-primary-hover text-negro text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_12px_rgba(246,146,30,0.6)]">
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
                    className="group/btn relative w-full bg-gradient-to-r from-asfalto to-asfalto/80 hover:from-primary hover:to-primary-hover text-foreground hover:text-negro font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer overflow-hidden shadow-md hover:shadow-[0_0_20px_rgba(246,146,30,0.4)] hover:scale-[1.02]"
                    aria-label="Agregar al carrito"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
                    <ShoppingCart size={18} className="relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10">Agregar</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
