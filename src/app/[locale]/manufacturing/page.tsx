import type { Metadata } from "next";
import { B2bHero } from "@/components/b2b/B2bHero";
import { SectionHead } from "@/components/b2b/SectionHead";
import { ImageSlot } from "@/components/b2b/ImageSlot";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "Spring units, foam, quilting, assembly and packaging — every stage runs on KOMFY's own production floor. Manufacturing mattresses since 2015.",
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

const history = [
  { year: "2015", text: "KOMFY founded and begins mattress production." },
  { year: "2018", text: "New production facility opens, increasing capacity by approximately 30%." },
  { year: "2020", text: "Bonnell spring-unit manufacturing begins, supplying local mattress manufacturers." },
];

const capacity = [
  { value: "[FACTORY SIZE]", label: "Factory size" },
  { value: "[LINES]", label: "Production lines" },
  { value: "[CAPACITY]", label: "Verified monthly capacity" },
];

const flow = [
  "Spring-unit manufacturing",
  "Foam cutting & layering",
  "Quilting & sewing",
  "Assembly & finishing",
  "Inspection",
  "Packaging",
  "Dispatch",
];

const gallery = ["Spring-unit line", "Foam cutting", "Quilting / sewing", "Packaging"];

export default function ManufacturingPage() {
  return (
    <div className="bg-b2b-bg font-karla text-b2b-ink">
      <B2bHero
        crumb="Manufacturing"
        badge="Manufacturing since 2015"
        title={
          <>
            Built in-house,
            <br />
            from spring to stitch.
          </>
        }
        text="Spring units, foam, quilting, assembly and packaging — every stage runs on our own production floor."
        primary={{ label: "Download Manufacturing Profile (PDF)", href: "#" }}
        secondary={{ label: "Request a Quote", href: "/quote" }}
      />

      {/* History */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">History</span>
        <h2 className="mb-9 mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
          A decade of mattress production
        </h2>
        <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {history.map((h) => (
            <div key={h.year} className="border-t-[1.5px] border-b2b-ink pt-5">
              <div className="font-grotesk text-[44px] font-bold tracking-[-0.02em] text-b2b-tan">
                {h.year}
              </div>
              <p className="mt-2.5 max-w-[340px] text-[15px] leading-[1.6] text-b2b-text2">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capacity */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <div className="rounded-3xl bg-b2b-ink px-[clamp(32px,4vw,48px)] py-[clamp(32px,4vw,48px)] text-white">
          <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {capacity.map((k) => (
              <div key={k.label}>
                <div className="font-grotesk text-[clamp(24px,2.6vw,32px)] font-bold text-[#E3C9B8]">
                  {k.value}
                </div>
                <div className="mt-2 text-[13px] font-bold uppercase tracking-[0.07em] text-white/70">
                  {k.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-white/15 pt-5 text-[14px] text-white/75">
            [FACTORY LOCATION AND CURRENT STATUS]
          </div>
        </div>
      </section>

      {/* Production flow */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <SectionHead eyebrow="Production flow" title="Seven stages, one roof" />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
          {flow.map((name, i) => (
            <div
              key={name}
              className="overflow-hidden rounded-[18px] bg-white shadow-[0_2px_10px_rgba(33,30,27,0.06)]"
            >
              <ImageSlot label={`${name} — photo`} className="h-[190px] w-full" rounded="rounded-none" />
              <div className="flex items-center gap-3 p-4 pt-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-b2b-ink font-grotesk text-[12px] font-bold text-white">
                  {pad(i)}
                </span>
                <span className="font-grotesk text-[16px] font-semibold">{name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-[1280px] px-8 pt-24">
        <SectionHead eyebrow="Factory gallery" title="Inside the factory" />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          {gallery.map((l) => (
            <ImageSlot key={l} label={l} className="h-[340px] w-full" rounded="rounded-[20px]" />
          ))}
        </div>
      </section>

      {/* Video tour */}
      <section className="mx-auto max-w-[1280px] px-8 py-24">
        <div className="relative h-[420px] overflow-hidden rounded-3xl">
          <ImageSlot variant="dark" rounded="rounded-3xl" className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-[rgba(20,17,13,.55)]" />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[18px] px-6 text-center text-white">
            <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#211E1B">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            <h2 className="m-0 font-grotesk text-[clamp(24px,3vw,34px)] font-bold">Factory video tour</h2>
            <span className="text-[13px] font-bold uppercase tracking-[0.1em] opacity-80">
              Coming soon
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
