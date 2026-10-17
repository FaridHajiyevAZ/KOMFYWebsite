import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { CompareView } from "@/components/CompareView";
import { getProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Müqayisə",
  description:
    "KOMFY matras modellərini yan-yana müqayisə edin — yay sistemi, hündürlük, parça, sərtlik, zəmanət və qiymət.",
};

export default async function ComparePage() {
  const products = (await getProducts()).filter((p) => p.slug !== "honeymoon");
  return (
    <section className="section container-komfy">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-light text-komfy-muted2">
            <Link href="/mehsullar" className="hover:text-komfy-ink">
              Matraslar
            </Link>{" "}
            / Müqayisə
          </span>
          <h1 className="font-serif text-[40px] font-light leading-[1.1] text-komfy-ink sm:text-[44px]">
            Modelləri müqayisə edin
          </h1>
        </div>
      </div>

      <div className="mt-8">
        <CompareView products={products} />
      </div>
    </section>
  );
}
