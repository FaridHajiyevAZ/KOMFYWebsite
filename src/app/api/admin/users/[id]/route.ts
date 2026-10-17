import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const g = await guard({ adminOnly: true });
  if (g instanceof NextResponse) return g;
  const { id } = await params;

  if (g.session.userId === id) {
    return NextResponse.json({ error: "Özünüzü silə bilməzsiniz" }, { status: 400 });
  }

  const adminCount = await prisma.user.count({ where: { role: "admin" } });
  const target = await prisma.user.findUnique({ where: { id } });
  if (target?.role === "admin" && adminCount <= 1) {
    return NextResponse.json({ error: "Son admini silmək olmaz" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
