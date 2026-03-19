"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { FB_PIXEL_ID, pageview } from "@/lib/fpixel";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const FacebookPixel = () => {
  const pathname = usePathname();
  // Guardamos la ruta en la que el usuario aterriza por primera vez de forma directa
  const initialPathname = useRef(pathname);

  useEffect(() => {
    // Si el pathname local de next/navigation se iguala a la ruta que inició la aplicación,
    // evitamos disparar el track porque el tag <Script> generará ese primer hit.
    // Esto resuelve el error de "PageView fired 2 times" por Strict Mode / Re-render inicial.
    if (initialPathname.current === pathname) {
      return;
    }
    
    // Si la ruta cambió por navegación del cliente, actualizamos la referencia 
    // y disparamos manual el PageView de la nueva página visitada.
    initialPathname.current = pathname;
    pageview();
  }, [pathname]);

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
            
            // PREVENCIÓN DE DUPLICADOS Y AUSENCIAS ========================
            // 1. Apagamos el rastreo automático de historial (SPA Router) para no duplicar hits
            fbq.disablePushState = true; 
            fbq('set', 'autoConfig', false, '${FB_PIXEL_ID}');
            
            // 2. Inicializamos
            fbq('init', '${FB_PIXEL_ID}');
            
            // 3. Disparamos de forma síncrona el primer PageView
            // Esto resuelve el "0 pixels fired on this page" cuando refrescás directo un producto.
            fbq('track', 'PageView');
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
