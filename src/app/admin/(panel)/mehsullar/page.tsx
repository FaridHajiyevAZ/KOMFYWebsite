import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/data/products";
import { PageHeader } from "@/components/admin/PageHeader";

export const dynamic = "force-dynamic";

function basePrice(sizes: { price: number; isDefault: boolean }[]): number {
  const def = sizes.find((s) => s.isDefault);
  if (def) return def.price;
  return sizes.length ? Math.min(...sizes.map((s) => s.price)) : 0;
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>;
}) {
  const { k } = await searchParams;
  const products = await prisma.product.findMany({
    include: { category: true, sizes: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
  const counts = new Map<string, number>();
  for (const p of products) {
    counts.set(p.category.name, (counts.get(p.category.name) ?? 0) + 1);
  }

  const active = k && categories.some((c) => c.name === k) ? k : "Hamısı";
  const shown = products.filter((p) => active === "Hamısı" || p.category.name === active);

  const chips = [
    { name: "Hamısı", count: products.length },
    ...categories.map((c) => ({ name: c.name, count: counts.get(c.name) ?? 0 })),
  ];

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Məhsullar"
        subtitle={`${products.length} model · ${categories.length} kateqoriya · qiymətlər 90×190/200 ölçüsündən`}
      />

      <div className="flex flex-col gap-3.5 px-8 pb-9 pt-[22px]">
        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2.5">
          {chips.map((c) => {
            const isActive = c.name === active;
            const href = c.name === "Hamısı" ? "/admin/mehsullar" : `/admin/mehsullar?k=${encodeURIComponent(c.name)}`;
            return (
              <Link
                key={c.name}
                href={href}
                className={`rounded-full border px-3.5 py-1.5 text-[12px] transition-colors ${
                  isActive
                    ? "border-komfy-green bg-komfy-green text-komfy-surface"
                    : "border-komfy-line2 text-komfy-text2 hover:border-komfy-border"
                }`}
              >
                {c.name} {c.count}
              </Link>
            );
          })}
          <span className="ml-auto text-[12.5px] font-light text-komfy-muted2">
            Sıralama: kateqoriya, sonra qiymət
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-komfy-line">
          <div className="min-w-[860px]">
            <div className="grid grid-cols-[52px_1.3fr_1fr_1.5fr_96px_120px_130px_92px] items-center border-b border-komfy-line bg-komfy-panel text-[11px] font-medium uppercase tracking-[0.1em] text-komfy-muted2">
              {["Şəkil", "Model", "Kateqoriya", "Yay sistemi və parça", "Hünd.", "Sərtlik", "Baza qiymət", "Status"].map(
                (h, i) => (
                  <span key={h} className={`px-3.5 py-3 ${i === 6 ? "text-right" : ""}`}>
                    {h}
                  </span>
                )
              )}
            </div>

            {shown.map((p) => (
              <Link
                key={p.id}
                href={`/admin/mehsullar/${p.slug}`}
                className={`grid grid-cols-[52px_1.3fr_1fr_1.5fr_96px_120px_130px_92px] items-center border-b border-komfy-line/60 text-[13px] font-light transition-colors last:border-0 hover:bg-komfy-rowAlt ${
                  p.popular ? "bg-komfy-rowAlt/60" : "bg-komfy-card"
                }`}
              >
                <span className="px-3.5 py-2.5">
                  <span className="relative block h-[26px] w-[26px] overflow-hidden border border-komfy-line">
                    <Image src={p.image} alt="" fill className="object-cover" sizes="26px" />
                  </span>
                </span>
                <span className="px-3.5 py-3 font-medium text-komfy-ink">
                  {p.name}
                  {p.popular && (
                    <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.08em] text-komfy-gold">
                      · seçilmiş
                    </span>
                  )}
                </span>
                <span className="px-3.5 py-3 text-komfy-muted">{p.category.name}</span>
                <span className="px-3.5 py-3 text-komfy-muted">
                  {p.springType} · {p.fabric}
                </span>
                <span className="px-3.5 py-3 font-mono">{p.heightCm} sm</span>
                <span className="px-3.5 py-3">{p.firmness}</span>
                <span className="px-3.5 py-3 text-right font-mono">
                  {formatPrice(basePrice(p.sizes))}
                </span>
                <span className="px-3.5 py-3">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium ${
                      p.active
                        ? "border-komfy-green text-komfy-green"
                        : "border-komfy-border text-komfy-muted"
                    }`}
                  >
                    {p.active ? "Aktiv" : "Passiv"}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[12.5px] font-light text-komfy-muted2">
            Sətrə klikləyərək redaktora keçin. Ölçü qiymətləri məhsul redaktorunda idarə olunur.
          </span>
          <span className="text-[12.5px] font-light text-komfy-muted2">
            {shown.length} / {products.length} göstərilir
          </span>
        </div>
      </div>
    </div>
  );
}
