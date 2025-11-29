import { NextRequest, NextResponse } from 'next/server';
import { addToShopifyCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
    try {
        const { cartId, merchandiseId, quantity } = await request.json();

        if (!cartId || !merchandiseId) {
            return NextResponse.json(
                { error: 'cartId and merchandiseId are required' },
                { status: 400 }
            );
        }

        const success = await addToShopifyCart(cartId, merchandiseId, quantity || 1);

        if (!success) {
            return NextResponse.json(
                { error: 'Failed to add to cart' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in cart add API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
