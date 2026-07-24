import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = ["/", "/auth/login", "/auth/register", "/api/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  try {
    const { data: session } = await betterFetch<{ session: unknown }>(
      "/api/auth/get-session",
      {
        baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!session?.session) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
