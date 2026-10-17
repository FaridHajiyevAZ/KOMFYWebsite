import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";

const ALLOWED = [
  "fullName",
  "slogan",
  "phone",
  "whatsapp",
  "instagram",
  "instagramHandle",
  "email",
  "address",
  "since",
];

export async function PUT(request: Request) {
  const g = await guard({ adminOnly: true });
  if (g instanceof NextResponse) return g;

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Yanlış məlumat" }, { status: 400 });
  }

  const existing = await prisma.setting.findUnique({ where: { id: 1 } });
  let data: Record<string, unknown> = {};
  if (existing) {
    try {
      data = JSON.parse(existing.data);
    } catch {
      data = {};
    }
  }

  for (const key of ALLOWED) {
    if (key in body) {
      data[key] = key === "since" ? Number(body[key]) || data[key] : String(body[key] ?? "");
    }
  }

  await prisma.setting.upsert({
    where: { id: 1 },
    update: { data: JSON.stringify(data) },
    create: { id: 1, data: JSON.stringify(data) },
  });

  return NextResponse.json({ ok: true });
}
