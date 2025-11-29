import React from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import { getAllProducts } from '@/lib/shopify';

export default async function CatalogPage() {
    const products = await getAllProducts();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-8 text-center uppercase">
                Catálogo Completo
            </h1>

            {/* Filters Placeholder */}
            <div className="flex justify-center mb-12 space-x-4">
                <button className="px-4 py-2 bg-primary text-surface font-bold rounded-full">Todos</button>
                <button className="px-4 py-2 bg-surface-light text-gray-300 hover:text-primary rounded-full transition-colors">Soportes</button>
                <button className="px-4 py-2 bg-surface-light text-gray-300 hover:text-primary rounded-full transition-colors">Volantes</button>
                <button className="px-4 py-2 bg-surface-light text-gray-300 hover:text-primary rounded-full transition-colors">Mods</button>
            </div>

            <ProductGrid title="Todos los productos" products={products} />
        </div>
    );
}
