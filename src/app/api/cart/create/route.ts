import { NextRequest, NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
    try {
        const { merchandiseId, quantity } = await request.json();

        if (!merchandiseId) {
            return NextResponse.json(
                { error: 'merchandiseId is required' },
                { status: 400 }
            );
        }

        const result = await createCart(merchandiseId, quantity || 1);

        if (!result) {
            return NextResponse.json(
                { error: 'Failed to create cart' },
                { status: 500 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in cart create API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
