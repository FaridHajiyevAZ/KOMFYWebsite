"use client";

import { useState } from "react";
import {
  formatPrice,
  DEFAULT_SIZE_INDEX,
  type Product,
} from "@/data/products";
import { site } from "@/data/site";

export function ProductPurchase({ product }: { product: Product }) {
  const [idx, setIdx] = useState(
    Math.min(DEFAULT_SIZE_INDEX, product.sizes.length - 1)
  );
  const [openRow, setOpenRow] = useState<number | null>(null);
  const selected = product.sizes[idx];

  const waText = encodeURIComponent(
    `Salam! ${product.name} (${selected.size}) modeli ilə maraqlanıram. Qiymət: ${formatPrice(
      selected.price
    )}.`
  );

  const accordions = [
    {
      title: "Qatlar və materiallar",
      body: `Yay sistemi: ${product.springType}. Komfort qatı: ${product.comfortLayer}. Üz parçası: ${product.fabric}. Hündürlük: ${product.heightCm} sm.`,
    },
    {
      title: "Fərdi ölçü şərtləri",
      body: "İstənilən modeli qeyri-standart ölçüdə hazırlayırıq. Xüsusi ölçülü sifarişlərdə qiymətin 30%-i beh alınır və belə matraslar geri qaytarılmır.",
    },
    {
      title: "Qulluq və təmizləmə",
      body: "Matrası ayda bir dəfə çevirin/döndərün, birbaşa üzərinə maye tökməyin. Çıxarılan üz parçasını istehsalçı təlimatına uyğun yuyun.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2.5">
        <span className="eyebrow">{product.tagline}</span>
        <h1 className="font-serif text-[42px] font-light leading-[1.08] text-komfy-ink sm:text-[46px]">
          {product.name}
        </h1>
        <p className="text-[15.5px] font-light leading-[1.7] text-komfy-text3">
          {product.description}
        </p>
      </div>

      {/* Firmness */}
      <div className="flex flex-col gap-2.5 border-t border-komfy-line pt-5">
        <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-komfy-muted2">
          Sərtlik
        </span>
        <div className="relative my-2.5 h-[3px] bg-komfy-line">
          <span
            className="absolute h-[13px] w-[13px] -translate-x-1/2 rounded-full bg-komfy-green"
            style={{ left: `${product.firmnessPct}%`, top: -5 }}
          />
        </div>
        <div className="flex justify-between text-[12.5px] font-light text-komfy-muted2">
          <span>Yumşaq</span>
          <span className="font-medium text-komfy-green">{product.firmness}</span>
          <span>Sərt</span>
        </div>
      </div>

      {/* Size & price */}
      <div className="flex flex-col gap-3">
        <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-komfy-muted2">
          Ölçü və qiymət
        </span>
        <div className="flex flex-col gap-px border border-komfy-line bg-komfy-line">
          {product.sizes.map((s, i) => {
            const active = i === idx;
            return (
              <button
                key={s.size}
                type="button"
                onClick={() => setIdx(i)}
                className={`flex items-center justify-between px-4 py-3 text-[13.5px] transition-colors ${
                  active
                    ? "bg-komfy-green font-medium text-[#F7F4EE]"
                    : "bg-komfy-card font-light text-komfy-ink hover:bg-komfy-panel"
                }`}
              >
                <span>
                  {s.size} {active && "✓"}
                </span>
                <span>{formatPrice(s.price)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <a
          href={`${site.whatsapp}?text=${waText}`}
          className="rounded-full bg-komfy-green px-4 py-[17px] text-center text-[15px] font-medium text-komfy-surface transition hover:bg-komfy-greenSoft"
        >
          Onlayn sifariş ver — pulsuz çatdırılma
        </a>
        <a
          href={site.phoneHref}
          className="rounded-full border border-komfy-border px-4 py-4 text-center text-[15px] font-medium text-komfy-green transition hover:bg-komfy-card"
        >
          Zəng edin: {site.phone}
        </a>
      </div>

      {/* Summary */}
      <div className="flex flex-col gap-2.5 border border-komfy-line bg-komfy-panel p-5">
        <SummaryRow k="Sınaq müddəti" v="30 gün yat, sonra seç" />
        <SummaryRow k="Zəmanət" v={`${product.warrantyYears} il`} />
        <SummaryRow k="Çatdırılma" v="Pulsuz, yatağınıza qədər" />
      </div>

      {/* Accordions */}
      <div className="flex flex-col border-t border-komfy-line">
        {accordions.map((a, i) => {
          const open = openRow === i;
          return (
            <div key={a.title} className="border-b border-komfy-line">
              <button
                type="button"
                onClick={() => setOpenRow(open ? null : i)}
                className="flex w-full items-center justify-between py-4 text-left text-[14.5px] text-komfy-ink"
              >
                <span>{a.title}</span>
                <span className="text-komfy-muted2">{open ? "−" : "＋"}</span>
              </button>
              {open && (
                <p className="pb-4 text-[13.5px] font-light leading-[1.7] text-komfy-text3">
                  {a.body}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-[13.5px] font-light text-komfy-text2">
      <span>{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
