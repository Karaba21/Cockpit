'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Prevent browser from restoring scroll position automatically
        if (typeof window !== 'undefined' && window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const handleScroll = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant',
            });
        };

        // Scroll immediately
        handleScroll();

        // Scroll again after a short delay to account for layout shifts/rendering
        const timeoutId = setTimeout(handleScroll, 100);

        return () => {
            clearTimeout(timeoutId);
            // Optionally restore default behavior on cleanup, though usually 'auto' is default
            if (typeof window !== 'undefined' && window.history) {
                window.history.scrollRestoration = 'auto';
            }
        };
    }, [pathname]);

    return null;
}
