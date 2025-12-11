import { NextRequest, NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
    try {
        const { lines, merchandiseId, quantity } = await request.json();

        let cartLines = lines;
        if (!cartLines && merchandiseId) {
            cartLines = [{ merchandiseId, quantity: quantity || 1 }];
        }

        if (!cartLines || cartLines.length === 0) {
            return NextResponse.json(
                { error: 'lines or merchandiseId is required' },
                { status: 400 }
            );
        }

        const result = await createCart(cartLines);

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
