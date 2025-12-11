import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProductByHandle } from '@/lib/shopify';


const FeaturedProduct = async ({ handle, title, description, reverse = false }: { handle: string, title?: string, description?: string, reverse?: boolean }) => {
    const product = await getProductByHandle(handle);

    if (!product) return null;

    return (
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-12`}>
            {/* Product Image */}
            <div className="w-full md:w-1/2">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 shadow-2xl border border-border">
                    {product.images && product.images.length > 0 && (
                        <Image
                            src={product.images[0].url}
                            alt={product.images[0].altText || product.title}
                            fill
                            className="object-contain"
                            priority
                        />
                    )}
                </div>
            </div>

            {/* Product Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold italic tracking-tighter mb-6 uppercase">
                    {title || product.title}
                </h2>
                <div className="text-gray-400 text-lg mb-8 leading-relaxed prose prose-invert">
                    {description ? (
                        <p className="whitespace-pre-line">{description}</p>
                    ) : product.descriptionHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                    ) : (
                        <p className="whitespace-pre-line">
                            {product.description}
                        </p>
                    )}
                </div>
                <Link
                    href={`/producto/${handle}`}
                    className="inline-block bg-primary hover:bg-primary-hover text-surface font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg uppercase tracking-wider"
                >
                    Más información
                </Link>
            </div>
        </div>
    );
};

const FeaturedSection = () => {
    return (
        <section className="py-16 bg-surface-light border-y border-border">
            <div className="container mx-auto px-4">
                <FeaturedProduct
                    handle="logitech-g29"
                    title="Iniciate con el mejor volante del mercado"
                    description="Descubre la experiencia definitiva de simracing con nuestra selección de volantes de alta gama. Precisión, realismo y durabilidad para llevar tu conducción al siguiente nivel."
                />

                <div className="w-full h-px bg-border my-8 opacity-50" />

                <FeaturedProduct
                    handle="volante-pxn-v99"
                    reverse={true}
                    title="PXN V99: Potencia y Precisión"
                    description="Experimenta el force feedback de próxima generación con el PXN V99. Diseñado para competir al más alto nivel con una respuesta inmediata y una construcción robusta."
                />
            </div>
        </section>
    );
};

export default FeaturedSection;
