import React from 'react';
import { searchProducts } from '@/lib/shopify';
import ProductGrid from '@/components/product/ProductGrid';

export const metadata = {
    title: 'Resultados de búsqueda | Cockpit',
    description: 'Resultados de búsqueda de productos en Cockpit',
};

interface SearchPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedSearchParams = await searchParams;
    const query = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
    const products = query ? await searchProducts(query) : [];

    return (
        <div className="min-h-screen pt-24 pb-12 bg-negro">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 uppercase tracking-wider">
                    {query ? `Resultados para "${query}"` : 'Búsqueda'}
                </h1>

                {products.length > 0 ? (
                    <ProductGrid products={products} />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-400 mb-4">
                            No se encontraron productos para "{query}"
                        </p>
                        <p className="text-gray-500">
                            Intenta con otros términos o revisa la ortografía.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
