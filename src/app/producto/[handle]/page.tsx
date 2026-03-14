import React from 'react';
import { notFound } from 'next/navigation';
import { getProductByHandle, getRelatedProducts } from '@/lib/shopify';
import ProductForm from '@/components/product/ProductForm';
import FAQ from '@/components/product/FAQ';
import RelatedProductsCarousel from '@/components/product/RelatedProductsCarousel';
import ProductGallery from '@/components/product/ProductGallery';
import ScrollToTop from '@/components/ScrollToTop';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/seo';
import IsForYou from "@/components/home/IsForYou";
import ComparisonSection from '@/components/home/ComparisonSection';
import { Star } from 'lucide-react';

const siteUrl = getSiteUrl();

const generateFakeRating = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash += id.charCodeAt(i);
    }
    const rating = 4.5 + ((hash % 51) / 100);
    const reviews = 150 + (hash % 1000);

    const finalRating = rating > 4.95 ? "5.0" : rating.toFixed(1);
    return { rating: finalRating, reviews };
};

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
    const { handle } = await params;
    const product = await getProductByHandle(handle);

    if (!product) {
        return {
            title: 'Producto no encontrado',
        };
    }

    const productImage = product.images[0]?.url || `${siteUrl}/opengraph.png`;
    const price = product.price;
    const currency = 'UYU';

    return {
        title: product.title,
        description: product.description || `Compra ${product.title} en Cockpit UY. Productos de simracing en Uruguay.`,
        keywords: product.tags || [],
        openGraph: {
            title: `${product.title} | Cockpit UY`,
            description: product.description || `Compra ${product.title} en Cockpit UY`,
            url: `/producto/${handle}`,
            type: 'website',
            images: [
                {
                    url: productImage,
                    width: 1200,
                    height: 1200,
                    alt: product.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.description || `Compra ${product.title} en Cockpit UY`,
            images: [productImage],
        },
        alternates: {
            canonical: `/producto/${handle}`,
        },
        other: {
            'product:price:amount': price.toString(),
            'product:price:currency': currency,
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const product = await getProductByHandle(handle);

    if (!product) {
        notFound();
    }

    // Smart collection selection logic for related products
    // 1. Try to find a collection that matches the product type
    // 2. Filter out generic collections (all, frontpage, etc)
    // 3. Fallback to the first collection
    const categoryCollection = product.collections?.find(c => c === product.productType?.toLowerCase())
        || product.collections?.find(c => !['all', 'frontpage', 'destacados', 'novedades', 'ofertas', 'home'].includes(c))
        || product.collections?.[0];

    const relatedProducts = categoryCollection
        ? await getRelatedProducts(categoryCollection, product.id)
        : [];

    // Structured data para el producto
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.images.map(img => img.url),
        sku: product.id,
        brand: {
            '@type': 'Brand',
            name: 'Cockpit UY',
        },
        offers: {
            '@type': 'Offer',
            url: `${siteUrl}/producto/${handle}`,
            priceCurrency: 'UYU',
            price: product.price,
            availability: 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: 'Cockpit UY',
            },
        },
    };

    // Breadcrumbs schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: siteUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Catálogo',
                item: `${siteUrl}/catalogo`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: product.title,
                item: `${siteUrl}/producto/${handle}`,
            },
        ],
    };

    const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
    const fakeRating = generateFakeRating(product.id);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <ScrollToTop />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="container mx-auto px-4 py-2 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                    {/* Mobile Title */}
                    <div className="md:hidden mb-2">
                        <h1 className="text-3xl font-bold italic tracking-tighter uppercase mb-1">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-2">
                            <div className="flex text-[#FFC107]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-foreground/80">{fakeRating.rating} ({fakeRating.reviews})</span>
                        </div>
                    </div>

                    {/* Gallery */}
                    <ProductGallery
                        media={product.images}
                        productTitle={product.title}
                        isOnSale={!!isOnSale}
                    />


                    {/* Info */}
                    <div>
                        <div className="hidden md:block mb-8">
                            <h1 className="text-3xl md:text-5xl font-bold italic tracking-tighter uppercase mb-2">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-2">
                                <div className="flex text-[#FFC107]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                                    ))}
                                </div>
                                <span className="text-base font-medium text-foreground/80">{fakeRating.rating} ({fakeRating.reviews})</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <ProductForm product={product} />
                        </div>
                        {product.destacado && (
                            <div className="mb-6 mt-8 space-y-2">
                                {product.destacado.split('\n').filter(Boolean).map((line, index) => (
                                    <div key={index} className="flex items-start gap-2 text-lg text-gray-200 font-medium">
                                        <span className="text-[var(--color-primary)] opacity-80 mt-[0.4em] text-sm">●</span>
                                        <span>{line}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <IsForYou />

                        <ComparisonSection />

                        {product.faq && product.faq.length > 0 && (
                            <FAQ items={product.faq} />
                        )}
                    </div>
                </div>



            </div>



            <div className="container mx-auto px-4 py-8">
                <div className="p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                    <h3 className="text-xl text-primary font-bold mb-6">Descripción:</h3>
                    <div className="prose prose-invert max-w-none text-gray-300">
                        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <RelatedProductsCarousel products={relatedProducts} />
        </>
    );
}
