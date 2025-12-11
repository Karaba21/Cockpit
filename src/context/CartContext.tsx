'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    cartCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    getCheckoutUrl: () => Promise<string | null>;
    buyNow: (product: Product) => Promise<string | null>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [shopifyCartId, setShopifyCartId] = useState<string | null>(null);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        const savedCartId = localStorage.getItem('shopifyCartId');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
        if (savedCartId) {
            setShopifyCartId(savedCartId);
        }
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    // Save Shopify cart ID to local storage
    useEffect(() => {
        if (shopifyCartId) {
            localStorage.setItem('shopifyCartId', shopifyCartId);
        }
    }, [shopifyCartId]);

    const addToCart = async (product: Product) => {
        if (!product.variantId) {
            console.error('Product missing variantId');
            return;
        }

        // Update local state immediately for UI responsiveness
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);

        // Sync with Shopify via API route
        try {
            if (!shopifyCartId) {
                // Create new cart
                const response = await fetch('/api/cart/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        lines: [{
                            merchandiseId: product.variantId,
                            quantity: 1,
                        }]
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    setShopifyCartId(result.cartId);
                }
            } else {
                // Add to existing cart
                await fetch('/api/cart/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cartId: shopifyCartId,
                        merchandiseId: product.variantId,
                        quantity: 1,
                    }),
                });
            }
        } catch (error) {
            console.error('Error syncing with Shopify cart:', error);
        }
    };

    const removeFromCart = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
        // Note: For full implementation, should also call removeFromShopifyCart
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
        );
        // Note: For full implementation, should also call updateShopifyCartLine
    };

    const getCheckoutUrl = async (): Promise<string | null> => {
        if (items.length === 0) {
            return null;
        }
        if (items.length === 0) {
            return null;
        }

        try {
            console.log('Creating fresh checkout for items:', items);
            // Always create a fresh cart for checkout to ensure it matches local state exactly
            const lines = items.map(item => ({
                merchandiseId: item.variantId,
                quantity: item.quantity
            }));

            const response = await fetch('/api/cart/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lines }),
                body: JSON.stringify({ lines }),
            });

            if (!response.ok) {
                console.error('Failed to create checkout cart');
                return null;
            }

            const result = await response.json();
            // Update the stored cart ID to this new valid one
            setShopifyCartId(result.cartId);
            return result.checkoutUrl;
        } catch (error) {
            console.error('Error creating checkout:', error);
            return null;
        }
    };

    const buyNow = async (product: Product): Promise<string | null> => {
        if (!product.variantId) {
            console.error('Product missing variantId');
            return null;
        }

        // 1. Calculate the new state with this item added
        const newItems = [...items];
        const existingIndex = newItems.findIndex((item) => item.id === product.id);
        if (existingIndex >= 0) {
            newItems[existingIndex] = {
                ...newItems[existingIndex],
                quantity: newItems[existingIndex].quantity + 1
            };
        } else {
            newItems.push({ ...product, quantity: 1 });
        }

        // 2. Update local state
        setItems(newItems);

        // 3. Create a fresh checkout with these items
        try {
            console.log('Creating fresh buyNow checkout for items:', newItems);
            const lines = newItems.map(item => ({
                merchandiseId: item.variantId,
                quantity: item.quantity
            }));

            const response = await fetch('/api/cart/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lines }),
            });

            if (!response.ok) {
                console.error('Failed to create buyNow cart');
                return null;
            }

            const result = await response.json();
            setShopifyCartId(result.cartId);
            return result.checkoutUrl;

        } catch (error) {
            console.error('Error in buyNow:', error);
            return null;
        }
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                cartCount,
                isCartOpen,
                setIsCartOpen,
                getCheckoutUrl,
                buyNow,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
