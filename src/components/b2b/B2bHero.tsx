import { LocaleLink as Link } from "@/components/LocaleLink";
import type { ReactNode } from "react";

interface Cta {
  label: string;
  href: string;
}

const HERO_BG =
  "radial-gradient(60% 60% at 82% 18%, rgba(163,121,100,.5), rgba(163,121,100,0) 70%), linear-gradient(135deg,#3a2f27,#1a1712)";

/** B2B alt-səhifə hero kartı — yuvarlaq, tünd, aşağı-sol mətn + breadcrumb */
export function B2bHero({
  crumb,
  parents = [],
  badge,
  title,
  text,
  primary,
  secondary,
}: {
  crumb: string;
  parents?: { label: string; href: string }[];
  badge: string;
  title: ReactNode;
  text: string;
  primary: Cta;
  secondary?: Cta;
}) {
  return (
    <section className="mx-auto max-w-[1344px] px-5 pt-5">
      <div
        className="relative h-[min(76vh,600px)] min-h-[460px] overflow-hidden rounded-3xl"
        style={{ background: HERO_BG }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,rgba(20,17,13,.82) 0%,rgba(20,17,13,.55) 45%,rgba(20,17,13,.05) 80%)",
          }}
        />
        <div className="absolute left-[clamp(24px,5vw,64px)] top-7 flex flex-wrap gap-2 text-[12.5px] text-white/75">
          <Link href="/" className="text-white/75 hover:text-white">
            Home
          </Link>
          {parents.map((p) => (
            <span key={p.href} className="flex gap-2">
              <span>/</span>
              <Link href={p.href} className="text-white/75 hover:text-white">
                {p.label}
              </Link>
            </span>
          ))}
          <span>/</span>
          <span className="text-white">{crumb}</span>
        </div>
        <div className="absolute bottom-[clamp(32px,6vw,64px)] left-[clamp(24px,5vw,64px)] right-6 max-w-[600px] text-white">
          <span className="inline-block rounded-full border border-white/35 bg-white/[.14] px-3.5 py-1.5 text-[12.5px] font-bold backdrop-blur-sm">
            {badge}
          </span>
          <h1 className="mb-4 mt-5 font-grotesk text-[clamp(34px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.02em]">
            {title}
          </h1>
          <p className="mb-7 max-w-[480px] text-[17px] leading-[1.6] text-white/[.88]">
            {text}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={primary.href}
              className="rounded-[10px] bg-white px-6 py-3.5 text-[15px] font-bold text-b2b-ink transition hover:bg-b2b-band"
            >
              {primary.label}
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="rounded-[10px] border-[1.5px] border-white/60 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/10"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
