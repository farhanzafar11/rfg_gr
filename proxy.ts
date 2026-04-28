import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("next-auth.session-token")?.value;
    const pathname = request.nextUrl.pathname;

    // Protect dashboard and any sub-routes
    if (pathname.startsWith("/dashboard") && !token) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
