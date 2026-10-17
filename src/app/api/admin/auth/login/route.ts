import { NextResponse } from "next/server";
import { authenticate, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json().catch(() => ({}));
  if (!email || !password) {
    return NextResponse.json({ error: "Email və parol tələb olunur" }, { status: 400 });
  }

  const session = await authenticate(email, password);
  if (!session) {
    return NextResponse.json({ error: "Email və ya parol yanlışdır" }, { status: 401 });
  }

  await setSessionCookie(session);
  return NextResponse.json({ ok: true, role: session.role });
}
