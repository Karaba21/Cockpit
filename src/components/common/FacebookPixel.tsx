"use client";

import Script from "next/script";
import { FB_PIXEL_ID } from "@/lib/fpixel";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq_initialized?: boolean;
  }
}

const FacebookPixel = () => {
  if (!FB_PIXEL_ID) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            // PREVENCIÓN DE DUPLICADOS EN REACT STRICT MODE
            if (!window._fbq_initialized) {
              window._fbq_initialized = true;
              
              // AL REMOVER 'disablePushState', Meta Pixel tomará control automático de Next.js SPA
              fbq('set', 'autoConfig', false, '${FB_PIXEL_ID}');
              fbq('init', '${FB_PIXEL_ID}');
              
              // Solo disparamos de forma manual el PRIMER impacto de la sesión.
              // Los siguientes impactos al navegar las páginas de Next.js lo hará 
              // el Pixel de Facebook automáticamente al detectar los cambios del Router nativo.
              fbq('track', 'PageView');
            }
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

export default FacebookPixel;
