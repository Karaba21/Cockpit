import React from 'react';
import { notFound } from 'next/navigation';
import { getProductByHandle, getRelatedProducts } from '@/lib/shopify';
import ProductForm from '@/components/product/ProductForm';
import FAQ from '@/components/product/FAQ';
import RelatedProductsCarousel from '@/components/product/RelatedProductsCarousel';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/seo';

const siteUrl = getSiteUrl();

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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-surface-light rounded-lg overflow-hidden border border-border relative">
                            {product.images[0] ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={product.images[0].url}
                                    alt={product.images[0].altText}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}
                            {isOnSale && (
                                <span className="absolute top-4 right-4 bg-secondary text-white font-bold px-3 py-1 rounded">
                                    OFERTA
                                </span>
                            )}
                        </div>
                    </div>


                    {/* Info */}
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold italic tracking-tighter mb-4 uppercase">
                            {product.title}
                        </h1>

                        <div className="prose prose-invert mb-8 text-gray-300">
                            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                        </div>

                        <ProductForm product={product} />

                        {product.faq && product.faq.length > 0 && (
                            <FAQ items={product.faq} />
                        )}
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <RelatedProductsCarousel products={relatedProducts} />
        </>
    );
}
