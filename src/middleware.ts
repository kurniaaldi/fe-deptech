import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/employee", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/employee", "/leave", "/profile", "/report"],
};
