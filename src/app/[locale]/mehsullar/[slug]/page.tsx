import { LocaleLink as Link } from "@/components/LocaleLink";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getProducts } from "@/lib/content";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Məhsul tapılmadı" };
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const specs: [string, string][] = [
    ["Hündürlük", `${product.heightCm} sm`],
    ["Yay sistemi", product.springType],
    ["Komfort qatı", product.comfortLayer],
    ["Parça", product.fabric],
    ["Xüsusiyyət", "Hipoallergen, ortopedik"],
    ["İstehsal", "Azərbaycan"],
  ];

  const all = await getProducts();
  const related = all
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      {/* Main: gallery + purchase */}
      <div className="mx-auto grid max-w-container lg:grid-cols-[1fr_470px]">
        {/* Gallery */}
        <div className="flex flex-col gap-3.5 px-5 pb-12 pt-8 sm:px-8 lg:pl-[60px] lg:pr-[30px]">
          <span className="text-[13px] font-light text-komfy-muted2">
            <Link href="/mehsullar" className="hover:text-komfy-ink">
              Matraslar
            </Link>{" "}
            / {product.category} / {product.name}
          </span>
          <div className="relative h-[380px] overflow-hidden border border-komfy-line bg-komfy-line sm:h-[520px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="relative h-[80px] overflow-hidden border border-komfy-green sm:h-[96px]">
              <Image src={product.image} alt="" fill className="object-cover" sizes="120px" />
            </div>
            <div className="h-[80px] border border-komfy-line bg-gradient-to-br from-[#EFE9DE] to-[#E0D8C8] sm:h-[96px]" />
            <div className="h-[80px] border border-komfy-line bg-gradient-to-br from-[#ECE6DA] to-[#DCD3C1] sm:h-[96px]" />
            <div className="flex h-[80px] items-center justify-center border border-komfy-line text-[12.5px] font-light text-komfy-muted sm:h-[96px]">
              Qat kəsiyi
            </div>
          </div>
        </div>

        {/* Purchase */}
        <div className="px-5 pb-14 pt-8 sm:px-8 lg:pl-[30px] lg:pr-[60px]">
          <div className="lg:sticky lg:top-28">
            <ProductPurchase product={product} />
          </div>
        </div>
      </div>

      {/* Who for + specs */}
      <section className="border-t border-komfy-line bg-komfy-panel px-5 py-[70px] sm:px-8 lg:px-[60px]">
        <div className="mx-auto grid max-w-container items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-[32px] font-light leading-[1.15] text-komfy-ink sm:text-[36px]">
              {product.name} kimin üçündür
            </h2>
            <div className="flex flex-col gap-3.5 text-[15px] font-light leading-[1.6] text-komfy-text2">
              {product.whoFor.map((w) => (
                <div key={w} className="flex gap-3">
                  <span className="text-komfy-gold">—</span>
                  <span>{w}</span>
                </div>
              ))}
              {product.whoNot && (
                <div className="flex gap-3 text-komfy-muted2">
                  <span>×</span>
                  <span>{product.whoNot}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-px border border-komfy-line bg-komfy-line">
            {specs.map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between bg-komfy-surface px-[22px] py-[18px] text-[14px] font-light"
              >
                <span className="text-komfy-muted">{k}</span>
                <span className="text-komfy-ink">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section container-komfy">
          <div className="flex items-baseline justify-between border-b border-komfy-line pb-3">
            <h2 className="font-serif text-[24px] text-komfy-ink">Oxşar modellər</h2>
            <Link href="/mehsullar" className="link-more">
              Hamısı →
            </Link>
          </div>
          <div className="mt-7 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
