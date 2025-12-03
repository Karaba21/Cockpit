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
                        merchandiseId: product.variantId,
                        quantity: 1,
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
        // If no Shopify cart exists, create one with all current items
        if (!shopifyCartId) {
            console.log('No Shopify cart ID found, creating new cart...');

            if (items.length === 0) {
                console.error('Cannot create cart: no items');
                return null;
            }

            try {
                // Create cart with first item via API
                const firstItem = items[0];
                if (!firstItem.variantId) {
                    console.error('First item missing variantId');
                    return null;
                }

                const createResponse = await fetch('/api/cart/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        merchandiseId: firstItem.variantId,
                        quantity: firstItem.quantity,
                    }),
                });

                if (!createResponse.ok) {
                    console.error('Failed to create cart');
                    return null;
                }

                const result = await createResponse.json();
                setShopifyCartId(result.cartId);

                // Add remaining items to the cart
                for (let i = 1; i < items.length; i++) {
                    const item = items[i];
                    if (item.variantId) {
                        await fetch('/api/cart/add', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                cartId: result.cartId,
                                merchandiseId: item.variantId,
                                quantity: item.quantity,
                            }),
                        });
                    }
                }

                return result.checkoutUrl;
            } catch (error) {
                console.error('Error creating cart for checkout:', error);
                return null;
            }
        }

        // If cart exists, fetch the checkout URL via API
        try {
            const response = await fetch('/api/cart/get', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartId: shopifyCartId }),
            });

            if (!response.ok) {
                return null;
            }

            const cart = await response.json();
            return cart?.checkoutUrl || null;
        } catch (error) {
            console.error('Error fetching checkout URL:', error);
            return null;
        }
    };

    const buyNow = async (product: Product): Promise<string | null> => {
        if (!product.variantId) {
            console.error('Product missing variantId');
            return null;
        }

        // Add to local state (optional, but good for consistency if user comes back)
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        try {
            if (!shopifyCartId) {
                // Create new cart with just this item
                const response = await fetch('/api/cart/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        merchandiseId: product.variantId,
                        quantity: 1,
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    setShopifyCartId(result.cartId);
                    return result.checkoutUrl;
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

                // Get checkout URL
                const response = await fetch('/api/cart/get', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartId: shopifyCartId }),
                });

                if (response.ok) {
                    const cart = await response.json();
                    return cart?.checkoutUrl || null;
                }
            }
        } catch (error) {
            console.error('Error in buyNow:', error);
        }
        return null;
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
