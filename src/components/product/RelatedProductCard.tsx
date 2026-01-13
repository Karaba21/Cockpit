'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';

interface RelatedProductCardProps {
    product: Product;
}

const RelatedProductCard: React.FC<RelatedProductCardProps> = ({ product }) => {
    const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;

    return (
        <div className="group relative bg-surface-light rounded-lg overflow-hidden border border-border transition-all hover:border-primary/50 h-full flex flex-col">
            <Link href={`/producto/${product.handle}`} className="block relative aspect-square overflow-hidden bg-white/5 shrink-0" tabIndex={-1}>
                {product.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={product.images[0].url}
                        alt={product.images[0].altText}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-arena text-sm">
                        No Image
                    </div>
                )}

                {isOnSale && (
                    <span className="absolute top-2 right-2 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        OFERTA
                    </span>
                )}
            </Link>

            <div className="p-3 flex flex-col flex-1">
                <h3 className="text-sm font-semibold mb-1 line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
                    <Link href={`/producto/${product.handle}`} className="focus:outline-none focus:underline">
                        {product.title}
                    </Link>
                </h3>

                <div className="mt-auto pt-2 flex items-baseline gap-2">
                    <span className="text-base font-bold text-primary">
                        ${product.price.toLocaleString('es-UY')}
                    </span>
                    {isOnSale && (
                        <span className="text-xs text-gray-400 line-through">
                            ${product.compareAtPrice?.toLocaleString('es-UY')}
                        </span>
                    )}
                </div>

                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-within:opacity-100">
                    <Link
                        href={`/producto/${product.handle}`}
                        className="block w-full text-center text-xs font-bold uppercase tracking-wider text-primary border border-primary/30 rounded py-2 hover:bg-primary hover:text-white transition-colors"
                    >
                        Ver producto
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RelatedProductCard;
