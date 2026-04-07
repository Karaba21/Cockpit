import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import FacebookPixel from "@/components/common/FacebookPixel";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { getSiteUrl, seoConfig } from "@/lib/seo";

const siteUrl = getSiteUrl();
const siteName = seoConfig.siteName;
const defaultDescription = seoConfig.defaultDescription;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Líderes en Simracing`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'simracing',
    'simulador de carreras',
    'soportes simracing',
    'volantes simracing',
    'mods simracing',
    'accesorios simracing',
    'Uruguay',
    'cockpit simracing',
    'rig simracing',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.webp', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.webp', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.webp', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicons/android-chrome-192x192.webp',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicons/android-chrome-512x512.webp',
      },
    ],
  },
  manifest: '/favicons/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'es_UY',
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} | Líderes en Simracing`,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/opengraph.webp`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Líderes en Simracing`,
    description: defaultDescription,
    images: [`${siteUrl}/opengraph.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'ecommerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: siteName,
    description: defaultDescription,
    url: siteUrl,
    logo: `${siteUrl}/opengraph.webp`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UY',
      addressLocality: 'Uruguay',
    },
    sameAs: [],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <FacebookPixel />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <CartProvider>
          <CartDrawer />
          <div className="sticky top-0 z-50 w-full flex flex-col">
            <TopBar />
            <Navbar />
          </div>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
