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
}

export interface CartItem extends Product {
    quantity: number;
}
