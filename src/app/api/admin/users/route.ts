import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";

export async function POST(request: Request) {
  const g = await guard({ adminOnly: true });
  if (g instanceof NextResponse) return g;

  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();
  const name = String(body?.name || "").trim();
  const password = String(body?.password || "");
  const role = body?.role === "admin" ? "admin" : "operator";

  if (!email || !name || password.length < 4) {
    return NextResponse.json(
      { error: "Email, ad və ən azı 4 simvollu parol tələb olunur" },
      { status: 400 }
    );
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Bu email artıq mövcuddur" }, { status: 409 });
  }

  await prisma.user.create({
    data: { email, name, role, passwordHash: await bcrypt.hash(password, 10) },
  });

  return NextResponse.json({ ok: true });
}
