import React from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import { getAllProducts, getProductsByCollection } from '@/lib/shopify';
import Link from 'next/link';

interface CatalogPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
    const resolvedSearchParams = await searchParams;
    const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;

    const products = category
        ? await getProductsByCollection(category)
        : await getAllProducts();

    const getButtonClass = (btnCategory?: string) => {
        const isActive = category === btnCategory;
        const baseClass = "px-4 py-2 rounded-full transition-colors font-bold";
        return isActive
            ? `${baseClass} bg-primary text-surface`
            : `${baseClass} bg-surface-light text-gray-300 hover:text-primary`;
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold italic tracking-tighter mb-8 text-center uppercase">
                Catálogo Completo
            </h1>

            {/* Filters */}
            <div className="flex justify-center mb-12 space-x-4">
                <Link href="/catalogo" className={getButtonClass(undefined)}>
                    Todos
                </Link>
                <Link href="/catalogo?category=soportes" className={getButtonClass('soportes')}>
                    Soportes
                </Link>
                <Link href="/catalogo?category=volantes" className={getButtonClass('volantes')}>
                    Volantes
                </Link>
                <Link href="/catalogo?category=accesorios" className={getButtonClass('accesorios')}>
                    Accesorios
                </Link>
            </div>

            <ProductGrid title={category ? category.charAt(0).toUpperCase() + category.slice(1) : "Todos los productos"} products={products} />
        </div>
    );
}
