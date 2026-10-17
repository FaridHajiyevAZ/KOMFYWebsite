import { Suspense } from "react";
import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { CatalogView } from "@/components/CatalogView";
import { getProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Matraslar",
  description:
    "KOMFY ortopedik matras modelləri — Ekonomik, Komfort və Premium seriyaları. Rose, Goldline, Adaptive, Majestic, Intense və daha çox.",
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <div className="border-b border-komfy-line px-5 pb-[30px] pt-11 sm:px-8 lg:px-[60px]">
        <div className="mx-auto max-w-container flex flex-col gap-3">
          <span className="text-[13px] font-light text-komfy-muted2">
            <Link href="/" className="hover:text-komfy-ink">
              Ana səhifə
            </Link>{" "}
            / Matraslar
          </span>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h1 className="font-serif text-[40px] font-light leading-[1.1] text-komfy-ink sm:text-[44px]">
              Matraslar
            </h1>
            <p className="max-w-[420px] text-[15px] font-light leading-[1.6] text-komfy-muted">
              Doqquz model. Hamısı hipoallergen, ortopedik və istənilən ölçüdə hazırlanır
              (Honeymoon xaric).
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-container">
        <Suspense fallback={<p className="p-10 text-komfy-muted2">Yüklənir…</p>}>
          <CatalogView products={products} />
        </Suspense>
      </div>
    </>
  );
}
