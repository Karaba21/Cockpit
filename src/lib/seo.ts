/**
 * Configuración centralizada de SEO
 * Actualiza estos valores según tu sitio
 * 
 * NOTA: Usa SITE_URL (sin NEXT_PUBLIC_) en el servidor para mayor seguridad.
 * Solo usa NEXT_PUBLIC_SITE_URL si necesitas acceder a la URL desde el cliente.
 */

/**
 * Obtiene la URL del sitio de forma segura (solo servidor)
 * Usa SITE_URL si está disponible, sino NEXT_PUBLIC_SITE_URL como fallback
 */
export function getSiteUrl(): string {
  // Prioriza SITE_URL (solo servidor) sobre NEXT_PUBLIC_SITE_URL
  return process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://cockpit.uy';
}

export const seoConfig = {
  siteName: 'Cockpit UY',
  defaultDescription: 'Tienda líder de simracing en Uruguay. Soportes, volantes, mods y accesorios para simuladores de carreras. Envíos a todo el país.',
  defaultTitle: 'Cockpit UY | Líderes en Simracing',
  locale: 'es_UY',
  currency: 'UYU',
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
  social: {
    twitter: '', // Agrega tu handle de Twitter si tienes
    facebook: '', // Agrega tu URL de Facebook si tienes
    instagram: '', // Agrega tu URL de Instagram si tienes
  },
  organization: {
    name: 'Cockpit UY',
    logo: '/opengraph.png',
    address: {
      addressCountry: 'UY',
      addressLocality: 'Uruguay',
    },
  },
} as const;

