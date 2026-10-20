import { LocaleLink as Link } from "@/components/LocaleLink";
import Image from "next/image";
import type { Metadata } from "next";
import { HeroCarousel } from "@/components/b2b/HeroCarousel";
import { SlotOrImage } from "@/components/b2b/SlotOrImage";
import { getProducts, getHomeContent } from "@/lib/content";
import { formatPrice } from "@/data/products";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

const META: Record<Locale, { title: string; description: string }> = {
  az: {
    title: "KOMFY — Matras İstehsalçısı · OEM & Fərdi Marka · B2B Təchizat",
    description:
      "KOMFY brendlər, pərakəndə satıcılar, otellər və iri kommersiya layihələri üçün fərdiləşdirilə bilən matras istehsal edir. 2015-ci ildən.",
  },
  en: {
    title: "KOMFY — Mattress Manufacturer · OEM & Private Label · B2B Supply",
    description:
      "KOMFY manufactures customizable mattress solutions for brands, retailers, hotels, healthcare facilities, and large-scale commercial projects. Since 2015.",
  },
  ru: {
    title: "KOMFY — Производитель матрасов · OEM и частная марка · B2B-поставки",
    description:
      "KOMFY производит индивидуальные матрасы для брендов, ритейлеров, отелей и крупных коммерческих проектов. С 2015 года.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "az";
  return {
    title: META[locale].title,
    description: META[locale].description,
    alternates: {
      canonical: `/${locale}`,
      languages: { az: "/az", en: "/en", ru: "/ru", "x-default": "/az" },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "az";
  const dict = getDictionary(locale);
  const [retailAll, home] = await Promise.all([getProducts(), getHomeContent(locale)]);
  const retail = retailAll.slice(0, 3);
  const priceFromLabel = (n: number) =>
    locale === "az" ? `${formatPrice(n)}-dən` : `${dict.common.from} ${formatPrice(n)}`;
  return (
    <div className="bg-b2b-bg font-karla text-b2b-ink">
      <HeroCarousel slides={home.hero} />

      {/* Stats — dark card */}
      <section className="mx-auto max-w-[1280px] px-8 pt-5">
        <div className="grid gap-7 rounded-3xl bg-b2b-ink px-[clamp(28px,4vw,44px)] py-[clamp(28px,4vw,44px)] text-white [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
          {home.stats.map((s) => (
            <div key={s.label}>
              <div className="font-grotesk text-[clamp(24px,2.6vw,32px)] font-bold text-[#E3C9B8]">
                {s.value}
              </div>
              <div className="mt-2 text-[12.5px] font-bold uppercase tracking-[0.07em] text-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Three ways to partner */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
          {home.partner.eyebrow}
        </span>
        <h2 className="mb-7 mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
          {home.partner.title}
        </h2>
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {home.paths.map((p) => (
            <Link
              key={p.title}
              href={p.cta.href}
              className="group relative block h-[480px] overflow-hidden rounded-3xl text-white transition-transform duration-300 hover:-translate-y-1"
            >
              <SlotOrImage src={p.image} alt={p.title} variant="photo" rounded="rounded-3xl" className="absolute inset-0 h-full w-full" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(20,17,13,0) 35%,rgba(20,17,13,.88) 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-x-7 bottom-7">
                <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em] opacity-80">
                  {p.eyebrow}
                </div>
                <h3 className="mb-2.5 font-grotesk text-[26px] font-bold leading-[1.15]">
                  {p.title}
                </h3>
                <p className="mb-[18px] max-w-[320px] text-[14.5px] leading-[1.55] text-white/[.88]">
                  {p.text}
                </p>
                <span className="text-[14.5px] font-bold">{p.cta.label} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it's made */}
      <section className="mx-auto grid max-w-[1280px] items-center gap-14 px-8 pt-24 [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">
        <SlotOrImage
          src={home.made.image}
          alt={home.made.title}
          label="Spring-unit line or foam-cutting close-up"
          className="h-[520px] w-full"
          rounded="rounded-3xl"
        />
        <div>
          <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
            {home.made.eyebrow}
          </span>
          <h2 className="mb-3.5 mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
            {home.made.title}
          </h2>
          <p className="mb-7 max-w-[460px] text-[15.5px] leading-[1.6] text-b2b-text2">
            {home.made.text}
          </p>
          <div className="mb-8 flex flex-wrap gap-2">
            {home.processSteps.map((step, i) => (
              <span
                key={step}
                className="flex items-center gap-2 rounded-full bg-white py-[7px] pl-[7px] pr-3.5 text-[13.5px] font-semibold shadow-[0_2px_8px_rgba(33,30,27,0.06)]"
              >
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-b2b-ink text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </span>
            ))}
          </div>
          <Link
            href={home.made.cta.href}
            className="inline-block rounded-[10px] bg-b2b-ink px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#3a342d]"
          >
            {home.made.cta.label}
          </Link>
        </div>
      </section>

      {/* Floor gallery */}
      <section className="mx-auto grid max-w-[1280px] gap-5 px-8 pt-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        {home.gallery.map((g, i) => (
          <SlotOrImage key={i} src={g.image} alt={g.label} label={g.label} className="h-[240px] w-full" rounded="rounded-[20px]" />
        ))}
      </section>

      {/* Quality — white card */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <div className="grid items-center gap-10 rounded-[28px] bg-white px-[clamp(28px,4vw,56px)] py-[clamp(28px,4vw,56px)] shadow-[0_2px_10px_rgba(33,30,27,0.06)] [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
              {home.quality.eyebrow}
            </span>
            <h2 className="mb-6 mt-3 font-grotesk text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.25] tracking-[-0.01em]">
              {home.quality.title}
            </h2>
            <Link
              href={home.quality.cta.href}
              className="inline-block rounded-[10px] border-[1.5px] border-b2b-ink px-[22px] py-3 text-[15px] font-bold text-b2b-ink transition hover:bg-b2b-ink hover:text-white"
            >
              {home.quality.cta.label}
            </Link>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-3.5">
              {home.certs.map((cert, i) => (
                <SlotOrImage key={i} src={cert.image} alt={cert.label} label={cert.label} className="h-[200px] w-full min-w-0" rounded="rounded-xl" />
              ))}
            </div>
            <p className="mt-3.5 text-[13px] italic text-b2b-muted">{home.quality.note}</p>
          </div>
        </div>
      </section>

      {/* Industries served — photo cards */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
              {home.industriesHead.eyebrow}
            </span>
            <h2 className="mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
              {home.industriesHead.title}
            </h2>
          </div>
          <Link href="/industries" className="text-[14.5px] font-bold text-b2b-ink">
            All industries →
          </Link>
        </div>
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(340px,1fr))]">
          {home.industries.map((ind) => (
            <Link
              key={ind.name}
              href="/industries"
              className="group relative block h-[340px] overflow-hidden rounded-3xl text-white transition-transform duration-300 hover:-translate-y-1"
            >
              <SlotOrImage src={ind.image} alt={ind.name} variant="photo" rounded="rounded-3xl" className="absolute inset-0 h-full w-full" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(20,17,13,.25) 0%,rgba(20,17,13,0) 30%,rgba(20,17,13,.85) 100%)",
                }}
              />
              <span className="pointer-events-none absolute left-[18px] top-[18px] rounded-full border border-white/40 bg-white/[.16] px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.04em] backdrop-blur-sm">
                {ind.status}
              </span>
              <div className="pointer-events-none absolute inset-x-6 bottom-[22px] font-grotesk text-[21px] font-bold leading-[1.25]">
                {ind.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonial band */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <div className="rounded-[28px] bg-b2b-band px-[clamp(24px,6vw,96px)] py-[clamp(40px,6vw,80px)] text-center">
          <div className="mb-3 font-grotesk text-[64px] font-bold leading-[0.6] text-b2b-tan">
            &ldquo;
          </div>
          <p className="mx-auto mb-5 max-w-[820px] font-grotesk text-[clamp(22px,2.6vw,32px)] font-semibold leading-[1.35] tracking-[-0.01em] text-b2b-ink">
            {home.testimonial.quote}
          </p>
          <p className="text-[13.5px] italic text-b2b-brown">{home.testimonial.attribution}</p>
        </div>
      </section>

      {/* Retail catalog preview — white cards */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
              {home.retail.eyebrow}
            </span>
            <h2 className="mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
              {home.retail.title}
            </h2>
          </div>
          <Link href="/products" className="text-[14.5px] font-bold text-b2b-ink">
            {dict.common.viewAllProducts} →
          </Link>
        </div>
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
          {retail.map((p) => (
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
                <Link href={`/products/${p.slug}`} className="font-grotesk text-[19px] font-bold text-b2b-ink">
                  {p.name}
                </Link>
                <div className="mt-1.5 text-[14px] text-b2b-muted2">
                  {p.springType} · {p.heightCm} cm
                </div>
                <div className="mt-2 font-grotesk text-[18px] font-bold text-b2b-ink">
                  {priceFromLabel(p.priceFrom)}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-b2b-band pt-4">
                  <Link href={`/products/${p.slug}`} className="text-[14px] font-bold text-b2b-ink">
                    {dict.common.details} →
                  </Link>
                  <Link
                    href="/quote"
                    className="rounded-[10px] bg-b2b-ink px-4 py-2.5 text-[13.5px] font-bold text-white transition hover:bg-b2b-ink2"
                  >
                    {dict.common.requestPrice}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — rounded card */}
      <section className="mx-auto max-w-[1280px] px-8 py-24">
        <div className="relative flex min-h-[360px] items-center overflow-hidden rounded-[28px] bg-b2b-ink">
          <SlotOrImage src={home.cta.image} alt={home.cta.title} variant="dark" rounded="rounded-none" className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-[rgba(20,17,13,.6)]" />
          <div className="pointer-events-none relative flex w-full flex-wrap items-center justify-between gap-7 p-[clamp(32px,5vw,64px)] text-white">
            <h2 className="m-0 max-w-[580px] font-grotesk text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.1] tracking-[-0.01em]">
              {home.cta.title}
            </h2>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              <Link
                href={home.cta.primary.href}
                className="rounded-[10px] bg-white px-6 py-3.5 text-[15px] font-bold text-b2b-ink transition hover:bg-b2b-band"
              >
                {home.cta.primary.label}
              </Link>
              <Link
                href={home.cta.secondary.href}
                className="rounded-[10px] border-[1.5px] border-white/60 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/10"
              >
                {home.cta.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
