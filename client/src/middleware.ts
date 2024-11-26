import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // Token'ı cookie'den al

  // Eğer token yoksa login sayfasına yönlendir
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Token varsa isteğe devam et
}

export const config = {
  //matcher: ["/", "/jobs", "/settings", "/profile"],
  matcher: ["/ASAsASAsaSSADA"],
};
