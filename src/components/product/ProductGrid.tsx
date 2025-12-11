import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
    title?: string;
    products: Product[];
    headerContent?: React.ReactNode;
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products, headerContent }) => {
    return (
        <section className="py-16 container mx-auto px-4">
            {title && (
                <h2 className="text-6xl md:text-6xl font-bold italic tracking-tighter mb-12 text-center text-primary uppercase">
                    {title}
                </h2>
            )}

            {headerContent && (
                <div className="mb-12 flex justify-center">
                    {headerContent}
                </div>
            )}

            <div className="flex flex-wrap justify-center gap-6">
                {products.map((product) => (
                    <div key={product.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
