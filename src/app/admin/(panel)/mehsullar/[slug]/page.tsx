import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ProductEditor, type EditorProduct } from "@/components/admin/ProductEditor";

export const dynamic = "force-dynamic";

function fmtDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}.${mm} ${hh}:${mi}`;
}

export default async function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [session, product, categories] = await Promise.all([
    getSession(),
    prisma.product.findUnique({
      where: { slug },
      include: { category: true, sizes: { orderBy: { order: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!product) notFound();

  const logs = await prisma.changeLog.findMany({
    where: { productId: product.id },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const editor: EditorProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    categoryId: product.categoryId,
    categoryName: product.category.name,
    heightCm: product.heightCm,
    springType: product.springType,
    comfortLayer: product.comfortLayer,
    firmness: product.firmness,
    firmnessPct: product.firmnessPct,
    fabric: product.fabric,
    cooling: product.cooling,
    hypoallergenic: product.hypoallergenic,
    warrantyYears: product.warrantyYears,
    trialDays: product.trialDays,
    deliveryNote: product.deliveryNote,
    image: product.image,
    specLine: product.specLine,
    shortDescription: product.shortDescription,
    description: product.description,
    whoFor: safeArr(product.whoFor),
    whoNot: product.whoNot,
    active: product.active,
    popular: product.popular,
    showOnHome: product.showOnHome,
    showInCompare: product.showInCompare,
    includeInHotel: product.includeInHotel,
    customSizeAllowed: product.customSizeAllowed,
    depositPct: product.depositPct,
    customReturnable: product.customReturnable,
    sizes: product.sizes.map((s) => ({
      label: s.label,
      price: s.price,
      discountPrice: s.discountPrice,
      stock: s.stock,
      leadTime: s.leadTime,
      active: s.active,
      isDefault: s.isDefault,
    })),
  };

  const changelog = logs.map((l) => ({
    message: l.message,
    author: l.author,
    date: fmtDate(l.createdAt),
  }));

  return (
    <ProductEditor
      product={editor}
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      changelog={changelog}
      canEdit={session?.role === "admin"}
    />
  );
}

function safeArr(v: string): string[] {
  try {
    const a = JSON.parse(v);
    return Array.isArray(a) ? a : [];
  } catch {
    return [];
  }
}
