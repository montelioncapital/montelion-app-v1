import { NextResponse } from "next/server";

export function middleware(req) {
  const hasSession = req.cookies.get("session");
  const url = req.nextUrl.clone();

  // Si connecté et on visite "/", on va au dashboard
  if (url.pathname === "/" && hasSession) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Si pas connecté et on visite /dashboard, on revient à "/"
  if (url.pathname.startsWith("/dashboard") && !hasSession) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
