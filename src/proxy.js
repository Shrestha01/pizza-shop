// src/proxy.js
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  // Renamed from 'default auth'
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const { nextUrl } = req;

  if (nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/shop", nextUrl));
  }

  if (nextUrl.pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
