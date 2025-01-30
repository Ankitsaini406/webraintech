import { deleteCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {

        // Delete the cookie from the server
        deleteCookie("authToken", { req });

        return NextResponse.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error in logout API:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
