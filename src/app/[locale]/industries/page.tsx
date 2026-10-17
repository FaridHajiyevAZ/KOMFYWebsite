import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { ImageSlot } from "@/components/b2b/ImageSlot";
import { CtaBand } from "@/components/b2b/CtaBand";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Mattress production for businesses of every scale — from single-brand OEM runs to multi-site institutional supply.",
};

const industries = [
  { name: "Mattress Brands & Distributors", status: "Capability available" },
  { name: "Furniture Stores & Retail Chains", status: "Active B2B experience" },
  { name: "Hotels & Hospitality", status: "Active B2B experience" },
  { name: "Hospitals & Healthcare", status: "Capability available" },
  { name: "Institutional & Accommodation Projects", status: "Capability available" },
  { name: "Other B2B Requirements", status: "Capability available" },
];

export default function IndustriesPage() {
  return (
    <div className="bg-b2b-bg font-karla text-b2b-ink">
      {/* Header */}
      <section className="mx-auto max-w-[1280px] px-8 pt-14">
        <div className="mb-7 flex gap-2 text-[12.5px] text-b2b-muted">
          <Link href="/" className="text-b2b-muted hover:text-b2b-ink">
            Home
          </Link>
          <span>/</span>
          <span className="text-b2b-ink">Industries</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[720px]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
              Industries
            </span>
            <h1 className="mt-3 font-grotesk text-[clamp(34px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.02em]">
              Industries we serve
            </h1>
          </div>
          <p className="m-0 max-w-[400px] text-[16px] leading-[1.6] text-b2b-text2">
            Mattress production for businesses of every scale — from single-brand OEM runs to
            multi-site institutional supply.
          </p>
        </div>
      </section>

      {/* Industry cards */}
      <section className="mx-auto max-w-[1280px] px-8 pt-12">
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(340px,1fr))]">
          {industries.map((ind) => (
            <Link
              key={ind.name}
              href="/industries/detail"
              className="group relative block h-[440px] overflow-hidden rounded-3xl text-white transition-transform duration-300 hover:-translate-y-1"
            >
              <ImageSlot variant="photo" rounded="rounded-3xl" className="absolute inset-0 h-full w-full" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(20,17,13,.25) 0%,rgba(20,17,13,0) 30%,rgba(20,17,13,.85) 100%)",
                }}
              />
              <span className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/40 bg-white/[.16] px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.04em] backdrop-blur-sm">
                {ind.status}
              </span>
              <div className="pointer-events-none absolute inset-x-6 bottom-6">
                <div className="mb-3 font-grotesk text-[24px] font-bold leading-[1.2]">{ind.name}</div>
                <span className="text-[14px] font-bold">View industry page →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Have a project in mind?"
        primary={{ label: "Request a B2B Quote", href: "/quote" }}
        secondary={{ label: "OEM & Private Label", href: "/oem" }}
      />
    </div>
  );
}
