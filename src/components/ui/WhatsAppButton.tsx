'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    const phoneNumber = '59894409481'; // +598 94409481 in international format without +
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Contactar por WhatsApp"
        >
            <div className="relative">
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 group-hover:opacity-0 transition-opacity"></div>

                {/* Main button */}
                <div className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform group-hover:scale-110">
                    <MessageCircle size={28} strokeWidth={2} />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Chatea con nosotros
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                </div>
            </div>
        </a>
    );
}
