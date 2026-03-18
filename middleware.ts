import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { hasPermission, Role } from "@/lib/rbac";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;
    const userRole = req.auth?.user?.role as Role | undefined;

    // Protect /admin routes
    if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        if (!userRole || !hasPermission(userRole, 'dashboard:view')) {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    // Protect /portal routes
    if (pathname.startsWith("/portal")) {
        if (!isLoggedIn) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        if (userRole === "VIEWER") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|marketing).*)"],
};
