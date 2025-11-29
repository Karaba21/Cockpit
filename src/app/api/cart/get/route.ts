import { NextRequest, NextResponse } from 'next/server';
import { getShopifyCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
    try {
        const { cartId } = await request.json();

        if (!cartId) {
            return NextResponse.json(
                { error: 'cartId is required' },
                { status: 400 }
            );
        }

        const cart = await getShopifyCart(cartId);

        if (!cart) {
            return NextResponse.json(
                { error: 'Cart not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(cart);
    } catch (error) {
        console.error('Error in cart get API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
