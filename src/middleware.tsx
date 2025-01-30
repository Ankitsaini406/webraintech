import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/auth/login') {
        console.log("Skipping middleware for login page.");
        return NextResponse.next();
    }

    // Get the authToken from cookies
    const cookie = request.cookies.get("authToken")?.value;

    // If there's no authToken, redirect to login
    if (!cookie) {
        console.log("No auth token found. Redirecting to login.");
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile',
    ],
};
