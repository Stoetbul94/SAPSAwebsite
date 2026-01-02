import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Admin routes protection is handled client-side via auth check
  // This middleware can be extended for additional server-side checks if needed
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
