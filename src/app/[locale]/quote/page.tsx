import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { QuoteForm } from "@/components/b2b/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us who you are — the form adjusts to ask only what's relevant. OEM, private label, hotel/B2B projects or retail enquiries.",
};

export default function QuotePage() {
  return (
    <div className="bg-b2b-bg font-karla text-b2b-ink">
      <section className="mx-auto grid max-w-[1280px] items-start gap-10 px-8 pb-24 pt-8 [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">
        {/* Side panel */}
        <div
          className="relative h-[min(76vh,640px)] min-h-[480px] overflow-hidden rounded-3xl lg:sticky lg:top-24"
          style={{
            background:
              "radial-gradient(60% 50% at 75% 20%, rgba(163,121,100,.5), rgba(163,121,100,0) 70%), linear-gradient(135deg,#3a2f27,#1a1712)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(180deg,rgba(20,17,13,.2) 0%,rgba(20,17,13,.85) 100%)",
            }}
          />
          <div className="absolute left-8 right-8 top-7 flex gap-2 text-[12.5px] text-white/75">
            <Link href="/" className="text-white/75 hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Request a Quote</span>
          </div>
          <div className="absolute inset-x-8 bottom-8 text-white">
            <h1 className="mb-3.5 font-grotesk text-[clamp(34px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.02em]">
              Request a Quote
            </h1>
            <p className="mb-6 max-w-[380px] text-[16px] leading-[1.6] text-white/[.88]">
              Tell us who you are — the form adjusts to ask only what&apos;s relevant.
            </p>
            <div className="flex flex-col gap-1 border-t border-white/20 pt-5 text-[14px] text-white/80">
              <span>info@komfy.az</span>
              <span>+994 [phone]</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <QuoteForm />
      </section>
    </div>
  );
}
