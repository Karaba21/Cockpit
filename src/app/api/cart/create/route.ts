import { NextRequest, NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        let lines = body.lines;

        // Support legacy single item format
        if (!lines && body.merchandiseId) {
            lines = [{
                merchandiseId: body.merchandiseId,
                quantity: body.quantity || 1
            }];
        }

        if (!lines || lines.length === 0) {
            return NextResponse.json(
                { error: 'lines or merchandiseId is required' },
                { status: 400 }
            );
        }

        const result = await createCart(lines);

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
