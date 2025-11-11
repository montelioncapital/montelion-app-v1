// app/middleware.js
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

// Optionnel : limite le middleware au dashboard seulement
export const config = {
  matcher: ["/dashboard/:path*"],
};
