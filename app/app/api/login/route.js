import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  const { email, password } = await req.json().catch(() => ({}));

  const ok =
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD;

  if (!ok) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }

  const token = crypto.randomUUID();
  const res = NextResponse.json({ ok: true });

  res.cookies.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });

  return res;
}
