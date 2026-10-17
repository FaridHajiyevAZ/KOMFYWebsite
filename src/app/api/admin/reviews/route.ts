import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";

export async function POST(request: Request) {
  const g = await guard();
  if (g instanceof NextResponse) return g;

  const body = await request.json().catch(() => null);
  if (!body?.author || !body?.text) {
    return NextResponse.json({ error: "Müəllif və mətn tələb olunur" }, { status: 400 });
  }

  const last = await prisma.review.findFirst({ orderBy: { order: "desc" } });
  const stars = Math.max(1, Math.min(5, Number(body.stars) || 5));

  const review = await prisma.review.create({
    data: {
      author: String(body.author),
      model: String(body.model || ""),
      text: String(body.text),
      stars,
      status: body.status === "pending" ? "pending" : "published",
      order: (last?.order ?? 0) + 1,
    },
  });

  return NextResponse.json({ ok: true, id: review.id });
}
