"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice, DEFAULT_SIZE_INDEX, type Product } from "@/data/products";

const rows: { label: string; get: (p: Product) => string }[] = [
  { label: "Yay sistemi", get: (p) => p.springType },
  { label: "Hündürlük", get: (p) => `${p.heightCm} sm` },
  { label: "Komfort qatı", get: (p) => p.comfortLayer },
  { label: "Parça", get: (p) => p.fabric },
  { label: "Sərtlik", get: (p) => p.firmness },
  { label: "Sınaq", get: (p) => `${p.trialDays} gün` },
  { label: "Zəmanət", get: (p) => `${p.warrantyYears} il` },
];

function priceAt160(p: Product): number {
  return p.sizes[Math.min(DEFAULT_SIZE_INDEX, p.sizes.length - 1)].price;
}

export function CompareView({ products }: { products: Product[] }) {
  const fallback = products.slice(0, 3).map((p) => p.slug);
  const initial = ["goldline", "belissimo", "adaptive"].map(
    (s, i) => (products.some((p) => p.slug === s) ? s : fallback[i]) ?? fallback[0]
  );
  const [slugs, setSlugs] = useState(initial);
  const cols = slugs.map(
    (s) => products.find((p) => p.slug === s) ?? products[0]
  );
  const highlight = cols.reduce(
    (best, p, i) => (p.priceFrom > cols[best].priceFrom ? i : best),
    0
  );

  function change(i: number, slug: string) {
    setSlugs((prev) => prev.map((s, idx) => (idx === i ? slug : s)));
  }

  const cellBg = (i: number) => (i === highlight ? "bg-komfy-highlight" : "bg-komfy-card");

  return (
    <div className="flex flex-col gap-7">
      <p className="text-[14px] font-light text-komfy-muted">
        Aşağıdakı açılan siyahılardan modelləri dəyişə bilərsiniz. Qiymətlər 160×190/200
        ölçüsü üçündür.
      </p>

      <div className="overflow-x-auto">
        <div className="grid min-w-[720px] grid-cols-[200px_repeat(3,1fr)] gap-px border border-komfy-line bg-komfy-line">
          {/* Header row */}
          <div className="bg-komfy-surface" />
          {cols.map((p, i) => (
            <div key={i} className={`flex flex-col gap-3 p-6 ${cellBg(i)}`}>
              <span className="eyebrow text-[10.5px]">{p.category}</span>
              <select
                value={slugs[i]}
                onChange={(e) => change(i, e.target.value)}
                className="border-b border-komfy-border bg-transparent pb-1 font-serif text-[22px] text-komfy-ink focus:outline-none"
              >
                {products.map((op) => (
                  <option key={op.slug} value={op.slug}>
                    {op.name}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Spec rows */}
          {rows.map((r) => (
            <FragmentRow key={r.label}>
              <div className="bg-komfy-surface px-6 py-[18px] text-[13.5px] font-medium text-komfy-ink">
                {r.label}
              </div>
              {cols.map((p, i) => (
                <div
                  key={i}
                  className={`px-6 py-[18px] text-[14px] font-light text-komfy-ink ${cellBg(i)}`}
                >
                  {r.get(p)}
                </div>
              ))}
            </FragmentRow>
          ))}

          {/* Price + CTA */}
          <div className="bg-komfy-surface px-6 py-6 text-[13.5px] font-medium text-komfy-ink">
            Qiymət (160×190/200)
          </div>
          {cols.map((p, i) => (
            <div key={i} className={`flex flex-col gap-3 px-6 py-6 ${cellBg(i)}`}>
              <span className="font-serif text-[22px] text-komfy-ink">
                {formatPrice(priceAt160(p))}
              </span>
              <Link
                href={`/mehsullar/${p.slug}`}
                className={`rounded-full px-4 py-2.5 text-center text-[13px] font-medium ${
                  i === highlight
                    ? "bg-komfy-green text-komfy-surface"
                    : "border border-komfy-border text-komfy-green hover:bg-komfy-surface"
                }`}
              >
                Seç
              </Link>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[13.5px] font-light text-komfy-muted2">
        Qiymətlər 160×190/200 ölçüsü üçündür. Digər ölçülərdə fərqlənir — bütün modellər
        istənilən ölçüdə hazırlanır.
      </p>
    </div>
  );
}

function FragmentRow({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
