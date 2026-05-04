import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const res = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });
    
    const sessionData = await res.json();
    const session = sessionData ? (sessionData.session || sessionData.user) : null;

    const pathname = request.nextUrl.pathname;

    const isBookDetailsRoute = pathname.startsWith("/books/") && pathname !== "/books";
    const isProfileRoute = pathname.startsWith("/profile");
    const isAuthRoute = pathname === "/login" || pathname === "/register";

    if (!session && (isBookDetailsRoute || isProfileRoute)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

  } catch (error) {
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
