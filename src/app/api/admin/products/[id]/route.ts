import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

interface SizeInput {
  label: string;
  price: number;
  discountPrice: number | null;
  stock: string;
  leadTime: string;
  active: boolean;
  isDefault: boolean;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş tələb olunur" }, { status: 401 });
  }
  if (session.role !== "admin") {
    return NextResponse.json(
      { error: "Bu əməliyyat üçün admin səlahiyyəti lazımdır" },
      { status: 403 }
    );
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Yanlış məlumat" }, { status: 400 });
  }

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Məhsul tapılmadı" }, { status: 404 });
  }

  const sizes: SizeInput[] = Array.isArray(body.sizes) ? body.sizes : [];
  // Ən azı bir default ölçü təmin et
  if (sizes.length && !sizes.some((s) => s.isDefault)) {
    sizes[Math.min(2, sizes.length - 1)].isDefault = true;
  }

  const num = (v: unknown, fallback = 0) =>
    typeof v === "number" && !Number.isNaN(v) ? Math.round(v) : fallback;

  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id },
      data: {
        name: String(body.name ?? existing.name),
        tagline: String(body.tagline ?? existing.tagline),
        categoryId: String(body.categoryId ?? existing.categoryId),
        heightCm: num(body.heightCm, existing.heightCm),
        springType: String(body.springType ?? existing.springType),
        comfortLayer: String(body.comfortLayer ?? existing.comfortLayer),
        firmness: String(body.firmness ?? existing.firmness),
        firmnessPct: Math.max(0, Math.min(100, num(body.firmnessPct, existing.firmnessPct))),
        fabric: String(body.fabric ?? existing.fabric),
        cooling: !!body.cooling,
        hypoallergenic: !!body.hypoallergenic,
        warrantyYears: num(body.warrantyYears, existing.warrantyYears),
        trialDays: num(body.trialDays, existing.trialDays),
        deliveryNote: String(body.deliveryNote ?? existing.deliveryNote),
        specLine: String(body.specLine ?? existing.specLine),
        shortDescription: String(body.shortDescription ?? existing.shortDescription),
        description: String(body.description ?? existing.description),
        whoFor: JSON.stringify(
          Array.isArray(body.whoFor) ? body.whoFor.filter(Boolean) : []
        ),
        whoNot: body.whoNot ? String(body.whoNot) : null,
        active: !!body.active,
        popular: !!body.popular,
        showOnHome: !!body.showOnHome,
        showInCompare: !!body.showInCompare,
        includeInHotel: !!body.includeInHotel,
        customSizeAllowed: !!body.customSizeAllowed,
        depositPct: num(body.depositPct, existing.depositPct),
        customReturnable: !!body.customReturnable,
      },
    });

    await tx.size.deleteMany({ where: { productId: id } });
    if (sizes.length) {
      await tx.size.createMany({
        data: sizes.map((s, i) => ({
          productId: id,
          label: String(s.label || "").trim() || `Ölçü ${i + 1}`,
          price: num(s.price),
          discountPrice: s.discountPrice != null ? num(s.discountPrice) : null,
          stock: String(s.stock || "Sifarişlə"),
          leadTime: String(s.leadTime || "2 gün"),
          active: s.active !== false,
          isDefault: !!s.isDefault,
          order: i,
        })),
      });
    }

    await tx.changeLog.create({
      data: {
        productId: id,
        message: `Məhsul yeniləndi (${sizes.length} ölçü)`,
        author: session.name,
      },
    });
  });

  return NextResponse.json({ ok: true });
}
