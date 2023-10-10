

import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('next-auth.session-token')?.value || "";
    if (!token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    } else {
        return NextRequest.continue;
    }
}
export const config = {
    matcher: ['/profile', '/create-prompt/', '/delete-prompt/:path*', '/update-prompt/:path*']
}