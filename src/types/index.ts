export interface Product {
    id: string;
    handle: string;
    title: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    images: {
        url: string;
        altText: string;
    }[];
    tags?: string[];
    variantId?: string; // Shopify variant ID for cart operations
}

export interface CartItem extends Product {
    quantity: number;
}
