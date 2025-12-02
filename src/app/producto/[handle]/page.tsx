import React from 'react';
import { notFound } from 'next/navigation';
import { getProductByHandle } from '@/lib/shopify';
import { Check } from 'lucide-react';
import AddToCartButton from '@/components/product/AddToCartButton';
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

    const productImage = product.images[0]?.url || `${siteUrl}/logocockpit.png`;
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

                    <div className="flex items-end gap-4 mb-6">
                        <span className="text-4xl font-bold text-primary">
                            ${product.price.toLocaleString('es-UY')}
                        </span>
                        {isOnSale && (
                            <span className="text-xl text-gray-400 line-through mb-1">
                                ${product.compareAtPrice?.toLocaleString('es-UY')}
                            </span>
                        )}
                    </div>

                    <div className="prose prose-invert mb-8 text-gray-300">
                        <p>{product.description}</p>
                    </div>

                    <div className="flex items-center gap-2 text-green-500 mb-8 font-medium">
                        <Check size={20} />
                        <span>Stock disponible</span>
                    </div>

                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
        </>
    );
}
