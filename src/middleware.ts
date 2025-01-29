import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    console.log("Middleware executed");

    const authToken = getCookie('authToken');

    if (authToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: [
        '/api/:path*',
        '/profile',
    ],
}