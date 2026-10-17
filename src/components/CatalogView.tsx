"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories, type Category, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { site } from "@/data/site";

type Filter = "Hamısı" | Category;

const seriesMeta: { cat: Category; title: string; note: string }[] = [
  { cat: "Ekonomik", title: "Ekonomik seriya", note: "Qiymətlər 90×190/200 ölçüsündən başlayır" },
  { cat: "Komfort", title: "Komfort seriya", note: "5 il zəmanət" },
  { cat: "Premium", title: "Premium seriya", note: "10 il zəmanət" },
];

const sizes = ["90×200", "120×200", "160×200", "180×200", "200×200"];

export function CatalogView({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const initial = params.get("kateqoriya") as Category | null;
  const [filter, setFilter] = useState<Filter>(
    initial && categories.includes(initial) ? initial : "Hamısı"
  );

  const counts: Record<Category, number> = {
    Ekonomik: products.filter((p) => p.category === "Ekonomik").length,
    Komfort: products.filter((p) => p.category === "Komfort").length,
    Premium: products.filter((p) => p.category === "Premium").length,
  };

  const shownSeries = seriesMeta.filter(
    (s) => filter === "Hamısı" || s.cat === filter
  );

  const honeymoon = products.find((p) => p.slug === "honeymoon");

  return (
    <div className="grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="flex flex-col gap-8 border-komfy-line px-5 py-8 sm:px-8 lg:border-r lg:px-[30px] lg:py-[34px]">
        <FilterGroup label="Kateqoriya">
          <FilterItem active={filter === "Hamısı"} onClick={() => setFilter("Hamısı")}>
            Hamısı
          </FilterItem>
          {categories.map((c) => (
            <FilterItem key={c} active={filter === c} onClick={() => setFilter(c)}>
              {c} ({counts[c]})
            </FilterItem>
          ))}
        </FilterGroup>

        <FilterGroup label="Yay sistemi">
          <span className="text-[14px] font-light text-komfy-text2">Bonel yay</span>
          <span className="text-[14px] font-light text-komfy-text2">Poket yay</span>
          <span className="text-[14px] font-light text-komfy-text2">7 zonalı poket yay</span>
        </FilterGroup>

        <div className="flex flex-col gap-3">
          <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-komfy-muted2">
            Ölçü
          </span>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s, i) => (
              <span
                key={s}
                className={`rounded-full px-3 py-1.5 text-[12.5px] ${
                  i === 2
                    ? "border border-komfy-green bg-komfy-green text-komfy-surface"
                    : "border border-komfy-line2 text-komfy-text2"
                }`}
              >
                {s}
              </span>
            ))}
          </div>
          <span className="text-[12.5px] font-light leading-[1.5] text-komfy-muted2">
            Xüsusi ölçü də mümkündür — qiymətin 30%-i beh alınır.
          </span>
        </div>

        <div className="flex flex-col gap-3 border-t border-komfy-line pt-6">
          <span className="font-serif text-[15px] text-komfy-ink">Seçim çətindir?</span>
          <span className="text-[13.5px] font-light leading-[1.6] text-komfy-muted">
            Zəng edin, danışaq: {site.phone}
          </span>
          <Link
            href="/secim"
            className="self-start rounded-full border border-komfy-border px-4 py-2 text-[12.5px] font-medium text-komfy-green hover:bg-komfy-card"
          >
            Testə başla
          </Link>
        </div>
      </aside>

      {/* Series */}
      <div className="flex flex-col gap-9 px-5 py-8 sm:px-8 lg:px-[60px] lg:py-[34px] lg:pb-[70px]">
        {shownSeries.map((s) => {
          const items = products.filter(
            (p) => p.category === s.cat && p.slug !== "honeymoon"
          );
          return (
            <div key={s.cat} className="flex flex-col gap-[18px]">
              <div className="flex items-baseline justify-between border-b border-komfy-line pb-3">
                <h2 className="font-serif text-[22px] text-komfy-ink">{s.title}</h2>
                <span className="text-[13.5px] font-light text-komfy-muted2">{s.note}</span>
              </div>
              <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} variant="compact" />
                ))}

                {s.cat === "Ekonomik" && (
                  <div className="flex flex-col justify-center gap-2.5 border border-dashed border-komfy-line2 p-6">
                    <span className="font-serif text-[18px] text-komfy-ink">
                      Xüsusi ölçü lazımdır?
                    </span>
                    <span className="text-[13px] font-light leading-[1.6] text-komfy-muted">
                      İstənilən modeli qeyri-standart ölçüdə hazırlayırıq. Xüsusi ölçülü
                      matraslar geri qaytarılmır.
                    </span>
                    <a href={site.phoneHref} className="link-more self-start">
                      Zəng edin
                    </a>
                  </div>
                )}
              </div>

              {s.cat === "Premium" && honeymoon && (
                <Link
                  href={`/mehsullar/${honeymoon.slug}`}
                  className="group mt-1 grid items-stretch bg-komfy-green text-komfy-onDark md:grid-cols-[1fr_1.4fr]"
                >
                  <div className="relative min-h-[170px] bg-gradient-to-br from-[#46564A] to-[#374439]">
                    <span className="absolute bottom-4 left-4 rounded-full bg-black/20 px-3 py-1 text-[11px] text-komfy-onDark2">
                      Honeymoon
                    </span>
                  </div>
                  <div className="flex flex-col justify-center gap-2.5 px-8 py-7">
                    <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-komfy-goldSoft">
                      Özəl seriya
                    </span>
                    <h3 className="font-serif text-[24px] text-[#F7F4EE]">
                      Honeymoon — 1 109 AZN-dən
                    </h3>
                    <span className="max-w-[440px] text-[13.5px] font-light leading-[1.65] text-[#B0AA9C]">
                      Bal ayı konsepti. 7 zonalı poket yay, HyCare texnologiyalı pambıq
                      parça. Ölkədə bu parça ilə istehsal olunan yeganə matras. Yalnız
                      160×200, 180×200 və 200×200 ölçülərində.
                    </span>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-komfy-muted2">
        {label}
      </span>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FilterItem({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 text-left text-[14px] transition-colors ${
        active ? "font-medium text-komfy-green" : "font-light text-komfy-text2 hover:text-komfy-ink"
      }`}
    >
      {children}
      {active && <span className="text-komfy-gold">✓</span>}
    </button>
  );
}
