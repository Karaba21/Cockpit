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



    const soportesSubcategories = ['plegables', 'soportes-rigidos'];
    const isSoportesActive = category === 'soportes' || (category && soportesSubcategories.includes(category));

    const getButtonClass = (btnCategory?: string, isSubcategory = false) => {
        let isActive = category === btnCategory;

        // Special handling for parent 'Soportes' button
        if (btnCategory === 'soportes' && isSoportesActive) {
            isActive = true;
        }

        const baseClass = "rounded-full transition-all duration-300 font-bold text-center flex justify-center items-center border";
        const padding = isSubcategory ? "px-6 py-2 text-sm uppercase tracking-wider" : "px-4 py-2";

        if (isActive) {
            return `${baseClass} ${padding} bg-primary text-black border-primary shadow-[0_0_20px_rgba(246,146,30,0.4)] hover:shadow-[0_0_30px_rgba(246,146,30,0.6)] scale-105`;
        }
        return `${baseClass} ${padding} bg-surface/50 border-primary text-gray-300 hover:text-primary hover:bg-surface-light backdrop-blur-sm`;
    };

    const mainCategories = [
        { name: 'TODOS', param: undefined },
        { name: 'SOPORTES', param: 'soportes' },
        { name: 'VOLANTES', param: 'volantes-1' },
        { name: 'ACCESORIOS', param: 'accesorios' }
    ];

    // Find current category index
    // Handing subcategories of Soportes to map back to Soportes
    const effectiveCategory = isSoportesActive ? 'soportes' : category;

    const currentIndex = mainCategories.findIndex(c => c.param === effectiveCategory);
    const activeIndex = currentIndex === -1 ? 0 : currentIndex; // Default to Todos if not found

    const prevIndex = (activeIndex - 1 + mainCategories.length) % mainCategories.length;
    const nextIndex = (activeIndex + 1) % mainCategories.length;

    const prevCategory = mainCategories[prevIndex];
    const currentCategoryObj = mainCategories[activeIndex];
    const nextCategory = mainCategories[nextIndex];

    const getLink = (param?: string) => param ? `/catalogo?category=${param}` : '/catalogo';

    return (
        <div className="container mx-auto px-4 py-4">

            {/* Category Carousel Selector */}
            <div className="flex flex-col items-center gap-2 mb-0">
                <div className="flex items-center justify-center gap-8 md:gap-12">
                    <Link href={getLink(prevCategory.param)} aria-label="Categoría anterior" className="text-gray-400 hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold  text-primary tracking-tighter text-center uppercase min-w-[200px]">
                        {currentCategoryObj.name}
                    </h1>

                    <Link href={getLink(nextCategory.param)} aria-label="Categoría siguiente" className="text-gray-400 hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
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

                {/* Subtitles for Subcategories */}
                {category === 'plegables' && (
                    <p className="text-gray-300 text-lg mt-4 tracking-wide animate-fade-in text-center max-w-xl font-dm-sans">
                        Disfrutá tu simulador y guardalo fácilmente cuando lo necesites
                    </p>
                )}
                {category === 'soportes-rigidos' && (
                    <p className="text-gray-300 text-lg mt-4 tracking-wide animate-fade-in text-center max-w-xl font-dm-sans">
                        Para los que buscan la precisión en cada curva
                    </p>
                )}

            </div>

            <ProductGrid products={products} className="py-4" />
        </div>
    );
}
