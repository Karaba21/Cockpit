import HeroSection from '@/components/home/HeroSection';
import ProductGrid from '@/components/product/ProductGrid';
import FeaturedSection from '@/components/home/FeaturedSection';
import ReviewsCarousel from '@/components/home/ReviewsCarousel';
import StatsStrip from '@/components/home/StatsStrip';
import PickupSection from '@/components/home/PickupSection';
import { getProductsByCollection } from '@/lib/shopify';

export default async function Home() {
  const soportes = await getProductsByCollection('soportes');
  const volantesMods = await getProductsByCollection('volantes-y-mods');

  return (
    <div className="flex flex-col gap-8">
      <HeroSection />

      <ProductGrid title="Soportes" products={soportes} />

      <FeaturedSection />

      <ProductGrid title="Volantes y mods" products={volantesMods} />

      <ReviewsCarousel />

      <StatsStrip />

      <PickupSection />
    </div>
  );
}
