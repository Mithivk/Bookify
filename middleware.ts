import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/dashboard");

  // 🚫 User not logged in trying to access protected route
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔐 Logged-in user trying to access login/signup
  if (isAuthPage && token) {
    try {
      verifyToken(token); // validate token
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      // invalid token → allow access to login/signup
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};