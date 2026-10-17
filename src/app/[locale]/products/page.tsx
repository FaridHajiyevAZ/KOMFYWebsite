import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import Image from "next/image";
import { getProducts } from "@/lib/content";
import { formatPrice } from "@/data/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Retail Mattresses",
  description:
    "Browse KOMFY retail mattress constructions, firmness and sizes — built on the same production lines as our OEM and B2B projects.",
};

const filters = [
  "Mattress type",
  "Size",
  "Firmness",
  "Height",
  "Sleeping preference",
  "Material / construction",
  "Intended use",
];

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-b2b-bg font-karla text-b2b-ink">
      {/* Hero banner */}
      <section className="mx-auto max-w-[1344px] px-5 pt-5">
        <div
          className="relative h-[420px] overflow-hidden rounded-3xl"
          style={{
            background:
              "radial-gradient(60% 70% at 80% 30%, rgba(227,201,184,.35), rgba(227,201,184,0) 70%), linear-gradient(135deg,#4a3c31,#1e1914)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg,rgba(20,17,13,.8) 0%,rgba(20,17,13,.45) 45%,rgba(20,17,13,0) 80%)",
            }}
          />
          <div className="absolute left-[clamp(24px,5vw,64px)] top-7 flex gap-2 text-[12.5px] text-white/75">
            <Link href="/" className="text-white/75 hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Products</span>
          </div>
          <div className="absolute bottom-[clamp(32px,5vw,56px)] left-[clamp(24px,5vw,64px)] right-6 max-w-[560px] text-white">
            <h1 className="mb-3.5 font-grotesk text-[clamp(34px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.02em]">
              Retail Mattresses
            </h1>
            <p className="max-w-[440px] text-[17px] leading-[1.6] text-white/[.88]">
              Browse constructions, firmness and sizes built by the same factory.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-[1280px] px-8 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-b2b-line pb-5">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className="flex items-center gap-2 rounded-full border border-b2b-line bg-white px-4 py-[9px] text-[13.5px] font-semibold text-b2b-ink transition hover:border-b2b-ink"
              >
                {f}
                <span className="text-[11px] text-b2b-muted">▾</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5 text-[13.5px] text-b2b-muted2">
            <span>{products.length} products</span>
            <span className="font-semibold text-b2b-ink">Sort ▾</span>
          </div>
        </div>
      </section>

      {/* Catalog grid */}
      <section className="mx-auto max-w-[1280px] px-8 pt-8">
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
          {products.map((p) => (
            <div
              key={p.slug}
              className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_2px_10px_rgba(33,30,27,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(33,30,27,0.12)]"
            >
              <Link href={`/products/${p.slug}`} className="relative block h-[260px] bg-b2b-band">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="pointer-events-none absolute left-3.5 top-3.5 rounded-full bg-white px-2.5 py-[5px] text-[12px] font-bold text-b2b-ink">
                  {p.firmness}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-5 pt-5">
                <Link
                  href={`/products/${p.slug}`}
                  className="font-grotesk text-[19px] font-bold text-b2b-ink"
                >
                  {p.name}
                </Link>
                <div className="mt-1.5 text-[14px] text-b2b-muted2">
                  {p.springType} · {p.heightCm} cm
                </div>
                <div className="mt-2 font-grotesk text-[18px] font-bold text-b2b-ink">
                  {formatPrice(p.priceFrom)}
                  <span className="text-[13px] font-normal text-b2b-muted2">-dən</span>
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-b2b-band pt-4">
                  <Link href={`/products/${p.slug}`} className="text-[14px] font-bold text-b2b-ink">
                    Details →
                  </Link>
                  <Link
                    href="/quote"
                    className="rounded-[10px] bg-b2b-ink px-4 py-2.5 text-[13.5px] font-bold text-white transition hover:bg-b2b-ink2"
                  >
                    Sifariş
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manufactured by KOMFY */}
      <section className="mx-auto max-w-[1280px] px-8 py-24">
        <div className="grid overflow-hidden rounded-[28px] bg-b2b-ink text-white [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <div className="min-h-[340px] w-full" style={{ background: "linear-gradient(150deg,#A37964,#3a2f27)" }} />
          <div className="flex flex-col justify-center p-[clamp(32px,5vw,56px)]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#E3C9B8]">
              Manufactured by KOMFY
            </span>
            <h2 className="mb-3.5 mt-3 font-grotesk text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.2] tracking-[-0.01em]">
              Same lines as our OEM and B2B projects
            </h2>
            <p className="mb-6 max-w-[420px] text-[15px] leading-[1.6] text-white/80">
              Every retail mattress comes off the same production lines used for our OEM and B2B
              projects.
            </p>
            <Link href="/manufacturing" className="text-[15px] font-bold text-white">
              See how it&apos;s made →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
