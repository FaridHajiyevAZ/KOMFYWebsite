import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { B2bHero } from "@/components/b2b/B2bHero";
import { SectionHead, StatsBand } from "@/components/b2b/SectionHead";
import { ImageSlot } from "@/components/b2b/ImageSlot";
import { OemEnquiryForm } from "@/components/b2b/OemEnquiryForm";

export const metadata: Metadata = {
  title: "OEM & Private Label",
  description:
    "Full-spec mattress manufacturing for brands, importers, distributors and retail chains — from co-development to branded, packaged shipment.",
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

const audiences = [
  "Mattress brands",
  "Importers & distributors",
  "Retail chains",
  "Furniture retailers",
  "Hospitality suppliers",
  "Contract-manufacturing seekers",
];

const productCategories = [
  "Bonnell Spring",
  "Pocket Spring",
  "Hybrid",
  "Memory Foam",
  "Latex",
  "Cooling Gel",
  "Eurotop & Pillow-Top",
  "Commercial & Hospitality",
];

const customizationMatrix = [
  "Size",
  "Height",
  "Firmness",
  "Spring system",
  "Foam layers",
  "Fabric & quilting",
  "Handles & borders",
  "Labels & branding",
  "Packaging",
  "Fire-retardant / market-specific requirements",
];

const branding = ["Custom label", "Custom ticking", "Retail packaging", "Export carton"];

const oemProcess = [
  "Requirement / spec",
  "Product development",
  "Sample production",
  "Testing & approval",
  "Manufacturing",
  "Branding & packaging",
  "Delivery / shipment",
];

const keyFigures = [
  { value: "[CAPACITY]", label: "Production capacity" },
  { value: "[MOQ]", label: "Minimum order quantity" },
  { value: "[LEAD TIME]", label: "Average lead time" },
];

const cases = [
  { tag: "Furniture retail", title: "Case study — furniture retailer", ph: "Furniture retailer project photo" },
  { tag: "Hospitality", title: "Case study — hotel chain", ph: "Hotel chain project photo" },
];

export default function OemPage() {
  return (
    <div className="bg-b2b-bg font-karla text-b2b-ink">
      <B2bHero
        crumb="OEM & Private Label"
        badge="OEM & Private Label Manufacturing"
        title={
          <>
            Your brand.
            <br />
            Our production.
          </>
        }
        text="Full-spec mattress manufacturing for brands, importers, distributors and retail chains — from co-development to branded, packaged shipment."
        primary={{ label: "Request an OEM Quote", href: "#oem-quote" }}
        secondary={{ label: "See the process", href: "#oem-process" }}
      />

      {/* Who this is for */}
      <section className="mx-auto max-w-[1280px] px-8 pt-10">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-b2b-line pb-7">
          <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
            Who this is for
          </span>
          <div className="flex flex-wrap gap-2">
            {audiences.map((a) => (
              <span
                key={a}
                className="rounded-full bg-white px-4 py-2 text-[13.5px] font-semibold shadow-[0_2px_8px_rgba(33,30,27,0.06)]"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Construction & material options */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <SectionHead
          eyebrow="What we build"
          title="Construction & material options"
          rightText="Eight core constructions, each available as a base for your private-label range."
        />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
          {productCategories.map((name, i) => (
            <div
              key={name}
              className="overflow-hidden rounded-[18px] bg-white shadow-[0_2px_10px_rgba(33,30,27,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(33,30,27,0.12)]"
            >
              <ImageSlot label={`${name} — cutaway`} className="h-[180px] w-full" rounded="rounded-none" />
              <div className="flex items-center justify-between gap-2.5 p-4 pt-4">
                <span className="font-grotesk text-[16px] font-semibold">{name}</span>
                <span className="text-[12px] font-bold text-b2b-tan">{pad(i)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customization matrix */}
      <section className="mx-auto grid max-w-[1280px] items-center gap-14 px-8 pt-24 [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">
        <ImageSlot
          label="Fabric & quilting samples on a table"
          className="h-[540px] w-full"
          rounded="rounded-3xl"
        />
        <div>
          <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
            Fully configurable
          </span>
          <h2 className="mb-3 mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
            Customization matrix
          </h2>
          <p className="mb-7 max-w-[440px] text-[15px] leading-[1.6] text-b2b-text2">
            Every parameter below can be set per order and confirmed in your project spec.
          </p>
          <div className="grid gap-x-7 sm:grid-cols-2">
            {customizationMatrix.map((name, i) => (
              <div
                key={name}
                className="flex items-center gap-3.5 border-b border-b2b-line py-3.5"
              >
                <span className="w-5 text-[12px] font-bold text-b2b-tan">{pad(i)}</span>
                <span className="text-[15px] font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding & packaging */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <SectionHead eyebrow="Under your name" title="Branding & packaging options" />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {branding.map((name) => (
            <div key={name} className="relative h-[320px] overflow-hidden rounded-[20px]">
              <ImageSlot variant="photo" rounded="rounded-[20px]" className="absolute inset-0 h-full w-full" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(20,17,13,0) 55%,rgba(20,17,13,.8) 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-x-5 bottom-[18px] font-grotesk text-[18px] font-semibold text-white">
                {name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample & approval process */}
      <section id="oem-process" className="mx-auto max-w-[1280px] scroll-mt-20 px-8 pt-24">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
          How it works
        </span>
        <h2 className="mb-9 mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
          Sample & approval process
        </h2>
        <div className="grid gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
          {oemProcess.map((name, i) => (
            <div key={name} className="pr-4">
              <div className="mb-[18px] flex items-center">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-b2b-ink font-grotesk text-[14px] font-bold text-white">
                  {pad(i)}
                </span>
                <span className="h-[1.5px] flex-1 bg-b2b-line" />
              </div>
              <div className="font-grotesk text-[16px] font-semibold leading-[1.3]">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Key figures */}
      <section className="mx-auto max-w-[1280px] px-8 pt-20">
        <StatsBand items={keyFigures} />
      </section>

      {/* Documents + logistics */}
      <section className="mx-auto grid max-w-[1280px] gap-5 px-8 pt-5 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
        <div className="flex flex-wrap items-center gap-6 rounded-3xl bg-white p-8 shadow-[0_2px_10px_rgba(33,30,27,0.06)]">
          <div className="flex gap-2.5">
            <ImageSlot label="Certificate" className="h-[108px] w-[84px]" rounded="rounded-lg" />
            <ImageSlot label="Test report" className="h-[108px] w-[84px]" rounded="rounded-lg" />
          </div>
          <div className="min-w-[180px] flex-1">
            <h3 className="mb-2 font-grotesk text-[20px] font-bold">
              Quality & compliance documents
            </h3>
            <p className="mb-3.5 text-[14px] leading-[1.55] text-b2b-text2">
              Certificates and test reports available per project.
            </p>
            <Link href="/quality" className="text-[14px] font-bold text-b2b-ink">
              View Quality Standards →
            </Link>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-[0_2px_10px_rgba(33,30,27,0.06)]">
          <h3 className="mb-2 font-grotesk text-[20px] font-bold">Logistics & export support</h3>
          <p className="mb-3.5 text-[14px] leading-[1.55] text-b2b-text2">
            Incoterms, shipment support and documentation confirmed per destination market.
          </p>
          <span className="inline-block rounded-lg bg-b2b-bg px-3 py-[7px] text-[13px] font-bold text-b2b-brown">
            [EXPORT COUNTRIES]
          </span>
        </div>
      </section>

      {/* Case studies */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <SectionHead eyebrow="Proof" title="OEM case studies" />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          {cases.map((c) => (
            <div key={c.title} className="relative h-[380px] overflow-hidden rounded-3xl">
              <ImageSlot variant="photo" rounded="rounded-3xl" className="absolute inset-0 h-full w-full" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(20,17,13,0) 40%,rgba(20,17,13,.85) 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-x-7 bottom-[26px] text-white">
                <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em] opacity-80">
                  {c.tag}
                </div>
                <div className="font-grotesk text-[22px] font-bold leading-[1.3]">{c.title}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3.5 text-[13px] italic text-b2b-muted">Published only with client approval.</p>
      </section>

      {/* Quote form */}
      <section id="oem-quote" className="mx-auto max-w-[1280px] scroll-mt-20 px-8 py-24">
        <div className="grid items-start gap-10 rounded-[28px] bg-b2b-band px-[clamp(28px,4vw,56px)] py-[clamp(28px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-brown">
              Start a project
            </span>
            <h2 className="mb-3.5 mt-2.5 font-grotesk text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-0.01em]">
              Detailed OEM quote form
            </h2>
            <p className="mb-6 max-w-[380px] text-[15px] leading-[1.6] text-b2b-text2">
              Share your spec and target market. Our team replies with a feasibility review and
              sample plan.
            </p>
            <div className="flex flex-col gap-1.5 text-[14px] text-b2b-text2">
              <span>info@komfy.az</span>
              <span>+994 [phone]</span>
            </div>
          </div>
          <OemEnquiryForm />
        </div>
      </section>
    </div>
  );
}
