import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { B2bHero } from "@/components/b2b/B2bHero";
import { SectionHead } from "@/components/b2b/SectionHead";
import { ImageSlot } from "@/components/b2b/ImageSlot";

export const metadata: Metadata = {
  title: "Quality & Compliance",
  description:
    "Every mattress passes raw-material control, in-process checks and final inspection before it ships. Certificates shown only once documented.",
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

const qualitySteps = [
  "Raw-material control",
  "Production-stage checks",
  "Finished-product inspection",
  "Product testing",
  "Traceability",
  "Certificates & standards",
  "Destination-market requirements",
];

const docs = ["[CERT PLACEHOLDER]", "[TEST REPORT]", "[CERT PLACEHOLDER]"];

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A37964"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.4l2.6 2.6L16 9.6" />
    </svg>
  );
}

export default function QualityPage() {
  return (
    <div className="bg-b2b-bg font-karla text-b2b-ink">
      <B2bHero
        crumb="Quality & Compliance"
        badge="Quality & compliance"
        title={
          <>
            Checked at
            <br />
            every stage.
          </>
        }
        text="Every mattress passes raw-material control, in-process checks and final inspection before it ships."
        primary={{ label: "Request Compliance Documents", href: "#q-docs" }}
      />

      {/* Seven checkpoints */}
      <section className="mx-auto grid max-w-[1280px] items-center gap-14 px-8 pt-24 [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">
        <ImageSlot label="Testing equipment / lab" className="h-[520px] w-full" rounded="rounded-3xl" />
        <div>
          <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
            Our process
          </span>
          <h2 className="mb-6 mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
            Seven quality checkpoints
          </h2>
          <div>
            {qualitySteps.map((name, i) => (
              <div
                key={name}
                className="flex items-center gap-4 border-b border-b2b-line py-4"
              >
                <span className="w-[22px] text-[12px] font-bold text-b2b-tan">{pad(i)}</span>
                <span className="flex-1 font-grotesk text-[17px] font-semibold">{name}</span>
                <CheckIcon />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <SectionHead
          eyebrow="Documentation"
          title="Certificates & test reports"
          rightText="No certification badge is shown anywhere on the site unless a document is uploaded here first."
        />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
          {docs.map((label, i) => (
            <div key={i} className="rounded-[20px] bg-white p-5 shadow-[0_2px_10px_rgba(33,30,27,0.06)]">
              <ImageSlot label={label} className="h-[260px] w-full" rounded="rounded-[10px]" />
              <div className="mt-3.5 font-grotesk text-[15px] font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Warranty + market */}
      <section className="mx-auto grid max-w-[1280px] gap-5 px-8 pt-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
        <div className="rounded-3xl bg-white p-8 shadow-[0_2px_10px_rgba(33,30,27,0.06)]">
          <h3 className="mb-2.5 font-grotesk text-[20px] font-bold">Warranty & traceability</h3>
          <p className="mb-3.5 text-[14.5px] leading-[1.6] text-b2b-text2">
            Batch traceability process confirmed pending documentation.
          </p>
          <span className="inline-block rounded-lg bg-b2b-bg px-3 py-[7px] text-[13px] font-bold text-b2b-brown">
            [WARRANTY INFORMATION]
          </span>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-[0_2px_10px_rgba(33,30,27,0.06)]">
          <h3 className="mb-2.5 font-grotesk text-[20px] font-bold">Market-specific requirements</h3>
          <p className="mb-3.5 text-[14.5px] leading-[1.6] text-b2b-text2">
            Certificates and test standards by destination market.
          </p>
          <span className="inline-block rounded-lg bg-b2b-bg px-3 py-[7px] text-[13px] font-bold text-b2b-brown">
            [CERTIFICATES AND TEST STANDARDS]
          </span>
        </div>
      </section>

      {/* CTA */}
      <section id="q-docs" className="mx-auto max-w-[1280px] scroll-mt-20 px-8 py-24">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-b2b-ink px-[clamp(32px,5vw,64px)] py-[clamp(32px,5vw,64px)] text-white">
          <h2 className="m-0 max-w-[560px] font-grotesk text-[clamp(26px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em]">
            Contact for compliance documentation
          </h2>
          <Link
            href="/quote"
            className="rounded-[10px] bg-white px-6 py-3.5 text-[15px] font-bold text-b2b-ink transition hover:bg-b2b-band"
          >
            Request Compliance Documents
          </Link>
        </div>
      </section>
    </div>
  );
}
