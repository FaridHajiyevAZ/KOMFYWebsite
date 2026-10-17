import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { B2bHero } from "@/components/b2b/B2bHero";
import { ImageSlot } from "@/components/b2b/ImageSlot";

export const metadata: Metadata = {
  title: "Hotels & Hospitality",
  description:
    "Mattresses built for room turnover and guest comfort — comfort tiers by room category, non-flip designs and commercial-grade durability.",
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

const blocks = [
  {
    title: "Recommended solutions",
    text: "Comfort tiers matched to room category, non-flip designs for lower maintenance, and durability-rated constructions built for commercial use.",
    photo: "Hotel bed, close-up",
  },
  {
    title: "Available customization",
    text: "Firmness set by room category, sizing to spec, branded ticking, and packaging built for phased rollout across a property.",
    photo: "Branded ticking detail",
  },
  {
    title: "Durability & compliance",
    text: "Commercial-use durability rating · [FIRE-RETARDANT / MARKET-SPECIFIC STANDARD] · [WARRANTY INFORMATION]",
    photo: "Testing / inspection",
  },
];

const coopSteps = [
  "Spec call",
  "Sample room",
  "Phased replacement schedule",
  "Bulk delivery & installation",
];

export default function IndustryDetailPage() {
  return (
    <div className="bg-b2b-bg font-karla text-b2b-ink">
      <B2bHero
        crumb="Hotels & Hospitality"
        parents={[{ label: "Industries", href: "/industries" }]}
        badge="Industry: Hotels & Hospitality"
        title="Mattresses built for room turnover and guest comfort"
        text="Commercial-grade mattresses supplied at volume, with firmness and sizing matched to your property and delivered in phases."
        primary={{ label: "Request a Hotel/Hospitality Quote", href: "/quote" }}
      />

      {/* What we deliver */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
          Our approach
        </span>
        <h2 className="mb-7 mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
          What we deliver for hotels
        </h2>
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {blocks.map((b, i) => (
            <div
              key={b.title}
              className="overflow-hidden rounded-[20px] bg-white shadow-[0_2px_10px_rgba(33,30,27,0.06)]"
            >
              <ImageSlot label={b.photo} className="h-[220px] w-full" rounded="rounded-none" />
              <div className="p-6">
                <div className="mb-2 text-[12px] font-bold text-b2b-tan">{pad(i)}</div>
                <h3 className="mb-2.5 font-grotesk text-[20px] font-bold">{b.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-b2b-text2">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cooperation model */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
          How we work together
        </span>
        <h2 className="mb-9 mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
          Typical cooperation model
        </h2>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {coopSteps.map((name, i) => (
            <div key={name} className="pr-4">
              <div className="mb-[18px] flex items-center">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-b2b-ink font-grotesk text-[14px] font-bold text-white">
                  {pad(i)}
                </span>
                <span className="h-[1.5px] flex-1 bg-b2b-line" />
              </div>
              <div className="font-grotesk text-[17px] font-semibold leading-[1.3]">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Project example */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <div className="relative h-[440px] overflow-hidden rounded-3xl">
          <ImageSlot variant="photo" rounded="rounded-3xl" className="absolute inset-0 h-full w-full" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,rgba(20,17,13,0) 40%,rgba(20,17,13,.85) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-8 bottom-[30px] text-white">
            <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em] opacity-80">
              Relevant project example
            </div>
            <div className="max-w-[640px] font-grotesk text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.25]">
              &ldquo;[Hotel chain], 120 rooms — custom firmness spec, non-flip design, delivered in
              phases across the full property.&rdquo;
            </div>
          </div>
        </div>
        <p className="mt-3.5 text-[13px] italic text-b2b-muted">
          Shown only where verified evidence exists.
        </p>
      </section>

      {/* CTA cream band */}
      <section className="mx-auto max-w-[1280px] px-8 py-24">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-b2b-band px-[clamp(32px,5vw,64px)] py-[clamp(32px,5vw,64px)]">
          <h2 className="m-0 max-w-[560px] font-grotesk text-[clamp(26px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em]">
            Planning a property refresh?
          </h2>
          <Link
            href="/quote"
            className="rounded-[10px] bg-b2b-ink px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-b2b-ink2"
          >
            Request a Hotel/Hospitality Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
