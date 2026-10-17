import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const g = await guard();
  if (g instanceof NextResponse) return g;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Rəy tapılmadı" }, { status: 404 });
  }

  await prisma.review.update({
    where: { id },
    data: {
      author: body.author != null ? String(body.author) : existing.author,
      model: body.model != null ? String(body.model) : existing.model,
      text: body.text != null ? String(body.text) : existing.text,
      stars:
        body.stars != null
          ? Math.max(1, Math.min(5, Number(body.stars) || existing.stars))
          : existing.stars,
      status:
        body.status === "published" || body.status === "pending"
          ? body.status
          : existing.status,
    },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const g = await guard();
  if (g instanceof NextResponse) return g;
  const { id } = await params;
  await prisma.review.delete({ where: { id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
