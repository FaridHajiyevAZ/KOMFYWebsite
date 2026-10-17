import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";

const STATUSES = ["new", "contacted", "closed"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const g = await guard();
  if (g instanceof NextResponse) return g;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const status = STATUSES.includes(body.status) ? body.status : null;
  if (!status) {
    return NextResponse.json({ error: "Yanlış status" }, { status: 400 });
  }
  await prisma.lead.update({ where: { id }, data: { status } }).catch(() => {});
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const g = await guard({ adminOnly: true });
  if (g instanceof NextResponse) return g;
  const { id } = await params;
  await prisma.lead.delete({ where: { id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
