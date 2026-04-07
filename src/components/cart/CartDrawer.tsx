'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { X, Trash2, Minus, Plus, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { logEvent } from '@/lib/fpixel';

const CartDrawer = () => {
    const { items, removeFromCart, updateQuantity, getCheckoutUrl, isCartOpen, setIsCartOpen, cartCount } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);



    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const freeShippingThreshold = 4000;
    const progressPercentage = items.length === 0 ? 0 : Math.min(100, (subtotal / freeShippingThreshold) * 100);
    const remainingAmount = Math.max(0, freeShippingThreshold - subtotal);
    const isFreeShipping = items.length > 0 && subtotal >= freeShippingThreshold;

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        setCheckoutError(null);

        logEvent('InitiateCheckout', {
            content_ids: items.map(item => item.id),
            num_items: items.reduce((sum, item) => sum + item.quantity, 0),
            value: subtotal,
            currency: 'UYU'
        });

        try {
            const checkoutUrl = await getCheckoutUrl();
            if (checkoutUrl) {
                // Redirect to Shopify checkout
                window.location.href = checkoutUrl;
            } else {
                setCheckoutError('No se pudo obtener la URL de pago. Por favor, intenta de nuevo.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setCheckoutError('Ocurrió un error al procesar el pago. Por favor, intenta de nuevo.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className={`fixed inset-0 z-[100] flex justify-end ${isCartOpen ? '' : 'pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className={`relative w-full max-w-md h-full bg-black border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold uppercase">
                        Carrito con {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Free Shipping Bar */}
                <div className="px-5 py-6 border-b border-white/10 bg-neutral-900/40">
                    <div className="text-center font-bold text-sm mb-4">
                        {isFreeShipping ? (
                            <span className="text-primary text-[15px]">¡Tenés envío GRATIS!!</span>
                        ) : items.length === 0 ? (
                            <span className="text-white text-[15px]">
                                Sumá <span className="text-primary">$4.000</span> para tener envío GRATIS!
                            </span>
                        ) : (
                            <span className="text-white text-[15px]">
                                Te faltan <span className="text-primary">${remainingAmount.toLocaleString('es-UY')}</span> para tener envío GRATIS!
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-2.5 bg-neutral-800 rounded-full overflow-hidden relative">
                            <div
                                className={`h-full transition-all duration-700 ease-out relative ${isFreeShipping ? 'bg-primary' : 'bg-primary/90'}`}
                                style={{ width: `${progressPercentage}%` }}
                            >
                                {isFreeShipping && (
                                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, #000 6px, #000 12px)' }}></div>
                                )}
                            </div>
                        </div>
                        <div className={`flex items-center justify-center w-9 h-9 rounded-full border-2 flex-shrink-0 transition-all duration-500 ${isFreeShipping ? 'border-primary text-primary bg-primary/10 shadow-[0_0_10px_rgba(246,146,30,0.3)] scale-110' : 'border-neutral-700 text-neutral-500 bg-black scale-100'}`}>
                            <Truck size={16} />
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                            <p className="text-xl font-medium text-gray-300">Tu carrito está vacío</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="bg-primary hover:bg-primary-hover text-black font-bold py-3 px-8 rounded-full transition-colors uppercase tracking-wider w-full max-w-xs"
                            >
                                Continuar comprando
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-20 bg-white/5 rounded overflow-hidden flex-shrink-0 relative">
                                        {item.images[0] ? (
                                            <img
                                                src={item.images[0].url}
                                                alt={item.images[0].altText || item.title}
                                                loading="lazy"
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">No Image</div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold uppercase text-sm leading-tight text-white mb-1 line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-primary font-bold text-sm">
                                                    ${item.price.toLocaleString('es-UY')}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-500 hover:text-red-500 p-1"
                                                title="Eliminar producto"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="flex items-center mt-2">
                                            <div className="flex items-center bg-white/5 border border-white/10 rounded-full">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 p-4 bg-black">
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-300 font-medium">Subtotal</span>
                        <span className="font-bold text-lg text-white">
                            ${subtotal.toLocaleString('es-UY')}
                        </span>
                    </div>

                    {checkoutError && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
                            {checkoutError}
                        </div>
                    )}

                    <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut || items.length === 0}
                        className={`w-full font-bold py-4 rounded-full transition-all duration-300 transform uppercase tracking-wider disabled:cursor-not-allowed ${items.length === 0
                            ? 'bg-white/10 text-gray-500'
                            : 'bg-primary hover:bg-primary-hover text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(246,146,30,0.4)] shadow-[0_4px_15px_rgba(246,146,30,0.2)]'
                            }`}
                    >
                        {isCheckingOut ? 'Procesando...' : 'Pagar pedido'}
                    </button>

                    <p className="text-center text-xs text-gray-500 mt-4 mb-4">
                        Impuestos y envío se calculan en el checkout
                    </p>

                    {/* Payment Methods Info */}
                    <div className="flex items-center justify-center gap-4 pt-4 mt-4 border-t border-white/10">
                        <div className="relative w-10 h-6">
                            <img
                                src="/carrusel/masterlogo-removebg-preview.webp"
                                alt="Mastercard"
                                loading="lazy"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="relative w-12 h-6">
                            <img
                                src="/carrusel/VISA-Logo.webp"
                                alt="Visa"
                                loading="lazy"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="relative w-16 h-8">
                            <img
                                src="/carrusel/mercadopagoo.webp"
                                alt="Mercado Pago"
                                loading="lazy"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="relative w-16 h-6">
                            <img
                                src="/carrusel/abitab-removebg-preview.webp"
                                alt="Abitab"
                                loading="lazy"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
