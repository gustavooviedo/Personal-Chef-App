import { NextResponse } from "next/server";

export function middleware(request) {
  // In development, allow access to admin routes without authentication
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  // In production, check for authentication
  const isAuthenticated = request.cookies.has("next-auth.session-token");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
