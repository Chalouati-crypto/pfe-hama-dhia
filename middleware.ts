// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET!,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Role-based authorization
  //   if (request.nextUrl.pathname.startsWith("/admin") && token.role !== "admin") {
  //     return NextResponse.redirect(new URL("/unauthorized", request.url));
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/articles/new"],
};
