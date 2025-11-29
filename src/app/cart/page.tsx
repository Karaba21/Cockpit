'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
    const { items, removeFromCart, updateQuantity, getCheckoutUrl } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        setCheckoutError(null);

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

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl font-bold italic tracking-tighter mb-6">TU CARRITO ESTÁ VACÍO</h1>
                <p className="text-gray-400 mb-8">Parece que aún no has agregado nada.</p>
                <Link
                    href="/catalogo"
                    className="inline-block bg-primary hover:bg-primary-hover text-surface font-bold py-3 px-8 rounded-full transition-colors uppercase tracking-wider"
                >
                    Seguir comprando
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold italic tracking-tighter mb-8 uppercase">Tu Carrito</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 bg-surface-light p-4 rounded-lg border border-border">
                            <div className="w-24 h-24 bg-white/5 rounded overflow-hidden flex-shrink-0 relative">
                                {item.images[0] ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={item.images[0].url}
                                        alt={item.images[0].altText}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">No Image</div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold uppercase mb-1">{item.title}</h3>
                                <p className="text-primary font-bold">${item.price.toLocaleString('es-UY')}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-border rounded">
                                    <button
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        className="px-3 py-1 hover:bg-white/10"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-3 py-1 font-mono">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-3 py-1 hover:bg-white/10"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-surface-light p-6 rounded-lg border border-border sticky top-24">
                        <h2 className="text-xl font-bold mb-6 uppercase">Resumen</h2>

                        <div className="flex justify-between mb-4">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="font-bold">${subtotal.toLocaleString('es-UY')}</span>
                        </div>

                        <div className="flex justify-between mb-6 text-sm text-gray-500">
                            <span>Envío</span>
                            <span>Calculado en el pago</span>
                        </div>

                        <div className="border-t border-border pt-4 mb-8 flex justify-between items-end">
                            <span className="font-bold text-lg">Total estimado</span>
                            <span className="font-bold text-2xl text-primary">${subtotal.toLocaleString('es-UY')}</span>
                        </div>

                        {checkoutError && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
                                {checkoutError}
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full bg-primary hover:bg-primary-hover text-surface font-bold py-4 rounded-full transition-colors uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCheckingOut ? 'Procesando...' : 'Pagar pedido'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
