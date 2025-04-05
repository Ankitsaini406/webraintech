import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./utils/jwt";

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

    const user = decodeToken(cookie);

    if (!user) {
        console.log("Invalid token. Redirecting to login.");
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/admin")) {
        if (user.role !== "ADMIN" && user.role !== "TEACHER") {
            console.log("Unauthorized access to admin page. Redirecting.");
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile',
        '/admin',
        '/admin/:path*',
    ],
};
