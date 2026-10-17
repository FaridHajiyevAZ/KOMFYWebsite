import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/content";
import { ImageSlot } from "@/components/b2b/ImageSlot";
import { ProductBuyBox } from "@/components/b2b/ProductBuyBox";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return { title: "Product not found" };
  return { title: p.name, description: p.shortDescription };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const all = await getProducts();
  const related = all
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const specs: [string, string][] = [
    ["Firmness", product.firmness],
    ["Height", `${product.heightCm} cm`],
    ["Construction", product.springType],
    ["Comfort layer", product.comfortLayer],
    ["Cover", product.fabric],
    ["Warranty", `${product.warrantyYears} years`],
  ];
  const features = product.whoFor.slice(0, 3);

  return (
    <div className="bg-b2b-bg font-karla text-b2b-ink">
      {/* Breadcrumb */}
      <div className="mx-auto flex max-w-[1280px] flex-wrap gap-2 px-8 pt-6 text-[12.5px] text-b2b-muted">
        <Link href="/" className="text-b2b-muted hover:text-b2b-ink">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="text-b2b-muted hover:text-b2b-ink">
          Products
        </Link>
        <span>/</span>
        <span className="text-b2b-ink">{product.name}</span>
      </div>

      {/* Gallery + info */}
      <section className="mx-auto grid max-w-[1280px] items-start gap-12 px-8 pt-5 [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">
        <div className="flex flex-col gap-3">
          <div className="relative h-[540px] overflow-hidden rounded-3xl bg-b2b-band">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="relative h-[100px] overflow-hidden rounded-xl border border-b2b-line">
              <Image src={product.image} alt="" fill className="object-cover" sizes="120px" />
            </div>
            {["Detail", "Diagram", "Lifestyle"].map((l) => (
              <ImageSlot key={l} label={l} className="h-[100px] w-full" rounded="rounded-xl" />
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-24">
          <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
            {product.springType}
          </span>
          <h1 className="mb-3.5 mt-2.5 font-grotesk text-[clamp(30px,3.6vw,44px)] font-bold leading-[1.08] tracking-[-0.02em]">
            {product.name}
          </h1>
          <p className="mb-7 max-w-[460px] text-[16px] leading-[1.6] text-b2b-text2">
            {product.shortDescription}
          </p>

          <div className="mb-7">
            <ProductBuyBox sizes={product.sizes} />
          </div>

          <div className="border-t border-b2b-line">
            {specs.map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 border-b border-b2b-line py-3.5 text-[14.5px]"
              >
                <span className="text-b2b-muted2">{k}</span>
                <span className="text-right font-semibold">{v}</span>
              </div>
            ))}
          </div>

          <Link
            href="/quote"
            className="mt-7 block rounded-xl bg-b2b-ink px-6 py-[17px] text-center text-[16px] font-bold text-white transition hover:bg-[#3a342d]"
          >
            Request Price
          </Link>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-8 pt-24">
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {features.map((f) => (
              <div key={f}>
                <ImageSlot label={`${f} — detail photo`} className="h-[280px] w-full" rounded="rounded-[20px]" />
                <h3 className="mt-[18px] font-grotesk text-[20px] font-bold">{f}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Construction */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
          Inside the mattress
        </span>
        <h2 className="mb-7 mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
          Construction
        </h2>
        <ImageSlot
          label="Construction diagram (layer cutaway)"
          className="h-[440px] w-full"
          rounded="rounded-3xl"
        />
      </section>

      {/* Manufactured by KOMFY */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <div className="grid overflow-hidden rounded-[28px] bg-b2b-ink text-white [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <div className="min-h-[320px] w-full" style={{ background: "linear-gradient(150deg,#A37964,#3a2f27)" }} />
          <div className="flex flex-col justify-center p-[clamp(32px,5vw,56px)]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#E3C9B8]">
              Manufactured by KOMFY
            </span>
            <p className="mb-6 mt-3.5 max-w-[460px] font-grotesk text-[clamp(20px,2.2vw,26px)] font-semibold leading-[1.35]">
              Every retail mattress comes off the same production lines used for our OEM and B2B
              projects.
            </p>
            <Link href="/manufacturing" className="text-[15px] font-bold text-white">
              See how it&apos;s made →
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-8 py-24">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="m-0 font-grotesk text-[clamp(24px,2.6vw,32px)] font-bold">
              Related products
            </h2>
            <Link href="/products" className="text-[14px] font-bold text-b2b-ink">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {related.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="block text-b2b-ink">
                <div className="relative h-[240px] overflow-hidden rounded-[20px] bg-b2b-band">
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="300px" />
                </div>
                <div className="mt-3.5 font-grotesk text-[18px] font-bold">{p.name}</div>
                <div className="mt-1 text-[14px] text-b2b-muted2">
                  {p.springType} · {p.firmness} · {p.heightCm} cm
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
