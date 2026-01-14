export interface Product {
    id: string;
    handle: string;
    title: string;
    description: string;
    descriptionHtml: string;
    price: number;
    compareAtPrice?: number;
    images: {
        url: string;
        altText: string;
        mediaType?: 'image' | 'video' | 'external_video';
        previewImage?: string;
        host?: string;
    }[];
    tags?: string[];
    productType?: string;
    variantId?: string; // Shopify variant ID for cart operations
    collections?: string[];
    options?: {
        id: string;
        name: string;
        values: string[];
    }[];
    variants?: {
        id: string;
        title: string;
        availableForSale: boolean;
        selectedOptions: {
            name: string;
            value: string;
        }[];
        price: {
            amount: string;
            currencyCode: string;
        };
        compareAtPrice?: {
            amount: string;
            currencyCode: string;
        };
    }[];
    faq?: FAQItem[];
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface CartItem extends Product {
    quantity: number;
}
