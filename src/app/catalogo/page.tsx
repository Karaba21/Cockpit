import React from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import { getAllProducts, getProductsByCollection } from '@/lib/shopify';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/seo';

const siteUrl = getSiteUrl();

const categoryNames: Record<string, string> = {
    soportes: 'Soportes',
    'volantes-1': 'Volantes',
    accesorios: 'Accesorios',
    'plegables': 'Soportes Plegables',
    'soportes-rigidos': 'Soportes Rígidos',
};

export async function generateMetadata({ searchParams }: CatalogPageProps): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;
    const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;


    const categoryName = category ? categoryNames[category] || category : 'Todos';
    const title = category ? `${categoryName} - Catálogo` : 'Catálogo Completo';
    const description = category
        ? `Explora nuestra selección de ${categoryName.toLowerCase()} para simracing. Productos de calidad en Uruguay.`
        : 'Explora nuestro catálogo completo de productos para simracing. Soportes, volantes, mods y accesorios. Envíos a todo Uruguay.';

    return {
        title,
        description,
        openGraph: {
            title: `${title} | Cockpit UY`,
            description,
            url: category ? `/catalogo?category=${category}` : '/catalogo',
            type: 'website',
            images: [
                {
                    url: `${siteUrl}/opengraph.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Cockpit UY',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            images: [`${siteUrl}/opengraph.png`],
        },
        alternates: {
            canonical: category ? `/catalogo?category=${category}` : '/catalogo',
        },
    };
}

interface CatalogPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
    const resolvedSearchParams = await searchParams;
    const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;

    const products = category
        ? await getProductsByCollection(category)
        : await getAllProducts();

    if (products.length > 0) {
        console.log('Debug - First Product:', JSON.stringify({
            title: products[0].title,
            tags: products[0].tags,
            productType: products[0].productType
        }, null, 2));

        // Log all unique tags to see what we have
        const allTags = Array.from(new Set(products.flatMap(p => p.tags || [])));
        console.log('Debug - All Tags:', allTags);

        // Log all unique product types
        const allTypes = Array.from(new Set(products.map(p => p.productType).filter(Boolean)));
        console.log('Debug - All Product Types:', allTypes);
    }

    const soportesSubcategories = ['plegables', 'soportes-rigidos'];
    const isSoportesActive = category === 'soportes' || (category && soportesSubcategories.includes(category));

    const getButtonClass = (btnCategory?: string, isSubcategory = false) => {
        let isActive = category === btnCategory;

        // Special handling for parent 'Soportes' button
        if (btnCategory === 'soportes' && isSoportesActive) {
            isActive = true;
        }

        const baseClass = "rounded-full transition-colors font-bold text-center flex justify-center items-center";
        const padding = isSubcategory ? "px-6 py-2 text-sm" : "px-4 py-2";

        if (isActive) {
            return `${baseClass} ${padding} bg-primary text-surface`;
        }
        return `${baseClass} ${padding} bg-surface-light text-gray-300 hover:text-primary`;
    };

    const categoryTitle = category ? (categoryNames[category] || category) : "Todos los productos";

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold italic text-primary tracking-tighter mb-8 text-center uppercase">
                {categoryTitle}
            </h1>

            {/* Filters */}
            <div className="flex flex-col items-center gap-8 mb-12">
                <div className="grid grid-cols-2 gap-3 md:flex md:justify-center">
                    <Link href="/catalogo" className={getButtonClass(undefined)}>
                        Todos
                    </Link>
                    <Link href="/catalogo?category=soportes" className={getButtonClass('soportes')}>
                        Soportes
                    </Link>
                    <Link href="/catalogo?category=volantes-1" className={getButtonClass('volantes-1')}>
                        Volantes
                    </Link>
                    <Link href="/catalogo?category=accesorios" className={getButtonClass('accesorios')}>
                        Accesorios
                    </Link>
                </div>

                {/* Subcategories for Soportes */}
                {isSoportesActive && (
                    <div className="flex gap-2 justify-center animate-fade-in-down">
                        <Link href="/catalogo?category=plegables" className={getButtonClass('plegables', true)}>
                            Plegables
                        </Link>
                        <Link href="/catalogo?category=soportes-rigidos" className={getButtonClass('soportes-rigidos', true)}>
                            Rígidos
                        </Link>
                    </div>
                )}
            </div>

            <ProductGrid products={products} />
        </div>
    );
}
