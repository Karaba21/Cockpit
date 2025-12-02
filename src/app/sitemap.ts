import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/shopify';
import { getSiteUrl } from '@/lib/seo';

const siteUrl = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/catalogo?category=soportes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/catalogo?category=volantes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/catalogo?category=accesorios`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  try {
    // Obtener todos los productos para el sitemap
    const products = await getAllProducts();
    
    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${siteUrl}/producto/${product.handle}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...baseRoutes, ...productRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Si hay error, devolver al menos las rutas base
    return baseRoutes;
  }
}

