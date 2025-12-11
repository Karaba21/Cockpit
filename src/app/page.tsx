import HeroSection from '@/components/home/HeroSection';
import Link from 'next/link';
import Image from 'next/image';
import ProductGrid from '@/components/product/ProductGrid';
import FeaturedSection from '@/components/home/FeaturedSection';
import ReviewsCarousel from '@/components/home/ReviewsCarousel';
import StatsStrip from '@/components/home/StatsStrip';
import PickupSection from '@/components/home/PickupSection';
import { getProductsByCollection } from '@/lib/shopify';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/seo';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Tienda líder de simracing en Uruguay. Descubre nuestros soportes, volantes, mods y accesorios para simuladores de carreras. Envíos a todo el país.',
  openGraph: {
    title: 'Cockpit UY | Líderes en Simracing',
    description: 'Tienda líder de simracing en Uruguay. Soportes, volantes, mods y accesorios para simuladores de carreras.',
    url: '/',
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
    canonical: '/',
  },
};

export default async function Home() {
  const soportes = await getProductsByCollection('soportes');
  const volantesMods = await getProductsByCollection('volantes-y-mods');

  return (
    <div className="flex flex-col gap-8">
      <HeroSection />

      <FeaturedSection />

      <ProductGrid title="Soportes" products={soportes} />

      <ProductGrid
        title="Volantes y mods"
        products={volantesMods}
        headerContent={
          <Link href="/catalogo" className="block transition-transform hover:scale-[1.02] duration-300">
            <Image
              src="/volantesymods.png"
              alt="Volantes y mods"
              width={1600}
              height={400}
              className="w-full max-w-7xl h-auto object-cover rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all duration-300 border-2 border-transparent hover:border-orange-500"
            />
          </Link>
        }
      />

      <ReviewsCarousel />

      <StatsStrip />

      <PickupSection />
    </div>
  );
}
