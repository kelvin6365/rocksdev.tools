import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

export function middleware(request: NextRequest) {
  // Skip middleware for API routes
  if (
    request.nextUrl.pathname.startsWith("/api/") ||
    request.nextUrl.pathname.startsWith("/monitoring")
  ) {
    return NextResponse.next();
  }

  // Apply internationalization middleware for other routes
  const handleI18nRouting = createMiddleware(routing);
  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - Internal Next.js files
  matcher: [
    // Match all pathnames except for
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.|monitoring).*)",
  ],
};
