import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/session";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { password } = body;
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!expected || !secret) {
    return NextResponse.json(
      { error: "Admin panel isn't configured yet. See ADMIN_SETUP.md." },
      { status: 500 }
    );
  }

  if (!password || password !== expected) {
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const token = await createSessionToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
