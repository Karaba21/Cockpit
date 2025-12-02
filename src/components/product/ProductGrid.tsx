import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
    title?: string;
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
    return (
        <section className="py-16 container mx-auto px-4">
            {title && (
                <h2 className="text-3xl md:text-4xl font-bold italic tracking-tighter mb-8 text-center uppercase">
                    {title}
                </h2>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
